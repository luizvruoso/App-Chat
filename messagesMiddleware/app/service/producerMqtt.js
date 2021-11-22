const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1883");

const sendMessage = (message) => {
  mqttClient.publish("xuzito", message);
};

module.exports = sendMessage;
