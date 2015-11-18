import uuid from 'node-uuid';

export const CREATE_LANE = 'CREATE_LANE';
export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      id: uuid.v4(),
      notes: lane.notes || [],
      ...lane
    }
  };
};

export const UPDATE_LANE = 'UPDATE_LANE';
export function updateLane(id, name) {
  return {
    type: UPDATE_LANE,
    id,
    name
  };
};

export const DELETE_LANE = 'DELETE_LANE';
export function deleteLane(id) {
  return {
    type: DELETE_LANE,
    id
  };
};

export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';
export function attachToLane(laneId, noteId) {
  return {
    type: ATTACH_TO_LANE,
    laneId,
    noteId
  };
};

export const MOVE = 'MOVE';
export function move(sourceId, targetId) {
  return {
    type: MOVE,
    sourceId,
    targetId
  };
};

