import * as types from '../actions/notes';

const initialState = [];

export default function notes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      return [...state, action.note];

    case types.UPDATE_NOTE:
      return state.map((note) => {
        if(note.id === action.id) {
          const {type, ...updatedNote} = action;
          return Object.assign({}, note, updatedNote);
        }

        return note;
      });

    case types.DELETE_NOTE:
      return state.filter((note) => note.id !== action.id);

    default:
      return state;
  }
}
