import React, {Component, useEffect, useState} from 'react';
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
  Image,
} from 'react-native';
import styles from '../../assets/globals';
import {now, fromDateTimeGetTime} from '../../assets/utils';
import {variables} from '../../assets/variables';

export default function Message(props) {
  const message = props.message;
  const type = props.type;
  const date = props.hasOwnProperty('data') ? props.data : now();

  if (type == 'received') {
    return (
      <View style={[styles.flexStart, styles.row, styles.flex1, styles.p5]}>
        <View
          style={[
            {
              minWidth: '20%',
              maxWidth: '90%',
              backgroundColor: '#FFF',
              minHeight: 50,
              padding: 10,
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
              borderTopStartRadius: 10,
              backgroundColor: '#CCC',
            },
          ]}>
          <View style={[styles.row]}>
            <Text
              style={{
                fontWeight: '500',
                color: '#000',
                fontSize: variables.fontChat,
              }}>
              {message}
            </Text>
          </View>
          <View style={[styles.row, {alignSelf: 'flex-end'}]}>
            <Text
              style={{
                fontWeight: '500',
                color: '#000',
                fontSize: variables.fontChat - 4,
              }}>
              {fromDateTimeGetTime(date).slice(0, 5)}
            </Text>
          </View>
        </View>
        <View style={[styles.flex1]}></View>
      </View>
    );
  } else if (type == 'sent') {
    return (
      <View style={[styles.flexEnd, styles.row, styles.flex1, styles.p5]}>
        <View
          style={[
            {
              minWidth: '20%',
              maxWidth: '90%',
              backgroundColor: '#FFF',
              minHeight: 50,
              padding: 10,
              borderTopEndRadius: 10,
              //borderBottomEndRadius: 10,
              borderTopStartRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: '#293952',
            },
          ]}>
          <View style={[styles.row]}>
            <Text
              style={{
                fontWeight: '500',
                color: '#FFF',
                fontSize: variables.fontChat,
              }}>
              {message}
            </Text>
          </View>
          <View style={[styles.row, {alignSelf: 'flex-end'}]}>
            <Text
              style={{
                fontWeight: '500',
                color: '#FFF',
                fontSize: variables.fontChat - 4,
              }}>
              {fromDateTimeGetTime(date).slice(0, 5)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>Tipos nao foram selecionados</Text>
    </View>
  );
}
