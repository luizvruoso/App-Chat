class MqttConnection {
  mqtt = require('mqtt');
  client = null;
  constructor() {
    super();

    client = mqtt.connect('mqtt://test.mosquitto.org');
  }

  connection() {
    this.client.on('connect', function () {
      this.client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt');
        }
      });
    });
  }

  sendMessage(topic, message) {
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  }
}
