import {
  getUserData,
  sendGroupCreate,
  getGroupsServer,
  postLeaveGroup,
} from './middlewares';
import {convertDate, fromDateToDate, now} from '../../../assets/utils';
import {fetchAPI} from '../../../service/api';
import {initChat} from '../messages/Actions';

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

export function addNotSeenMessage(contactPhone) {
  return async dispatch => {
    try {
      dispatch({
        type: 'ADD_NOT_SEEN_MESSAGE',
        payload: {
          contactPhone,
        },
      });
    } catch (err) {
      console.error('Eror ao inserir contato', err);
    }
  };
}

export function deleteFromPendingApproval(contactPhone) {
  return async dispatch => {
    try {
      dispatch({
        type: 'DELETE_CONTACT_PENDING_APPROVAL',
        payload: {
          contactPhone,
        },
      });
    } catch (err) {
      console.error('Eror ao retirar usuario de pendencia de aprovação', err);
    }
  };
}

export function cleanNotSeenMessages(contactPhone) {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAN_NOT_SEEN_MESSAGES',
        payload: {
          contactPhone,
        },
      });
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
      console.error('Erro ao inserir contato', err);
    }
  };
}

export function addContactPendingForApproval(contactName, contactPhone) {
  return dispatch => {
    try {
      dispatch(setPendingApprovalContactPayload({contactName, contactPhone}));
      console.log('contato pendete de aprovação', {contactName, contactPhone});
    } catch (err) {
      console.error('Erro ao adicionar contato pendente de aprovação', err);
    }
  };
}

export function addGroup(groupName, groupMembers) {
  return async dispatch => {
    try {
      const ret = await sendGroupCreate({groupName, groupMembers});
      //console.log('ret', ret.data);
      if (ret.data != null) dispatch(initChat(ret.data.groupID));
      //dispatch(setNewGroupPayload({groupName, groupMembers}));
    } catch (err) {
      console.error('Erro ao criar grupo', err);
    }
  };
}

export function getGroups(contactPhone) {
  return async dispatch => {
    try {
      const ret = await getGroupsServer({contactPhone});
      if (ret.data != null) dispatch(setNewGroupPayload(ret.data));
    } catch (err) {
      console.error('Erro ao criar grupo', err);
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

export function leaveGroup(groupID, contactPhone) {
  return async dispatch => {
    try {
      await postLeaveGroup({groupID, contactPhone});
      dispatch(removeGroupFromList(groupID));
    } catch (err) {
      console.error('Eror ao remover contato');
    }
  };
}

export function logoutAction() {
  return {
    type: 'SET_LOGOUT',
    payload: {},
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

function setPendingApprovalContactPayload(data) {
  return {
    type: 'SET_NEW_CONTACT_PENDING_APPROVAL',
    payload: {
      contacts: data,
    },
  };
}

function removeGroupFromList(data) {
  return {
    type: 'DELETE_GROUP',
    payload: {
      groupID: data,
    },
  };
}

function setNewGroupPayload(data) {
  return {
    type: 'SET_GROUP_FROM_PAYLOAD',
    payload: {
      data: data,
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
