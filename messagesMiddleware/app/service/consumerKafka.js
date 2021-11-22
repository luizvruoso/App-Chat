// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const { Kafka } = require("kafkajs");
const sendMessage = require("../service/producerMqtt");

const groupId = require("../env/index");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const consume = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  //await consumer.disconnect();
  console.log(consumer);
  await consumer.connect();
  await consumer.subscribe({ topic: "connect-custom" });

  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ message }) => {
      // here, we just log the message to the standard output
      console.log(`received message: ${message.value}`);
      sendMessage(message.value);
    },
  });
};

module.exports = consume;
