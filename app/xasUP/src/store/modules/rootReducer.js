import {combineReducers} from 'redux';
import user from './user/Reducer';
import messages from './messages/Reducer';
import inAppNotification from './inAppNotification/Reducer';

const appReducer = combineReducers({
  user,
  messages,
  inAppNotification,
});

const rootReducer = (state, action) => {
  if (action.type == 'SET_LOGOUT') {
    state.user = [];
    return appReducer(state, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
