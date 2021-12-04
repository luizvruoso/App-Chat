import {connect} from 'react-redux';
import Routes from '../Routes';
import {
  setErrorToFalse,
  setSuccessToFalse,
  addNotSeenMessage,
  getGroups,
  addContactPendingForApproval,
} from '../store/modules/user/Actions';
import {
  registerMessage,
  setMessagesAsVisualizedByUser,
} from '../store/modules/messages/Actions';
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getGroups: contactPhone => {
      return dispatch(getGroups(contactPhone));
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
