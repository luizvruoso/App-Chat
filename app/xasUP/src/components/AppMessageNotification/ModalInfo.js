/*
 * Para utilzação é necessaria a configuração do Firebase para android
 * Esses dados configurados sao importados aqui indiretamente
 **/

import React, {useEffect, useState} from 'react';
import {Alert, Text, View, Pressable} from 'react-native';
import {fetchAPI} from '../../services/api';
import styles from '../../assets/globals.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {variables} from '../../assets/variables';

function OnlineModal(props) {
  const [networkState, setNetworkState] = useState(null);
  const [nChange, setNChange] = useState(0);

  const [showMessage, setShowMessage] = useState(props.isVisible);
  return (
    <View>
      <View>
        <View
          style={[
            styles.centerXY,
            styles.absolute,
            {top: 0, zIndex: 999999},
            styles.mt10,
            styles.fullWidth,
          ]}>
          <View
            style={[
              styles.modalViewSm,
              styles.spaceBetween,
              {
                minHeight: 60,
                backgroundColor: variables.warning,
                opacity: 1,
              },
              styles.centerXY,
            ]}>
            <View style={[styles.p10, styles.row, styles.centerY]}>
              <View style={[styles.flex1, styles.centerXY]}>
                <Icon
                  name="info-outline"
                  size={variables.icon}
                  color={'white'}
                />
              </View>
              <View style={[styles.flex5, styles.centerY]}>
                <Text
                  style={[
                    styles.pl5,
                    styles.textVerticalCenter,
                    {color: 'white', fontSize: variables.fontSmall + 2},
                  ]}>
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

export default OnlineModal;
