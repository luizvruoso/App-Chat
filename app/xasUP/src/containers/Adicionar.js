import {connect} from 'react-redux';
import Adicionar from '../screens/Adicionar';
import {
  addContact,
  setErrorToFalse,
  setSuccessToFalse,
  addGroup,
  getGroups,
  deleteFromPendingApproval,
} from '../store/modules/user/Actions';
import {initChat, registerMessage} from '../store/modules/messages/Actions';
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    deleteFromPendingApproval: contactPhone => {
      return dispatch(deleteFromPendingApproval(contactPhone));
    },
    getGroups: contactPhone => {
      return dispatch(getGroups(contactPhone));
    },
    addGroup: (groupName, groupMembers) => {
      return dispatch(addGroup(groupName, groupMembers));
    },
    addContact: (contactName, contactPhone) => {
      return dispatch(addContact(contactName, contactPhone));
    },
    initChat: chatId => {
      return dispatch(initChat(chatId));
    },
    setErrorToFalse: () => {
      return dispatch(setErrorToFalse());
    },
    setSuccessToFalse: () => {
      return dispatch(setSuccessToFalse());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adicionar);
