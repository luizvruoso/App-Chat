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

export default function Message(props) {
  const message = props.message;
  const type = props.type;

  if (type == 'received') {
    return (
      <View style={[styles.flexStart, styles.row, styles.flex1, styles.p5]}>
        <View
          style={[
            {
              minWidth: '30%',
              maxWidth: '90%',
              backgroundColor: '#FFF',
              minHeight: 50,
              padding: 10,
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
              borderTopStartRadius: 10,
            },
          ]}>
          <Text>{message}</Text>
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
              minWidth: '30%',
              maxWidth: '90%',
              backgroundColor: '#FFF',
              minHeight: 50,
              padding: 10,
              borderTopEndRadius: 10,
              //borderBottomEndRadius: 10,
              borderTopStartRadius: 10,
              borderBottomStartRadius: 10,
            },
          ]}>
          <Text>{message}</Text>
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
