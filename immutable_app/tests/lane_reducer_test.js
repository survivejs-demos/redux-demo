import assert from 'assert';
import * as types from 'app/actions/lanes';
import reducer from 'app/reducers/lanes';

describe('LaneReducer', () => {
  it('should return the initial state', () => {
    assert.equal(reducer(undefined, {}).count(), 0);
  });

  it('creates lanes', () => {
    const lane = {
      id: 'foobar',
      notes: []
    };

    assert.deepEqual(reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    }).toJS(), [lane]);
  });

  it('updates lanes', () => {
/*
    const task = 'test';
    const updatedTask = 'test 2';

    NoteActions.create({task});

    const note = NoteStore.getState().notes[0];

    NoteActions.update({...note, task: updatedTask});

    const state = NoteStore.getState();

    assert.equal(state.notes.length, 1);
    assert.equal(state.notes[0].task, updatedTask);
*/
  });

  it('deletes lanes', () => {
/*
    NoteActions.create({task: 'test'});

    const note = NoteStore.getState().notes[0];

    NoteActions.delete(note.id);

    const state = NoteStore.getState();

    assert.equal(state.notes.length, 0);
*/
  });
});
