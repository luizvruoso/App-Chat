import {validate} from '@babel/types';
import produce from 'immer';

const INIT_STATE = [
  {
    chatId: 19998634442,
    messages: [{}],
  },
  {
    chatId: 123456789,
    messages: [{}],
  },
];

export default function messages(state = [], action) {
  switch (action.type) {
    case 'REGISTER_MESSAGE':
      return produce(state, draft => {
        if (!Array.isArray(draft)) {
          draft = [];
        }

        const index = draft.findIndex(
          el => el.chatId === action.payload.chatId,
        );

        if (index == -1) {
          //caso nao exista crio o campo para inserção das mensagens
          const newElement = {
            chatId: action.payload.chatId,
            messages: [action.payload.message],
          };
          draft.push(newElement);
        } else {
          draft[index].messages.reverse();
          draft[index].messages.push(action.payload.message);
          draft[index].messages.reverse();
        }
      });
    case 'INIT_CHAT':
      return produce(state, draft => {
        if (!Array.isArray(draft)) {
          draft = [];
        }

        const index = draft.findIndex(
          el => el.chatId === action.payload.chatId,
        );

        if (index == -1) {
          //caso nao exista crio o campo para inserção das mensagens
          const newElement = {
            chatId: action.payload.chatId,
            messages: [],
          };
          draft.push(newElement);
        }
      });
    //return state.push(action.payload);
    default:
      return state;
  }
}
