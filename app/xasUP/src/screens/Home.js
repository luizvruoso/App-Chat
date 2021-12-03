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
  const finalData = props.user.contacts.concat(props.user.groups);
  const RightAction = item => {
    return (
      <TouchableOpacity
        style={{backgroundColor: variables.redVelvet}}
        onPress={() => {
          if (item.hasOwnProperty('contactName')) {
            props.removeContact(item.contactPhone);
            props.deleteChat(item.contactPhone);
          } else {
            props.leaveGroup(item.groupID, props.user.userInfo.phone);
            props.deleteChat(item.groupID);
          }

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

  useEffect(() => {
    //console.log('dasdsadas', props.messages);
  }, []);

  const renderItem = useCallback(({item}) => {
    return (
      <Swipeable renderRightActions={() => RightAction(item)}>
        <TouchableOpacity
          onPress={() => {
            navigate('Chat', {
              item,
              type: item.hasOwnProperty('contactName')
                ? 'directMessage'
                : 'group',
            });
          }}>
          <Contato
            name={
              item.hasOwnProperty('contactName')
                ? item.contactName
                : item.groupName
            }
            notSeenMessages={
              item.hasOwnProperty('notSeenMessages') ? item.notSeenMessages : 0
            }
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
            navigate('Adicionar', {type: 'contact'});
          }}
          style={[styles.row]}>
          <Icon name={'add-circle'} size={30} />
          <Text style={[styles.mx10, {fontSize: 20}]}>Adicionar Contato</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, styles.mx10, styles.my10]}>
        <TouchableOpacity
          onPress={() => {
            navigate('Adicionar', {type: 'group'});
          }}
          style={[styles.row]}>
          <Icon name={'add-circle'} size={30} />
          <Text style={[styles.mx10, {fontSize: 20}]}>Adicionar Grupo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        //keyExtractor={keyExtractor}

        style={[styles.mb20]}
        data={finalData}
        renderItem={renderItem}
      />
    </View>
  );
}
