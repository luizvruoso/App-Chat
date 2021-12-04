const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1883");
/*
STATES (setState):
-> fetchForNewGroups : força o usuario que recebeu esse estado a dar um refresh de seus grupos no servidor
-> newContactPendingApproval: informa o usuario que recebeu a mensagem que alguem quer fazer contato
    

*/

const mountMessagePayload = (message) => {
  if (message.hasOwnProperty("setState")) {
    return {
      topic: message.mqttTopic.to,
      message: {
        to: message.mqttTopic.to,
        from: message.mqttTopic.from,
        setState: message.setState,
        extraData: message?.extraData,
      },
    };
  }

  return {
    topic: message.mqttTopic.to,
    message: {
      type: message.mqttTopic.type,
      to: message.mqttTopic.to,
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
