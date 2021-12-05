import {connect} from 'react-redux';
import Chat from '../screens/Chat';
import {
  setErrorToFalse,
  setSuccessToFalse,
  registerMessage,
  initChat,
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
    initChat: chatId => {
      return dispatch(initChat(chatId));
    },
    cleanNotSeenMessages: chatId => {
      return dispatch(cleanNotSeenMessages(chatId));
    },
    registerMessage: (message, type, chatId, fromWho, chatType) => {
      return dispatch(
        registerMessage(message, type, chatId, fromWho, chatType),
      );
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
