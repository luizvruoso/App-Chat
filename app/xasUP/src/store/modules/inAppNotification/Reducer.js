import produce from 'immer';
const INIT_STATE = {
  error: false,
  success: false,
  message: '',
};

export default function inAppNotification(state = INIT_STATE, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}
