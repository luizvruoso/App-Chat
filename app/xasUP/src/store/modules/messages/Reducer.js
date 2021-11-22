import produce from 'immer';

export default function messages(state = [], action) {
  switch (action.type) {
    case 'REGISTER_MESSAGE':
      return produce(state, draft => {
        if (!Array.isArray(draft)) {
          draft = [];
        }
        draft.push(action.payload);

        return draft;
      });

    //return state.push(action.payload);
    default:
      return state;
  }
}
