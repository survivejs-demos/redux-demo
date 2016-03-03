import assert from 'assert';
import * as types from 'app/actions/notes';
import reducer from 'app/reducers/notes';

describe('NoteReducer', () => {
  it('should return the initial state', () => {
    assert.equal(reducer(undefined, {}).count(), 0);
  });

  it('creates notes', () => {
    const note = {
      id: 'foobar',
      task: 'test'
    };

    assert.deepEqual(reducer(undefined, {
      type: types.CREATE_NOTE,
      note: note
    }).toJS(), [note]);
  });

  it('updates notes', () => {
    const note = {
      id: 'foobar',
      task: 'test'
    };
    const updatedTask = 'foofoo';
    const notes = reducer(undefined, {
      type: types.CREATE_NOTE,
      note: note
    });
    const state = reducer(notes, {
      type: types.UPDATE_NOTE,
      id: note.id,
      task: updatedTask
    });

    assert.equal(state.count(), 1);
    assert.equal(state.get(0).task, updatedTask);
  });

  it('deletes notes', () => {
/*
    NoteActions.create({task: 'test'});

    const note = NoteStore.getState().notes[0];

    NoteActions.delete(note.id);

    const state = NoteStore.getState();

    assert.equal(state.notes.length, 0);
*/
  });
});
