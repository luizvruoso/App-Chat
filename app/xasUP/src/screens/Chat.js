import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import styles from '../assets/globals';
import Message from '../components/Message';
import {Swipeable} from 'react-native-gesture-handler';
import {variables} from '../assets/variables';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Mqtt from '../service/mqtt';
import MqttConnection from '../service/mqtt';

const auxData = [
  {type: 'received', message: 'hoi'},
  {type: 'sent', message: 'Haloo'},
  {type: 'received', message: 'hoi'},
  {type: 'sent', message: 'Haloo'},
  {type: 'received', message: 'hoi'},
  {type: 'sent', message: 'Haloo'},
  {type: 'received', message: 'hoi'},
  {type: 'sent', message: 'Haloo'},
  {type: 'received', message: 'hoi'},
  {type: 'sent', message: 'Haloo'},
  {type: 'received', message: 'hoi'},
  {type: 'sent', message: 'Haloo'},
];

export default function Chat(props) {
  const {item, type} = props.route.params;
  const user = props.user.userInfo;
  const messageData = props.messages;
  const chatId = type == 'group' ? item.groupID : item.contactPhone;
  const [value, setValue] = useState('');
  const [indexInArray, setIndexInArray] = useState(0);
  const [triggerReload, setTriggerReload] = useState(false);
  const flatListRef = React.useRef();

  const sendPayloadVisualized = () => {
    MqttConnection.sendMessage('baeldung', {
      mqttTopic: {
        to: chatId,
        from: user.phone,
      },
      setState: 'visualized',
    });
    props.cleanNotSeenMessages(chatId);
  };

  useEffect(() => {
    const index = props.messages.findIndex(el => el?.chatId == chatId);

    if (index == -1) {
      props.initChat(chatId);

      setTriggerReload(!triggerReload);
    } else {
      sendPayloadVisualized();

      setIndexInArray(index);
    }
  }, [triggerReload]);

  useEffect(() => {
    sendPayloadVisualized();
  }, [messageData[indexInArray]]);

  getContactNameFromId = id => {
    const {contacts} = props.user;

    const index = contacts.findIndex(el => el.contactPhone == id);

    if (index != -1) return contacts[index].contactName;
    else return id;
  };

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          //navigate('DetailsMonitor', {item});
        }}>
        <Message
          chatType={type}
          type={item.type}
          message={item.message}
          date={item.date}
          visualized={item.visualized}
          delivered={item.delivered}
          fromWho={getContactNameFromId(item.fromWho)}
        />
      </TouchableOpacity>
    );
  }, []);
  //console.log(props.messages);
  return (
    <View style={{flex: 1}}>
      <FlatList
        inverted
        ref={flatListRef}
        //keyExtractor={keyExtractor}
        style={[{height: '90%'}]}
        data={messageData[indexInArray].messages}
        renderItem={renderItem}
      />
      <View
        style={[
          {minheight: '15%', backgroundColor: '#fff', flexDirection: 'row'},
        ]}>
        <TextInput
          onChangeText={val => setValue(val)}
          value={value}
          style={[
            {
              height: 50,
              width: '80%',
              borderWidth: 0.8,
              borderColor: '#CCC',
              paddingLeft: 10,
            },
            styles.mx10,
            styles.my20,
          ]}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity
          style={[styles.centerY]}
          onPress={() => {
            setValue('');
            if (value.length > 0) {
              props.registerMessage(value, 'sent', chatId, user.phone, type);
            }
          }}>
          <Icon name="send-circle" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
