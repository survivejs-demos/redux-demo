import * as types from '../constants/NoteActionTypes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      console.log('create note');

      return state;

    case types.UPDATE_NOTE:
      console.log('update note');

      return state;

    case types.DELETE_NOTE:
      console.log('delete note');

      return state;

    default:
      return state;
  }
}