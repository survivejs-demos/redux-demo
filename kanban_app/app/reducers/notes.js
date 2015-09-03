import {
  CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE
} from '../constants/NoteActionTypes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      return [];

    case UPDATE_NOTE:
      return [];

    case DELETE_NOTE:
      return [];

    default:
      return state;
  }
}