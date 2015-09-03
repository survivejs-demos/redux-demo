import * as types from '../constants/NoteActionTypes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      return [];

    case types.UPDATE_NOTE:
      return [];

    case types.DELETE_NOTE:
      return [];

    default:
      return state;
  }
}