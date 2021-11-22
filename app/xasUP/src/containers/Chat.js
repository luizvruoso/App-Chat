import {connect} from 'react-redux';
import Chat from '../screens/Chat';
import {
  setErrorToFalse,
  setSuccessToFalse,
  registerMessage,
} from '../store/modules/messages/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    registerMessage: (message, type) => {
      return dispatch(registerMessage(message, type));
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
