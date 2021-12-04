import React, {useEffect, useState} from 'react';
import {Alert, Text, View, Pressable} from 'react-native';
import {fetchAPI} from '../../services/api';
import styles from '../../assets/globals.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {variables} from '../../assets/variables';
import ModalInfo from './ModalInfo';
import ModalInfoSuccess from './ModalInfoSuccess';

function index(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    const {user, setErrorToFalse, setSuccessToFalse} = props;
    if (user.error == true) {
      setShowMessage(true);
      setMessage(props.user.message);

      setTimeout(() => {
        setShowMessage(false);
        setErrorToFalse();
      }, 5000);
    }
  }, [props.user.error]);

  useEffect(() => {
    const {user, setErrorToFalse, setSuccessToFalse} = props;

    if (user.success == true) {
      setMessageSuccess(true);
      setMessage(props.user.message);

      setTimeout(() => {
        setMessageSuccess(false);
        setSuccessToFalse();
      }, 3000);
    }
  }, [props.user.success]);

  return (
    <View>
      {showMessage ? (
        <ModalInfo
          isVisible={showMessage}
          setModal={status => setShowMessage(status)}
          message={message}
        />
      ) : (
        <View></View>
      )}
      {messageSuccess ? (
        <ModalInfoSuccess
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
