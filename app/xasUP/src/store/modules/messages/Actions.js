import {} from './middlewares';
import {convertDate, fromDateToDate, now} from '../../../assets/utils';
import uuid from 'react-native-uuid';
import {
  addNotSeenMessage,
  cleanNotSeenMessages,
} from '../../modules/user/Actions';

export function registerMessage(message, type, chatId, fromWho) {
  return dispatch => {
    try {
      dispatch(mountPayloadMessage(message, type, chatId, fromWho));
      if (type == 'received') {
        dispatch(addNotSeenMessage(chatId));
      }

      //console.log('alo');
    } catch (err) {
      console.log('ee', err);
    }
  };
}

export function setMessagesAsVisualizedByUser(user) {
  return dispatch => {
    try {
      dispatch(mountSetVisualizedPayload(user));
      //dispatch(cleanNotSeenMessages(user));
      //console.log('alo');
    } catch (err) {
      console.log('ee', err);
    }
  };
}

export function deleteChat(chatId) {
  return dispatch => {
    try {
      dispatch(mountPayloadDeleteMessage(chatId));
      //console.log('alo');
    } catch (err) {
      console.log('erro ao deletar mensagem', err);
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

function mountSetVisualizedPayload(user) {
  return {
    type: 'SET_MESSAGES_AS_VISUALIZED',
    payload: {
      user: user,
    },
  };
}

function mountPayloadDeleteMessage(chatId) {
  return {
    type: 'CLEAR_CHAT',
    payload: {
      chatId: chatId,
    },
  };
}

function mountPayloadMessage(message, type, chatId, fromWho) {
  return {
    type: 'REGISTER_MESSAGE',
    payload: {
      chatId: chatId,
      message: {
        type: type,
        id: uuid.v4(),
        message: message,
        date: now(),
        visualized: false,
        fromWho: fromWho,
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
