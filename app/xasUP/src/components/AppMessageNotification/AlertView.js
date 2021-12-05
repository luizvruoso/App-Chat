import React, {useEffect, useState} from 'react';
import {Alert, Text, View, Pressable} from 'react-native';
import {fetchAPI} from '../../services/api';
import styles from '../../assets/globals.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {variables} from '../../assets/variables';

function AlertView(props) {
  return (
    <View>
      <View>
        <View
          style={[
            styles.centerXY,
            {
              paddingBottom: 10,
              bottom: 0,
              zIndex: 999999,
              position: 'absolute',
              width: '100%',
              //height: '100%',
              opacity: 1,
              //flex: 1,
            },
            //styles.mt10,
          ]}>
          <View
            style={[
              {
                minHeight: 60,
                backgroundColor: variables.warning,
                opacity: 1,
              },
              styles.centerXY,
            ]}>
            <View style={[styles.p10, styles.row, styles.centerY]}>
              <View style={[{flex: 1}, styles.centerXY]}>
                <Icon name="info-outline" size={23} color={'white'} />
              </View>
              <View style={[{flex: 5}, styles.centerY]}>
                <Text style={[styles.pl5, {color: 'white', fontSize: 18}]}>
                  {props.message}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AlertView;
