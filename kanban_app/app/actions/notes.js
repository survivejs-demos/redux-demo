import * as types from '../constants/NoteActionTypes';

export function createNote(note) {
  return {
    type: types.CREATE_NOTE,
    note
  };
};

export function updateNote(id, task) {
  return {
    type: types.UPDATE_NOTE,
    id,
    task
  };
};

export function deleteNote(id) {
  return {
    type: types.DELETE_NOTE,
    id
  };
};
