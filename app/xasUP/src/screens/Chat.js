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
  const [value, setValue] = useState('');

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
        //keyExtractor={keyExtractor}
        style={[{height: '90%'}]}
        data={messageData}
        renderItem={renderItem}
      />
      <View
        style={[
          {minheight: '15%', backgroundColor: '#fff', flexDirection: 'row'},
        ]}>
        <TextInput
          onChangeText={val => setValue(val)}
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
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.centerY]}
          onPress={() => {
            if (value.length > 0) props.registerMessage(value, 'sent');
          }}>
          <Icon name="send-circle" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
