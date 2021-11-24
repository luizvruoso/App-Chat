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
import Contato from '../components/Contato';
import {Swipeable} from 'react-native-gesture-handler';
import {variables} from '../assets/variables';
import {navigate} from '../Routes';
import {fetchAPI} from '../service/api';
var globalData = [];
export default function Adicionar(props) {
  const [val, setVal] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData = async () => {
      try {
        var auxData = await fetchAPI('GET', '/getAllUsers', null, null);

        var final = auxData.data.filter(
          el => el.contactPhone != props.user.userInfo.phone,
        );

        setData(final);
        globalData = final;
      } catch (err) {
        console.error('erro ao resgatar dados', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (val.length > 0) {
      var auxData = globalData.filter(
        el =>
          el.contactName.toLowerCase().search(val.toLowerCase()) != -1 ||
          el.contactPhone.toLowerCase().search(val.toLowerCase()) != -1,
      );
      setData(auxData);
      return;
    }
    setData(globalData);
  }, [val]);

  const renderItem = useCallback(({item}) => {
    //console.log('aaaa', item);
    return (
      <TouchableOpacity
        onPress={() => {
          props.addContact(item.contactName, item.contactPhone);
          props.initChat(item.contactPhone);
          navigate('Chat', {item});
        }}>
        <View
          style={[
            styles.flex1,
            styles.row,
            styles.p20,
            {backgroundColor: '#FFF'},
          ]}>
          <View style={[styles.flex1, styles.centerY]}>
            <Text>{item.contactName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={[styles.row, styles.centerXY, styles.my10]}>
        <TextInput
          onChangeText={val => setVal(val)}
          value={val}
          style={{
            backgroundColor: '#FFF',
            width: '100%',
            borderWidth: 0.8,
            borderColor: '#CCC',
            color: '#000',
          }}
        />
      </View>
      <FlatList
        //keyExtractor={keyExtractor}
        style={[styles.mb20]}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}
