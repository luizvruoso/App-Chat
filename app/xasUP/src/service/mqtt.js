import MQTT from 'sp-react-native-mqtt';
var cli = null;
import uuid from 'react-native-uuid';

class MqttConnection {
  init(arrSub, callbackRegisterMessage, callbackSetVisualized) {
    MQTT.createClient({
      uri: 'mqtt://192.168.0.142:1883',
      clientId: uuid.v4(),
    }).then(client => {
      //console.log('haloo', this.client);

      client.on('message', msg => {
        const msgPayload = JSON.parse(msg.data);

        if (msgPayload.hasOwnProperty('value')) {
          callbackRegisterMessage(
            msgPayload.value,
            'received',
            msgPayload.from,
          );
        } else {
          callbackSetVisualized(msgPayload.from);
        }
      });
      client.on('connect', function () {
        console.log('connected');

        arrSub.map(el => {
          client.subscribe(el.id, 1);
        });

        //client.publish('/data', "test", 0, false);
        cli = client;
      });
      client.connect();
    });
  }

  //this.client.connect();

  connection(callback) {
    client.on('open', () => {
      console.log('Conectado');
    });
  }

  onMessage(callback) {
    client.on('message', msg => {
      const msgPayload = JSON.parse(msg.data);
      console.info('hahahaha', msg);
      callback(msgPayload.value, 'received', msgPayload.from);
    });
  }

  sendMessage(topic, message) {
    console.log('payload', JSON.stringify(message));
    cli.publish(topic, JSON.stringify(message), 0, true);
  }
}

var Mqtt = new MqttConnection();

export default Mqtt;
