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
  const messageData = props.messages;
  const chatId = props.route.params.item.contactPhone;
  const [value, setValue] = useState('');
  const [indexInArray, setIndexInArray] = useState(0);
  const flatListRef = React.useRef();
  useEffect(() => {
    const index = props.messages.findIndex(el => el.chatId == chatId);
    console.log('alo', props.messages, index);
    console.log('alo', props.messages[index], index);
    setIndexInArray(index);
  }, []);

  useEffect(() => {
    console.log('entrei aqui');
    //flatListRef.current.scrollToEnd({animated: true});
  }, [messageData[indexInArray]]);

  const renderItem = useCallback(({item}) => {
    //console.log('aaaa', item);
    return (
      <TouchableOpacity
        onPress={() => {
          //navigate('DetailsMonitor', {item});
        }}>
        <Message type={item.type} message={item.message} />
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
              props.registerMessage(value, 'sent', chatId);
              Mqtt.sendMessage('baeldung', {
                mqttTopic: chatId,
                value: value,
              });
            }
          }}>
          <Icon name="send-circle" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
