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
export default function Home(props) {
  const RightAction = item => {
    return (
      <TouchableOpacity
        onPress={() => {
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
              borderRadius: 20,
              marginTop: 8,
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
    //console.log('aaaa', item);
    return (
      <Swipeable renderRightActions={() => RightAction(item)}>
        <TouchableOpacity
          onPress={() => {
            navigate('Chat', {item});
          }}>
          <Contato name={'Vintaozinho'} />
        </TouchableOpacity>
      </Swipeable>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        //keyExtractor={keyExtractor}
        style={[styles.mb20]}
        data={[{name: 'luiz'}]}
        renderItem={renderItem}
      />
    </View>
  );
}
