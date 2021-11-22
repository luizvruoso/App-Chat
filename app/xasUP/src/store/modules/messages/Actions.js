import {} from './middlewares';
import {convertDate, fromDateToDate, now} from '../../../assets/utils';
import uuid from 'react-native-uuid';

export function registerMessage(message, type) {
  return dispatch => {
    try {
      dispatch(mountPayloadMessage(message, type));
      console.log('alo');
    } catch (err) {
      console.log('ee', err);
    }
  };
}

function mountPayloadMessage(message, type) {
  return {
    type: 'REGISTER_MESSAGE',
    payload: {
      type: type,
      id: uuid.v4(),
      message: message,
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
