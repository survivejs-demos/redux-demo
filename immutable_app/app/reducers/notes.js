import {List, Map} from 'immutable';
import * as types from '../actions/notes';

const initialState = List();

export default function notes(state = initialState, action) {
  let noteIndex;

  switch (action.type) {
    case types.CREATE_NOTE:
      return state.push(Map(action.note));

    case types.UPDATE_NOTE:
      noteIndex = state.findIndex(note => note.get('id') === action.id);

      if(noteIndex < 0) {
        return state;
      }

      const {type, ...updatedNote} = action;
      return state.mergeIn([noteIndex], updatedNote);

    case types.DELETE_NOTE:
      noteIndex = state.findIndex(note => note.get('id') === action.id);

      if(noteIndex < 0) {
        return state;
      }

      return state.delete(noteIndex);

    default:
      return state;
  }
}
