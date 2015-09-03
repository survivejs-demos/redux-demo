import uuid from 'node-uuid';
import * as types from '../constants/NoteActionTypes';

const initialState = [];

export default function notes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      const note = action.note;

      note.id = uuid.v4();

      return [...state, note];

    case types.UPDATE_NOTE:
      console.log('update note', action);

      return state;

    case types.DELETE_NOTE:
      console.log('delete note');

      return state;

    default:
      return state;
  }
}