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
} from 'react-native';
import styles from '../assets/globals';
import Contato from '../components/Contato';
import {Swipeable} from 'react-native-gesture-handler';
import {variables} from '../assets/variables';
import {navigate} from '../Routes';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home(props) {
  //console.log('aloo', props.user);
  //console.log('aloo', props.messages);

  const RightAction = item => {
    return (
      <TouchableOpacity
        style={{backgroundColor: variables.redVelvet}}
        onPress={() => {
          props.removeContact(item.contactPhone);
          props.deleteChat(item.contactPhone);

          //props.removeFromCart(item.id);
          //navigate('Adicionar Produto', {operation: 'edit', item});
          //console.log('UUID: ', item.uuid);
          // deleteMonitor(item.uuid);
        }}>
        <View
          style={[
            {
              backgroundColor: variables.redVelvet,
              height: '95%',
              width: 100,
              //borderRadius: 20,
              marginTop: 4,
            },
            styles.centerXY,
          ]}>
          <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>
            Excluir
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = useCallback(({item}) => {
    return (
      <Swipeable renderRightActions={() => RightAction(item)}>
        <TouchableOpacity
          onPress={() => {
            navigate('Chat', {item});
          }}>
          <Contato
            name={item.contactName}
            notSeenMessages={item.notSeenMessages}
          />
        </TouchableOpacity>
      </Swipeable>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={[styles.row, styles.mx10, styles.my10]}>
        <TouchableOpacity
          onPress={() => {
            navigate('Adicionar');
          }}
          style={[styles.row]}>
          <Icon name={'add-circle'} size={30} />
          <Text style={[styles.mx10, {fontSize: 20}]}>Adicionar Contato</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        //keyExtractor={keyExtractor}

        style={[styles.mb20]}
        data={props.user.contacts}
        renderItem={renderItem}
      />
    </View>
  );
}
