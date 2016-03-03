import {List} from 'immutable';
import * as types from '../actions/notes';

const initialState = List();

export default function notes(state = initialState, action) {
  let noteId;

  switch (action.type) {
    case types.CREATE_NOTE:
      return state.push(action.note);

    case types.UPDATE_NOTE:
      noteId = state.findIndex(note => note.id === action.id);

      if(noteId < 0) {
        return state;
      }

      return state.update(
        noteId,
        note => Object.assign({}, note, action)
      );

    case types.DELETE_NOTE:
      noteId = state.findIndex(note => note.id === action.id);

      if(noteId < 0) {
        return state;
      }

      return state.delete(noteId);

    default:
      return state;
  }
}
