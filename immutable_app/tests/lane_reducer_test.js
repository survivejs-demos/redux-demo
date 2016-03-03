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
      name: 'demo lane',
      notes: []
    };

    assert.deepEqual(reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    }).toJS(), [lane]);
  });

  it('updates lanes', () => {
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

  it('deletes lanes', () => {
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
});
