import {connect} from 'react-redux';
import Chat from '../screens/Chat';
import {
  setErrorToFalse,
  setSuccessToFalse,
  registerMessage,
} from '../store/modules/messages/Actions';

import {cleanNotSeenMessages} from '../store/modules/user/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    cleanNotSeenMessages: chatId => {
      return dispatch(cleanNotSeenMessages(chatId));
    },
    registerMessage: (message, type, chatId) => {
      return dispatch(registerMessage(message, type, chatId));
    },
    setErrorToFalse: () => {
      return dispatch(setErrorToFalse());
    },
    setSuccessToFalse: () => {
      return dispatch(setSuccessToFalse());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
