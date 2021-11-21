import produce from 'immer';

const INIT_STATE = {
  userInfo: {
    name: '',
    phone: '',
    photoPath: '',
  },
  error: false,
  loading: false,
  success: false,
  message: '',
  uuid: null,
};

export default function user(state = INIT_STATE, action) {
  switch (action.type) {
    case 'SET_SUCCESS_LOGIN':
      return action.payload;

    case 'SET_PHONE_AUTH':
      return produce(state, draft => {
        draft.userInfo.phone = action.payload.phone;
        return draft;
      });

    case 'SET_FAILED_LOGIN':
      return INIT_STATE;

    case 'SET_USER_INFO':
      return produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
      });

    case 'SET_USER_DATA':
      return produce(state, draft => {
        draft.uuid = action.payload.data.uuid;
        draft.userInfo = action.payload.data.userInfo;
        return draft;
      });
    case 'SET_STEP_TYPE_CODE':
      return produce(state, draft => {
        draft.userInfo.phone = action.payload.phone;
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
