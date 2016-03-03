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

    let lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    lanes = reducer(lanes, {
      type: types.UPDATE_LANE,
      id: lane.id,
      name: updatedName
    });

    assert.equal(lanes.count(), 1);
    assert.equal(lanes.get(0).id, lane.id);
    assert.equal(lanes.get(0).name, updatedName);
  });

  it('should delete lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };

    let lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    lanes = reducer(lanes, {
      type: types.DELETE_LANE,
      id: lane.id
    });

    assert.equal(lanes.count(), 0);
  });

  it('should attach notes to lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };
    const noteId = '123456';

    let lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    lanes = reducer(lanes, {
      type: types.ATTACH_TO_LANE,
      laneId: lane.id,
      noteId: noteId
    });

    assert.equal(lanes.get(0).notes[0], noteId);
  });

  it('should allow only one unique note per lanes when attaching', () => {
    const lane1 = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };
    const lane2 = {
      id: 'foobar2',
      name: 'demo lane 2',
      notes: []
    };
    const noteId = '123456';

    let lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane1
    });
    lanes = reducer(lanes, {
      type: types.CREATE_LANE,
      lane: lane2
    });
    lanes = reducer(lanes, {
      type: types.ATTACH_TO_LANE,
      laneId: lane1.id,
      noteId: noteId
    });
    lanes = reducer(lanes, {
      type: types.ATTACH_TO_LANE,
      laneId: lane2.id,
      noteId: noteId
    });

    assert.equal(lanes.get(0).notes.length, 0);
    assert.equal(lanes.get(1).notes[0], noteId);
  });

  it('should detach notes to lanes', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };
    const noteId = '123456';

    let lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    lanes = reducer(lanes, {
      type: types.DETACH_FROM_LANE,
      laneId: lane.id,
      noteId: noteId
    });

    assert.equal(lanes.get(0).notes.length, 0);
  });

  it('should allow moving notes within a lane', () => {
    const lane = {
      id: 'foobar',
      name: 'demo lane',
      notes: []
    };
    const sourceNoteId = '123456';
    const targetNoteId = '654321';

    let lanes = reducer(undefined, {
      type: types.CREATE_LANE,
      lane: lane
    });
    lanes = reducer(lanes, {
      type: types.ATTACH_TO_LANE,
      laneId: lane.id,
      noteId: sourceNoteId
    });
    lanes = reducer(lanes, {
      type: types.ATTACH_TO_LANE,
      laneId: lane.id,
      noteId: targetNoteId
    });
    lanes = reducer(lanes, {
      type: types.MOVE,
      sourceId: sourceNoteId,
      targetId: targetNoteId,
    });

    assert.equal(lanes.get(0).notes.length, 2);
    assert.equal(lanes.get(0).notes[0], targetNoteId);
    assert.equal(lanes.get(0).notes[1], sourceNoteId);
  });

  it('should allow moving notes from a lane to lane', () => {

  });
});
