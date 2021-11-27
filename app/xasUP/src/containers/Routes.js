import {connect} from 'react-redux';
import Routes from '../Routes';
import {
  setErrorToFalse,
  setSuccessToFalse,
  addNotSeenMessage,
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
    addNotSeenMessage: contactPhone => {
      return dispatch(addNotSeenMessage(contactPhone));
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
    setMessagesAsVisualizedByUser: user => {
      return dispatch(setMessagesAsVisualizedByUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
