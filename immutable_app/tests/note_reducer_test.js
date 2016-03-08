import assert from 'assert';
import * as types from 'app/actions/notes';
import reducer from 'app/reducers/notes';

describe('NoteReducer', () => {
  it('should return the initial state', () => {
    assert.equal(reducer(undefined, {}).count(), 0);
  });

  it('should create notes', () => {
    const note = {
      id: 'foobar',
      task: 'test'
    };

    assert.deepEqual(reducer(undefined, {
      type: types.CREATE_NOTE,
      note: note
    }).toJS(), [note]);
  });

  it('should update notes', () => {
    const note = {
      id: 'foobar',
      task: 'test',
      editing: true
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
    assert.equal(state.get(0).get('id'), note.id);
    assert.equal(state.get(0).get('task'), updatedTask);
    assert.equal(state.get(0).get('editing'), note.editing);
  });

  it('should not crash while updating a non-existent note', () => {
    const note = {
      id: 'foobar',
      task: 'test'
    };

    const notes = reducer(undefined, {
      type: types.CREATE_NOTE,
      note: note
    });
    const state = reducer(notes, {
      type: types.UPDATE_NOTE,
      id: note.id + note.id,
      task: 'foo'
    });

    assert.equal(state.count(), 1);
    assert.equal(state.get(0).get('id'), note.id);
    assert.equal(state.get(0).get('task'), note.task);
  });

  it('should delete notes', () => {
    const note = {
      id: 'foobar',
      task: 'test'
    };

    const notes = reducer(undefined, {
      type: types.CREATE_NOTE,
      note: note
    });
    const state = reducer(notes, {
      type: types.DELETE_NOTE,
      id: note.id
    });

    assert.equal(state.count(), 0);
  });

  it('should not crash while deleting a non-existent note', () => {
    const note = {
      id: 'foobar',
      task: 'test'
    };

    const notes = reducer(undefined, {
      type: types.CREATE_NOTE,
      note: note
    });
    const state = reducer(notes, {
      type: types.DELETE_NOTE,
      id: note.id + note.id
    });

    assert.equal(state.count(), 1);
    assert.equal(state.get(0).get('id'), note.id);
    assert.equal(state.get(0).get('task'), note.task);
  });
});
