import produce from 'immer';
import uuid from 'react-native-uuid';

const INIT_STATE = {
  userInfo: {
    name: '',
    phone: '',
    photoPath: '',
    isAuth: false,
  },
  contacts: [],
  groups: [],
  contactsPendingApproval: [],
  error: false,
  loading: false,
  success: false,
  message: '',
  uuid: null,
};

export default function user(state = INIT_STATE, action) {
  switch (action.type) {
    case 'SET_NEW_CONTACT':
      return produce(state, draft => {
        const data = action.payload.contacts;
        if (Array.isArray(data)) {
          data.map((el, index) => {
            const it = draft.contacts.findIndex(
              dC => dC.contactPhone == el.contactPhone,
            );
            if (it == -1) draft.contacts.push(el);
          });
        }
      });
    case 'SET_NEW_CONTACT_PENDING_APPROVAL':
      return produce(state, draft => {
        const data = action.payload.contacts;

        const it = draft.contactsPendingApproval.findIndex(
          dC => dC.contactPhone == data.contactPhone,
        );
        if (it == -1) draft.contactsPendingApproval.push(data);
      });
    case 'DELETE_CONTACT_PENDING_APPROVAL':
      return produce(state, draft => {
        const contactPhone = action.payload.contactPhone;

        draft.contactsPendingApproval = draft.contactsPendingApproval.filter(
          dC => dC.contactPhone != contactPhone,
        );
      });
    case 'SET_GROUP_FROM_PAYLOAD':
      return produce(state, draft => {
        draft.groups = action.payload.data;
      });

    case 'DELETE_GROUP':
      return produce(state, draft => {
        draft.groups = draft.groups.filter(
          el => el.groupID != action.payload.groupID,
        );
      });

    case 'ADD_NOT_SEEN_MESSAGE':
      return produce(state, draft => {
        const contactPhone = action.payload.contactPhone;

        for (let i = 0; i < draft.contacts.length; i++) {
          if (draft.contacts[i].contactPhone == contactPhone) {
            if (draft.contacts[i].hasOwnProperty('notSeenMessages')) {
              draft.contacts[i].notSeenMessages += 1;
            } else {
              draft.contacts[i].notSeenMessages = 1;
            }
          }
        }

        // O mesmo deve ser feito para os grupos

        for (let i = 0; i < draft.groups.length; i++) {
          if (draft.groups[i].groupID == contactPhone) {
            if (draft.groups[i].hasOwnProperty('notSeenMessages')) {
              draft.groups[i].notSeenMessages += 1;
            } else {
              draft.groups[i].notSeenMessages = 1;
            }
          }
        }
      });
    case 'CLEAN_NOT_SEEN_MESSAGES':
      return produce(state, draft => {
        contactPhone = action.payload.contactPhone;
        for (let i = 0; i < draft.contacts.length; i++) {
          if (draft.contacts[i].contactPhone == contactPhone) {
            if (draft.contacts[i]?.notSeenMessages) {
              draft.contacts[i].notSeenMessages = 0;
            }
          }
        }

        // O mesmo deve ser feito para os grupos

        for (let i = 0; i < draft.groups.length; i++) {
          if (draft.groups[i].groupID == contactPhone) {
            if (draft.groups[i]?.notSeenMessages) {
              draft.groups[i].notSeenMessages = 0;
            }
          }
        }
      });
    case 'SET_LOGIN_SUCCESS':
      return produce(state, draft => {
        draft.userInfo.isAuth = true;
        draft.userInfo.name = action.payload.name;
        draft.userInfo.phone = action.payload.phone;
      });
    case 'DELETE_CONTACT':
      return produce(state, draft => {
        const contacts = draft.contacts.filter(
          el => el.contactPhone != action.payload.contactPhone,
        );

        draft.contacts = contacts;
      });

    case 'SET_USER_INFO':
      return produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
      });

    case 'ERROR_TO_FALSE':
      return produce(state, draft => {
        draft.error = false;
        return draft;
      });
    case 'SUCCESS_TO_FALSE':
      return produce(state, draft => {
        draft.success = false;
        return draft;
      });
    case 'SET_SUCCESS_MESSAGE':
      return produce(state, draft => {
        draft.success = true;
        draft.error = false;
        draft.message = action.payload.message;
        return draft;
      });
    case 'SET_ERROR_MESSAGE':
      return produce(state, draft => {
        draft.error = true;
        draft.success = false;
        draft.message = action.payload.message;
        return draft;
      });
    case 'SET_LOGOUT':
      return INIT_STATE;
    default:
      return state;
  }
}
