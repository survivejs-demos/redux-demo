import {List} from 'immutable';
import * as types from '../actions/notes';

const initialState = List();

export default function notes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      return state.push(action.note);

    case types.UPDATE_NOTE:
      // XXX: this can crash if findIndex fails
      return state.update(
        state.findIndex(note => note.id === action.id),
        note => Object.assign({}, note, action)
      );

    case types.DELETE_NOTE:
      // XXX: this can crash if findIndex fails
      return state.delete(state.findIndex(note => note.id === action.id));

    default:
      return state;
  }
}
