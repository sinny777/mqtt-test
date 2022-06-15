
const mqtt = require('mqtt')
const dotenv = require("dotenv");

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

function init(){
    // var MQTT_URL = "mqtt://test.mosquitto.org"
    
    var MQTT_URL = process.env.MQTT_URL;
    var orgId = process.env.ORG_ID;
    var appId = process.env.APP_ID;
    var clientId = "a:rqeofj:InfluxDBCloud";
    var apiKey = process.env.APP_API_KEY;
    var topic = "iot-2/type/HB_Water/id/HB_Water_123456789/evt/level/fmt/json";
    var qos = 0;   
    
    options = {
        clientId: clientId,
        username: apiKey,
        password: process.env.APP_TOKEN,
        clean: true,
        keepalive: 60,
        connectTimeout:  90*1000, // milliseconds, time to wait before a CONNACK is received
        reconnectPeriod: 1000, // milliseconds, interval between two reconnections
        queueQoSZero: true, // if connection is broken, queue outgoing QoS zero messages
        resubscribe: true, // if connection is broken and reconnects, subscribed topics are automatically subscribed again,
        protocolId: 'MQIsdp',
        protocolVersion: 3
    }
    try{
        const client  = mqtt.connect(MQTT_URL, options);
        
        client.on('message', function (topic, message) {
            console.log(message.toString());
          //   client.end()
        })

        
        client.on('connect', function () {
            console.log("Client Connected Successfully !!!! ");
            client.subscribe(topic, { qos: qos }, function (err) {
                if (!err) {
                    console.log('smartthings subscribed successfully....');
                }else{
                    console.log(err);
                }
            })
        })

        
    }catch(error){
        console.log(error)
    }
}

init();



