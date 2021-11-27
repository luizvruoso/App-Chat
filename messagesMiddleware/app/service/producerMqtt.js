const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1883");

const mountMessagePayload = (message) => {
  if (message.hasOwnProperty("setState")) {
    return {
      topic: message.mqttTopic.to,
      message: {
        from: message.mqttTopic.from,
        setState: message.setState,
      },
    };
  }

  return {
    topic: message.mqttTopic.to,
    message: {
      from: message.mqttTopic.from,
      value: message.value,
    },
  };
};

const sendMessage = (message) => {
  const payload = mountMessagePayload(JSON.parse(message));
  console.log(payload.topic, payload.message);
  mqttClient.publish(payload.topic, JSON.stringify(payload.message));
};

module.exports = sendMessage;
