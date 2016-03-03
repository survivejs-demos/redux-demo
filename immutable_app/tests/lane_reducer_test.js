import assert from 'assert';
import * as types from 'app/actions/lanes';
import reducer from 'app/reducers/lanes';

describe('LaneReducer', () => {
  it('should return the initial state', () => {
    assert.equal(reducer(undefined, {}).count(), 0);
  });

  it('should create lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };

    assert.deepEqual(reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    }).toJS(), [lane]);
  });

  it('should update lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };
    const updatedName = 'foofoo';

    const lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    const state = reducer(lanes, {
      type: types.UPDATE_LANE,
      id: lane.id,
      name: updatedName
    });

    assert.equal(state.count(), 1);
    assert.equal(state.get(0).name, updatedName);
  });

  it('should delete lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };

    const lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    const state = reducer(lanes, {
      type: types.DELETE_LANE,
      id: lane.id
    });

    assert.equal(state.count(), 0);
  });

  it('should attach notes to lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };

    const lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    const noteId = '123456';
    const state = reducer(lanes, {
      type: types.ATTACH_TO_LANE,
      laneId: lane.id,
      noteId: noteId
    });

    assert.equal(state.get(0).notes[0], noteId);
  });

  it('should allow only one unique note per lanes when attaching', () => {

  });

  it('should detach notes to lanes', () => {

  });

  it('should allow moving notes within a lane', () => {

  });

  it('should allow moving notes from a lane to lane', () => {

  });
});
