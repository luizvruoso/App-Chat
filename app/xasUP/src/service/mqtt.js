import MQTT from 'sp-react-native-mqtt';

class MqttConnection {
  client = null;
  constructor() {
    //super();
    /*this.client = new Client({
      uri: 'mqtt://192.168.0.142:1883',
      clientId: 'clientId',
      storage: myStorage,
    });*/
    MQTT.createClient({
      uri: 'mqtt://192.168.0.142:1883',
      clientId: 'your_client_id',
    }).then(client => {
      this.client = client;
      console.log('haloo', this.client);
      this.client.subscribe('xuzito', 1);
      this.client.connect();
    });

    //this.client.connect();
  }

  connection(callback) {
    this.client.on('open', function () {
      console.log('Conectado');
    });
  }

  listenTo(topic) {
    /*this.client.subscribe(topic, function (msg) {
      if (!msg) {
        callback(msg);
      }
    });*/
    if (Array.isArray(topic)) {
      topic.forEach(el => {
        this.client.subscribe(`${el.contactPhone}`, 0);
      });
    }
  }

  onMessage(callback) {
    this.client.on('message', function (msg) {
      console.log('hahahaha', msg);
      callback(msg.data, 'received', msg.topic);
    });
  }

  sendMessage(topic, message) {
    this.client.publish(topic, JSON.stringify(message), 0, false);
  }
}
const Mqtt = new MqttConnection();

export default Mqtt;
