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
      return state.map((note) => {
        return note.id === action.id ? Object.assign({}, note, {
          task: action.task
        }) : note;
      });

    case types.DELETE_NOTE:
      return state.filter((note) => note.id !== action.id);

    default:
      return state;
  }
}