import {connect} from 'react-redux';
import Routes from '../Routes';
import {
  addNotSeenMessage,
  getGroups,
  addContactPendingForApproval,
} from '../store/modules/user/Actions';
import {
  registerMessage,
  setMessagesAsVisualizedByUser,
  setMessageDelivered,
} from '../store/modules/messages/Actions';
import {
  setErrorToFalse,
  setSuccessToFalse,
} from '../store/modules/inAppNotification/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    inAppNotification: state.inAppNotification,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getGroups: contactPhone => {
      return dispatch(getGroups(contactPhone));
    },
    setMessageDelivered: (chatId, msgId) => {
      return dispatch(setMessageDelivered(chatId, msgId));
    },
    addNotSeenMessage: contactPhone => {
      return dispatch(addNotSeenMessage(contactPhone));
    },
    addContactPendingForApproval: (contactName, contactPhone) => {
      return dispatch(addContactPendingForApproval(contactName, contactPhone));
    },
    registerMessage: (message, type, chatId, fromWho) => {
      return dispatch(registerMessage(message, type, chatId, fromWho));
    },
    setErrorToFalse: () => {
      return dispatch(setErrorToFalse());
    },
    setSuccessToFalse: () => {
      return dispatch(setSuccessToFalse());
    },
    setMessagesAsVisualizedByUser: user => {
      return dispatch(setMessagesAsVisualizedByUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
