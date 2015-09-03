import * as types from '../constants/NoteActionTypes';

export createNote(note) => {
  return {
    type: types.CREATE_NOTE,
    note
  };
}

export updateNote(id, task) => {
  return {
    type: types.UPDATE_NOTE,
    id,
    task
  };
}

export deleteNote(id) => {
  return {
    type: types.DELETE_NOTE,
    id
  };
}
