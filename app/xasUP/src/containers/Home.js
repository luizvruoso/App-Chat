import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setErrorToFalse,
  setSuccessToFalse,
  removeContact,
  addNotSeenMessage,
  getGroups,
  leaveGroup,
} from '../store/modules/user/Actions';
import {deleteChat} from '../store/modules/messages/Actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    leaveGroup: (groupID, contactPhone) => {
      return dispatch(leaveGroup(groupID, contactPhone));
    },
    getGroups: contactPhone => {
      return dispatch(getGroups(contactPhone));
    },
    addNotSeenMessage: contactPhone => {
      return dispatch(addNotSeenMessage(contactPhone));
    },
    deleteChat: chatId => {
      return dispatch(deleteChat(chatId));
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
