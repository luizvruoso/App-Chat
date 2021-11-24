const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1883");

const mountMessagePayload = (message) => {
  return {
    topic: message.mqttTopic,
    message: message.value,
  };
};

const sendMessage = (message) => {
  const payload = mountMessagePayload(JSON.parse(message));
  console.log(payload.topic, payload.message);
  mqttClient.publish(payload.topic, payload.message + " from server");
};

module.exports = sendMessage;
