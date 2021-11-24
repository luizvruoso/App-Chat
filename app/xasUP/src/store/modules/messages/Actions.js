import {} from './middlewares';
import {convertDate, fromDateToDate, now} from '../../../assets/utils';
import uuid from 'react-native-uuid';

export function registerMessage(message, type, chatId) {
  return dispatch => {
    try {
      dispatch(mountPayloadMessage(message, type, chatId));
      //console.log('alo');
    } catch (err) {
      console.log('ee', err);
    }
  };
}
export function initChat(chatId) {
  return dispatch => {
    try {
      dispatch(mountPayloadInitChat(chatId));
      //console.log('alo');
    } catch (err) {
      console.log('ee', err);
    }
  };
}

function mountPayloadMessage(message, type, chatId) {
  return {
    type: 'REGISTER_MESSAGE',
    payload: {
      chatId: chatId,
      message: {
        type: type,
        id: uuid.v4(),
        message: message,
        date: now(),
      },
    },
  };
}

function mountPayloadInitChat(chatId) {
  return {
    type: 'INIT_CHAT',
    payload: {
      chatId: chatId,
    },
  };
}

export function setErrorMessage(message) {
  return {
    type: 'SET_ERROR_MESSAGE',
    payload: {
      message,
    },
  };
}

export function setSuccessMessage(message) {
  return {
    type: 'SET_SUCCESS_MESSAGE',
    payload: {
      message,
    },
  };
}

export function setErrorToFalse() {
  return {
    type: 'ERROR_TO_FALSE',
  };
}

export function setSuccessToFalse() {
  return {
    type: 'SUCCESS_TO_FALSE',
  };
}
