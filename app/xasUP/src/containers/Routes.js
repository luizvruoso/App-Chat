import {connect} from 'react-redux';
import Routes from '../Routes';
import {
  setErrorToFalse,
  setSuccessToFalse,
} from '../store/modules/user/Actions';
import {registerMessage} from '../store/modules/messages/Actions';
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
