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
import {variables} from '../../assets/variables';
export default function Contato(props) {
  const name = props.name;
  const countNotSeenMessages = props.notSeenMessages;
  return (
    <View
      style={[styles.flex1, styles.row, styles.p20, {backgroundColor: '#FFF'}]}>
      <View style={[styles.flex1]}>
        <Image
          style={{
            borderRadius: 20,
            height: 40,
            width: 40,
          }}
          source={require('../../assets/img/profile-user.png')}
        />
      </View>
      <View style={[styles.flex2, styles.centerY]}>
        <Text>{name}</Text>
      </View>
      <View style={[styles.flex1]}>
        {countNotSeenMessages != 0 && (
          <View
            style={[
              {
                width: 35,
                height: 35,
                borderRadius: 35,
                backgroundColor: variables.redVelvet,
                alignSelf: 'flex-end',
              },
            ]}>
            <Text
              style={[
                styles.textCenter,
                {fontSize: 15, marginTop: 5, fontWeight: 'bold', color: '#FFF'},
              ]}>
              {countNotSeenMessages}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
