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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatCel} from '../assets/utils';

export default function Login(props) {
  const [val, setVal] = useState('');
  const [name, setName] = useState('');
  return (
    <View style={{flex: 1}}>
      <View style={[styles.mx10, styles.my10]}>
        <View style={[styles.row, styles.mx10, styles.my10]}>
          <Text>Digite seu telefone para continuar</Text>
        </View>
        <View style={[styles.row, styles.centerXY, styles.my10]}>
          <TextInput
            onChangeText={val => setVal(val)}
            value={formatCel(val)}
            style={{
              backgroundColor: '#FFF',
              width: '100%',
              borderWidth: 0.8,
              borderColor: '#CCC',
              color: '#000',
            }}
          />
        </View>
        <View style={[styles.row, styles.mx10, styles.my10]}>
          <Text>Nome</Text>
        </View>
        <View style={[styles.row, styles.centerXY, styles.my10]}>
          <TextInput
            onChangeText={val => setName(val)}
            value={name}
            style={{
              backgroundColor: '#FFF',
              width: '100%',
              borderWidth: 0.8,
              borderColor: '#CCC',
              color: '#000',
            }}
          />
        </View>
        <View style={[styles.row, styles.centerXY, styles.my10]}>
          <TouchableOpacity
            onPress={() => {
              if (val.length == 16 && name.length > 5) {
                props.login(name, val);
              }
            }}
            style={[
              styles.row,
              //styles.bgWhite,
              styles.btnBorderRadius,
              styles.centerXY,
              {
                width: '100%',
                height: 60,
                borderColor: '#FFF',
                backgroundColor: '#293952',
              },
            ]}>
            <Text style={[{textAlign: 'center', fontSize: 18, color: '#fff'}]}>
              ENTRAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
