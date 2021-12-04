/*
 * DOCUMENTATION: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 **/

/*
 * DOCUMENTATION: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 **/

import {
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContent,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import AppMessageNotification from './components/AppMessageNotification';
import Home from './containers/Home';
import Chat from './containers/Chat';
import Adicionar from './containers/Adicionar';
import Mqtt from './service/mqtt';
import Login from './containers/Login';
//import Sensors from './containers/SensorsMeasurements';

const navigationRef = React.createRef();

const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export function navigate(name, params) {
  //USADO PARA ABRIR UMA PAGINA MESMO QUE SEJA FORA DE UM COMPONENTE
  navigationRef.current && navigationRef.current.navigate(name, params);
}

export function navigatePop() {
  //let a = navigationRef.current?.getCurrentScreenStack();
  //CommonActions
  navigationRef.current?.dispatch(StackActions.pop());
}

export default function Routes(props) {
  const {user} = props;

  useEffect(() => {
    const contacts = props.user.contacts;
    //set novos listener a partir dos novos grupos

    var listSub = [];

    props.user.groups.map(el => {
      listSub.push({
        id: el.groupID,
      });
    });

    listSub.push({
      id: props.user.userInfo.phone,
    });
    Mqtt.setSubscriptions(listSub);
  }, [props.user.groups]);

  useEffect(() => {
    //Mqtt.connection();
    /*Mqtt.listenTo('xuzito', msg => {
      console.log('halozion', msg);
    });*/
    //const mqttConnection = new MqttConnection();

    props.getGroups(props.user.userInfo.phone);

    var listSub = [];

    props.user.groups.map(el => {
      listSub.push({
        id: el.groupID,
      });
    });

    listSub.push({
      id: props.user.userInfo.phone,
    });

    console.log('list sub', listSub);

    Mqtt.init(listSub, {
      basicInfo: {
        personalTopic: props.user.userInfo.phone,
      },
      registerMessage: props.registerMessage,
      setMessagesAsVisualizedByUser: props.setMessagesAsVisualizedByUser,
      getGroups: () => {
        //console.log('funcao com valor: ', props.user.userInfo.phone);
        props.getGroups(props.user.userInfo.phone); //forço um valor padrao para essa chamada
      },
      addContactPendingForApproval: props.addContactPendingForApproval,
    });

    //mqtt.onMessage(props.registerMessage);
    /*Mqtt.listenTo(
      [
        {
          contactName: props.user.userInfo.name,
          contactPhone: props.user.userInfo.phone,
        },
      ],
      '',
    );*/
  }, []);
  const routeLogged = () => {
    const {user, setErrorToFalse, setSuccessToFalse} = props;

    return (
      <SafeAreaView style={[{flex: 1}, {backgroundColor: '#FFF'}]}>
        <AppMessageNotification
          user={user}
          setErrorToFalse={setErrorToFalse}
          setSuccessToFalse={setSuccessToFalse}
        />
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

          <RootStack.Navigator
            screenOptions={{
              headerShown: true,
            }}
            initialRouteName="Home">
            <RootStack.Screen
              name="XASUP"
              component={Home}
              options={{
                title: 'XASUP',
                headerStyle: {
                  backgroundColor: '#293952',
                },
                headerTitleAlign: 'left',
                headerTintColor: '#fff',
                headerStatusBarHeight: 50,
                headerTitleStyle: {
                  //fontWeight: 'bold',
                },
              }}
            />
            <RootStack.Screen
              name="Chat"
              options={({route}) => ({
                title:
                  route.params.type != 'group'
                    ? route.params.item.contactName
                    : route.params.item.groupName,
                headerStyle: {
                  backgroundColor: '#293952',
                },
                headerTitleAlign: 'left',
                headerTintColor: '#fff',
                headerStatusBarHeight: 50,
                headerTitleStyle: {
                  //fontWeight: 'bold',
                },
              })}
              component={Chat}
            />
            <RootStack.Screen
              name="Adicionar"
              component={Adicionar}
              options={({route}) => ({
                title: 'Adicionar',
                headerStyle: {
                  backgroundColor: '#293952',
                },
                headerTitleAlign: 'left',
                headerTintColor: '#fff',
                headerStatusBarHeight: 50,
                headerTitleStyle: {
                  //fontWeight: 'bold',
                },
              })}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  };

  const routeNotLogged = () => {
    const {user, setErrorToFalse, setSuccessToFalse} = props;

    return (
      <SafeAreaView style={[{flex: 1}, {backgroundColor: '#FFF'}]}>
        <AppMessageNotification
          user={user}
          setErrorToFalse={setErrorToFalse}
          setSuccessToFalse={setSuccessToFalse}
        />
        <NavigationContainer ref={navigationRef}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: true,
            }}>
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                headerStyle: {
                  backgroundColor: '#293952',
                },
                headerTitleAlign: 'left',
                headerTintColor: '#fff',
                headerStatusBarHeight: 50,
                headerTitleStyle: {
                  //fontWeight: 'bold',
                },
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  };

  return !props.user.userInfo.isAuth ? routeNotLogged() : routeLogged();
}
