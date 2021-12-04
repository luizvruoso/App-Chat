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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  useEffect(() => {}, []);

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
            contactType={
              item.hasOwnProperty('contactName')
                ? 'userContact'
                : 'groupContact'
            }
          />
        </TouchableOpacity>
      </Swipeable>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={[styles.mx10, styles.row, styles.my10, ,]}>
        <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => {
              navigate('Adicionar', {type: 'contact'});
            }}
            style={[styles.row]}>
            <Icon name={'person-add'} size={20} />
            <Text style={[styles.mx5, {fontSize: 15}]}>Novo Contato</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.verticleLine, styles.mr5, styles.ml5]}></View>
        <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => {
              navigate('Adicionar', {type: 'group'});
            }}
            style={[styles.row]}>
            <Icon name={'group-add'} size={22} />
            <Text style={[styles.mx5, {fontSize: 15}]}>Novo Grupo</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.verticleLine, styles.mr5]}></View>
        <View style={[{flex: 2}, styles.centerXY]}>
          <TouchableOpacity
            onPress={() => {
              // navigate('Adicionar', {type: 'group'});
              props.logoutAction();
            }}
            style={[styles.row]}>
            <Icon name={'logout'} size={22} />
            <Text style={[styles.mx5, {fontSize: 15}]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {Array.isArray(props.user.contactsPendingApproval) &&
        props.user.contactsPendingApproval.length > 0 && (
          <View style={[styles.mx10, styles.row, styles.my20, styles.centerXY]}>
            <TouchableOpacity
              onPress={() => {
                navigate('Adicionar', {type: 'manageContacts'});
              }}
              style={[styles.row]}>
              <MaterialCommunityIcons name={'alert-circle-outline'} size={20} />
              <Text style={[styles.mx5, {fontSize: 15}]}>
                Existem contatos pendentes de aprovação
              </Text>
            </TouchableOpacity>
          </View>
        )}
      <FlatList
        //keyExtractor={keyExtractor}

        style={[styles.mb50]}
        data={finalData}
        renderItem={renderItem}
      />
    </View>
  );
}
