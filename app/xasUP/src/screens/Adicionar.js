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
import {fetchAPI} from '../service/api';
import CheckBox from '@react-native-community/checkbox';
import MqttConnection from '../service/mqtt';

var globalData = [];
export default function Adicionar(props) {
  const [val, setVal] = useState('');
  const [data, setData] = useState([]);
  const type = props.route.params.type;
  const [arrUsersSelected, setArrUsersSelected] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetchData = async () => {
      try {
        var auxData = await fetchAPI('GET', '/getAllUsers', null, null);
        // props.user.contacts /.userinfo.phone

        var contactsWithoutOwn = auxData.data.filter(
          el => el.contactPhone != props.user.userInfo.phone,
        );
        var final = contactsWithoutOwn;
        if (type !== 'group') {
          final = contactsWithoutOwn.filter(
            ({contactName: a, contactPhone: x}) =>
              !props.user.contacts.some(
                ({contactName: b, contactPhone: y}) => a === b && x === y,
              ),
          );
        }

        setData(final);
        globalData = final;
      } catch (err) {
        console.error('erro ao resgatar dados', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (val.length > 0) {
      var auxData = globalData.filter(
        el =>
          el.contactName.toLowerCase().search(val.toLowerCase()) != -1 ||
          el.contactPhone.toLowerCase().search(val.toLowerCase()) != -1,
      );
      setData(auxData);
      return;
    }
    setData(globalData);
  }, [val]);

  const renderItem = useCallback(({item}) => {
    //console.log('aaaa', item);
    return (
      <TouchableOpacity
        onPress={() => {
          props.addContact(item.contactName, item.contactPhone);
          props.initChat(item.contactPhone);

          MqttConnection.sendMessage('baeldung', {
            mqttTopic: {
              to: item.contactPhone,
              from: props.user.userInfo.phone,
            },
            extraData: {
              contactName: props.user.userInfo.name,
            },
            setState: 'newContactPendingApproval',
          });
          navigate('XASUP');
        }}>
        <View
          style={[
            styles.flex1,
            styles.row,
            styles.p20,
            {backgroundColor: '#FFF'},
          ]}>
          <View style={[styles.flex1, styles.centerY]}>
            <Text>{item.contactName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderItemManageContacts = useCallback(({item}) => {
    //console.log('aaaa', item);
    return (
      <View
        style={[
          styles.flex1,
          styles.row,
          //styles.p20,
          {backgroundColor: '#FFF'},
        ]}>
        <View style={[styles.flex1, styles.centerY, styles.p20]}>
          <Text>{item.contactName}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.p20,
            {backgroundColor: variables.redVelvet, width: 100},
            styles.centerXY,
          ]}
          onPress={() => {
            props.deleteFromPendingApproval(item.contactPhone);
            /*props.addContact(item.contactName, item.contactPhone);
            props.initChat(item.contactPhone);
            */
            MqttConnection.sendMessage('baeldung', {
              mqttTopic: {
                to: item.contactPhone,
                from: props.user.userInfo.phone,
              },
              extraData: {
                contactName: props.user.userInfo.name,
              },
              setState: 'notify_UserRefusedAddContact',
            });
            navigate('XASUP');
          }}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>Recusar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {backgroundColor: variables.success, width: 100},
            styles.py20,
            styles.centerXY,
          ]}
          onPress={() => {
            props.addContact(item.contactName, item.contactPhone);
            props.initChat(item.contactPhone);
            props.deleteFromPendingApproval(item.contactPhone);

            /*MqttConnection.sendMessage('baeldung', {
              mqttTopic: {
                to: item.contactPhone,
                from: props.user.userInfo.phone,
              },
              extraData: {
                contactName: props.user.userInfo.name,
              },
              setState: 'newContactPendingApproval',
            });*/
            navigate('XASUP');
          }}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>Aceitar</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const setArrUser = (state, item) => {
    if (state) {
      var aux = arrUsersSelected;
      aux.push(item);
      setArrUsersSelected(aux);
    } else {
      var aux = arrUsersSelected;
      var auxFinal = aux.filter(el => el.contactPhone != item.contactPhone);

      setArrUsersSelected(auxFinal);
    }

    setRefresh(!refresh);
  };

  const renderItemWithSelect = useCallback(
    ({item}) => {
      //console.log('aaaa', item);
      var index = arrUsersSelected.findIndex(
        el => el.contactPhone == item.contactPhone,
      );
      return (
        <View
          style={[
            styles.flex1,
            styles.row,
            styles.p20,
            {backgroundColor: '#FFF'},
          ]}>
          <CheckBox
            disabled={false}
            value={index != -1 ? true : false}
            onValueChange={newValue => setArrUser(newValue, item)}
          />
          <View style={[styles.flex1, styles.centerY]}>
            <Text>{item.contactName}</Text>
          </View>
        </View>
      );
    },
    [arrUsersSelected, refresh],
  );

  if (type == 'contact') {
    return (
      <View style={{flex: 1}}>
        <View style={[styles.row, styles.centerXY, styles.my10, styles.mx10]}>
          <TextInput
            onChangeText={val => setVal(val)}
            value={val}
            style={{
              paddingLeft: 10,
              backgroundColor: '#FFF',
              width: '100%',
              borderWidth: 0.8,
              borderColor: '#CCC',
              color: '#000',
            }}
            placeholder={'Busque por Nome ou Telefone'}
          />
        </View>
        <FlatList
          //keyExtractor={keyExtractor}
          style={[styles.mb20]}
          data={data}
          renderItem={renderItem}
        />
      </View>
    );
  } else if (type == 'group') {
    return (
      <View>
        <View style={[styles.my10, styles.mx10]}>
          <View style={[styles.row, styles.mb10]}>
            <TextInput
              onChangeText={val => setGroupName(val)}
              value={groupName}
              placeholder="Nome do grupo"
              style={{
                paddingLeft: 10,
                backgroundColor: '#FFF',
                width: '100%',
                borderWidth: 0.8,
                borderColor: '#CCC',
                color: '#000',
              }}
            />
          </View>
          <View style={[styles.row]}>
            <Text style={{textAlign: 'left'}}>Min: 5 , Máx: Infinity</Text>
          </View>
        </View>

        <FlatList
          //keyExtractor={keyExtractor}
          style={[styles.mb20, {style: '100%'}]}
          data={data}
          renderItem={renderItemWithSelect}
          extraData={arrUsersSelected}
        />
        <View style={[styles.row, styles.my10, styles.mx10]}>
          <TouchableOpacity
            onPress={() => {
              if (val.length > 5) {
                let aux = arrUsersSelected;

                aux.push({
                  contactPhone: props.user.userInfo.phone,
                  contactName: props.user.userInfo.name,
                });

                props.addGroup(groupName, aux);
                props.getGroups(props.user.userInfo.phone);
                arrUsersSelected.pop();
                // envia uma mensagem forçando os clientes adicionados ao grupo para atualizar
                arrUsersSelected.map(el => {
                  MqttConnection.sendMessage('baeldung', {
                    mqttTopic: {
                      to: el.contactPhone,
                      from: props.user.userInfo.phone,
                    },
                    setState: 'fetchForNewGroups',
                  });
                });

                navigate('XASUP');
              }
            }}
            style={[
              {backgroundColor: '#CCC', width: '100%', height: 50},
              styles.centerXY,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Criar Grupo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (type == 'manageContacts') {
    return (
      <View style={{flex: 1}}>
        <FlatList
          //keyExtractor={keyExtractor}
          style={[styles.mb20]}
          data={props.user.contactsPendingApproval}
          renderItem={renderItemManageContacts}
        />
      </View>
    );
  }
}
