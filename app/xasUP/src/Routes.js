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
import React, {Component} from 'react';
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
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

          <RootStack.Navigator
            screenOptions={{
              headerShown: true,
            }}
            initialRouteName="Home">
            <RootStack.Screen name="XASUP" component={Home} />
            <RootStack.Screen name="Chat" component={Chat} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  };

  return routeNotLogged();
}
