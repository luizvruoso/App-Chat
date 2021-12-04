import MQTT from 'sp-react-native-mqtt';
var cli = null;
import uuid from 'react-native-uuid';

class MqttConnection {
  init(arrSub, callbacks) {
    const {
      registerMessage,
      setMessagesAsVisualizedByUser,
      getGroups,
      basicInfo,
      addContactPendingForApproval,
    } = callbacks;

    MQTT.createClient({
      uri: 'mqtt://192.168.0.142:1883',
      clientId: uuid.v4(),
    }).then(client => {
      client.on('message', msg => {
        const msgPayload = JSON.parse(msg.data);
        //console.log('Cheou msg', msgPayload);
        if (msgPayload.hasOwnProperty('value')) {
          if (basicInfo.personalTopic != msgPayload.from) {
            // prevent echo de mensagens
            registerMessage(
              msgPayload.value,
              'received',
              msgPayload.type == 'group' ? msgPayload.to : msgPayload.from,
              msgPayload.from,
            );
          }
        } else {
          switch (msgPayload.setState) {
            case 'visualized':
              setMessagesAsVisualizedByUser(msgPayload.from);
              break;
            case 'fetchForNewGroups':
              getGroups();
              break;
            case 'newContactPendingApproval':
              addContactPendingForApproval(
                msgPayload.extraData.contactName,
                msgPayload.from,
              );
              break;
            case 'notify_UserRefusedAddContact':
              registerMessage(
                'XASUP: Usuário não quer ser seu amigo.',
                'received',
                msgPayload.from,
                msgPayload.from,
              );
              break;
          }
        }
      });

      client.on('connect', function () {
        console.log('connected');

        arrSub.map(el => {
          client.subscribe(el.id, 1);
        });
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

  setSubscriptions(list) {
    if (cli != null) {
      list.map(el => {
        cli.subscribe(el.id, 1);
      });
    }
  }
}

var Mqtt = new MqttConnection();

export default Mqtt;
