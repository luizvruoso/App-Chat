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
    Mqtt.listenTo(contacts, '');
  }, [props.user.contacts]);

  useEffect(() => {
    //Mqtt.connection();
    /*Mqtt.listenTo('xuzito', msg => {
      console.log('halozion', msg);
    });*/

    Mqtt.onMessage(props.registerMessage);
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
            <RootStack.Screen name="XASUP" component={Home} />
            <RootStack.Screen
              name="Chat"
              options={({route}) => ({title: route.params.item.contactName})}
              component={Chat}
            />
            <RootStack.Screen name="Adicionar" component={Adicionar} />
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
            <RootStack.Screen name="Login" component={Login} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  };

  return !props.user.userInfo.isAuth ? routeNotLogged() : routeLogged();
}
