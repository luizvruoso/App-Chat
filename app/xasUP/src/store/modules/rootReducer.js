import {combineReducers} from 'redux';
import user from './user/Reducer';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type == 'SET_LOGOUT') {
    state.user = [];
    return appReducer(state, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
