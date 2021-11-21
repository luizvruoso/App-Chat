import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setErrorToFalse,
  setSuccessToFalse,
} from '../store/modules/user/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setErrorToFalse: () => {
      return dispatch(setErrorToFalse());
    },
    setSuccessToFalse: () => {
      return dispatch(setSuccessToFalse());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
