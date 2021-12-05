import React, {useEffect, useState} from 'react';
import {Alert, Text, View, Pressable} from 'react-native';
import {fetchAPI} from '../../services/api';
import styles from '../../assets/globals.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {variables} from '../../assets/variables';
import AlertView from './AlertView';
import SuccessView from './SuccessView';

function index(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    const {controller, setErrorToFalse, setSuccessToFalse} = props;
    if (controller.error == true) {
      setShowMessage(true);
      setMessage(props.controller.message);

      setTimeout(() => {
        setShowMessage(false);
        setErrorToFalse();
      }, 5000);
    }
  }, [props.controller.error]);

  useEffect(() => {
    const {controller, setErrorToFalse, setSuccessToFalse} = props;

    if (controller.success == true) {
      setMessageSuccess(true);
      setMessage(props.controller.message);

      setTimeout(() => {
        setMessageSuccess(false);
        setSuccessToFalse();
      }, 3000);
    }
  }, [props.controller.success]);

  return (
    <View>
      {showMessage ? (
        <AlertView
          isVisible={showMessage}
          setModal={status => setShowMessage(status)}
          message={message}
        />
      ) : (
        <View></View>
      )}
      {messageSuccess ? (
        <SuccessView
          isVisible={messageSuccess}
          setModal={status => setMessageSuccess(status)}
          message={message}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default index;
