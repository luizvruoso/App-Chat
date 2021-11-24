import {getUserData} from './middlewares';
import {convertDate, fromDateToDate, now} from '../../../assets/utils';
import {fetchAPI} from '../../../service/api';

export function login(name, phone) {
  return async dispatch => {
    try {
      const ret = await fetchAPI('POST', '/postUser', null, {name, phone});

      dispatch(setLoginSucessPayload({name, phone}));
    } catch (err) {
      console.error('Eror ao inserir contato', err);
    }
  };
}

export function addContact(contactName, contactPhone) {
  return dispatch => {
    try {
      dispatch(setContactPayload([{contactName, contactPhone}]));
    } catch (err) {
      console.error('Eror ao inserir contato', err);
    }
  };
}

export function removeContact(contactPhone) {
  return dispatch => {
    try {
      dispatch(setRemoveContactPayload(contactPhone));
    } catch (err) {
      console.error('Eror ao remover contato');
    }
  };
}

function setLoginSucessPayload(data) {
  return {
    type: 'SET_LOGIN_SUCCESS',
    payload: {
      name: data.name,
      phone: data.phone,
    },
  };
}

function setRemoveContactPayload(data) {
  return {
    type: 'DELETE_CONTACT',
    payload: {
      contactPhone: data,
    },
  };
}

function setContactPayload(data) {
  return {
    type: 'SET_NEW_CONTACT',
    payload: {
      contacts: data,
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

export function setPhoneAuth(data) {
  return {
    type: 'SET_PHONE_AUTH',
    payload: {
      phone: data.phone,
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

export function failedLogin() {
  return {
    type: 'SET_FAILED_LOGIN',
    payload: {
      name: null,
      loginMethod: null,
      userId: null,
      username: null,
      isAuthenticated: false,
      expiresIn: 0,
      error: false,
      loading: false,
      message: null,
      roles: null,
    },
  };
}
