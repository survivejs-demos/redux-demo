import uuid from 'node-uuid';

export const CREATE_NOTE = 'CREATE_NOTE';
export function createNote(note) {
  return {
    type: CREATE_NOTE,
    note: {
      id: uuid.v4(),
      ...note
    }
  };
};

export const UPDATE_NOTE = 'UPDATE_NOTE';
export function updateNote(id, task) {
  return {
    type: UPDATE_NOTE,
    id,
    task
  };
};

export const DELETE_NOTE = 'DELETE_NOTE';
export function deleteNote(id) {
  return {
    type: DELETE_NOTE,
    id
  };
};
