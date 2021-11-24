import {connect} from 'react-redux';
import Login from '../screens/Login';
import {
  setErrorToFalse,
  setSuccessToFalse,
  removeContact,
  login,
} from '../store/modules/user/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (name, phone) => {
      return dispatch(login(name, phone));
    },
    removeContact: contactPhone => {
      return dispatch(removeContact(contactPhone));
    },
    setErrorToFalse: () => {
      return dispatch(setErrorToFalse());
    },
    setSuccessToFalse: () => {
      return dispatch(setSuccessToFalse());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
