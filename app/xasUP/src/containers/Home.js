import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setErrorToFalse,
  setSuccessToFalse,
  removeContact,
} from '../store/modules/user/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
