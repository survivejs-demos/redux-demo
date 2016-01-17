import assign from 'object-assign';

import * as types from '../actions/notes';

const initialState = [];

export default function notes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      return [...state, action.note];

    case types.UPDATE_NOTE:
      return state.map((note) => {
        if(note.id === action.id) {
          return assign({}, note, action);
        }

        return note;
      });

    case types.DELETE_NOTE:
      console.log('state', state);
      return state.filter((note) => note.id !== action.id);

    default:
      return state;
  }
}