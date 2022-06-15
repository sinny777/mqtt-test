
const mqtt = require('mqtt')
import * as dotenv from "dotenv";

dotenv.config();
let env_path = process.env.NODE_ENV;
if (env_path) {
  dotenv.config({path: env_path});
}

// const client  = mqtt.connect('mqtt://test.mosquitto.org')

// options = {
//     clientId: 'smartthings_pub_' + Math.random().toString(16).substr(2, 8),
//     username: "smartthings@ttn",
//     password: "NNSXS.IW5QA5WHBRAR3RSEKEX4ABG4HQZNZHAYMOMSZNI.LE5KDSEX27T53SUZ6ABZKCNYQOAD65WXO3LZVHO3AUQ75EI2P7BQ"
// }
// const client  = mqtt.connect('mqtt://eu1.cloud.thethings.network', options)

// var MQTT_URL = "mqtt://test.mosquitto.org"
var MQTT_URL = process.env.MQTT_URL;
var client;
var clientId = "d:rqeofj:HB_Water:HB_Water_123456789";
var orgId = process.env.ORG_ID;
options = {
    clientId: clientId,
    username: "use-token-auth",
    password: process.env.DEVICE_TOKEN,
    clean: true,
    // keepalive: 60,
    // connectTimeout:  90*1000, // milliseconds, time to wait before a CONNACK is received
    // reconnectPeriod: 1000, // milliseconds, interval between two reconnections
    queueQoSZero: true, // if connection is broken, queue outgoing QoS zero messages
    resubscribe: true, // if connection is broken and reconnects, subscribed topics are automatically subscribed again
    // protocolId: 'MQIsdp',
    // protocolVersion: 5
}

var topic = process.env.PUBLISH_TOPIC;
var qos = 0;
var timeout;

function init_publish(){
    
    if (timeout){
        clearTimeout(timeout);
    }
    
    for (let i = 0; i < 10; i++) {
        timeout = setTimeout(function (i) { return function() {
            const d = new Date();
            data = {
                "d": {"level": i * 20, "datetime": d.getTime()}
            }
            publish(data);
        }}(i), i * 5000);
      }
}

function publish(data){
    client.publish(topic, JSON.stringify(data), { qos: parseInt(qos), retain: false }, function(){
        console.log('Published: >> ', data);
    });   
}


function init(){
    try{
        client  = mqtt.connect(MQTT_URL, options);
        client.on('connect', function() { 
            console.log('MQTT CONNECTED SUCCESSFULLY .... '); 
            init_publish(); 
        });
    
        client.on('disconnect', function() { 
            console.log('MQTT DISCONNECTED .... '); 
        });
    
        client.on('offline', function() { 
            console.log('MQTT OFFLINE .... '); 
        });
    
        client.on('error', function(error) { 
            console.log('MQTT ERROR .... ', error); 
        });
    
    }catch(error){
        console.log(error)
    }
}


init()
// init_publish()




