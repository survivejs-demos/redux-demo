import {List} from 'immutable';
import * as types from '../actions/notes';

const initialState = List();

export default function notes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NOTE:
      return state.push(action.note);

    case types.UPDATE_NOTE:
      return state.update(
        state.findIndex(o => o.id == action.id),
        o => action
      );

    case types.DELETE_NOTE:
      return state.delete(state.find({id: action.id}));

    default:
      return state;
  }
}
