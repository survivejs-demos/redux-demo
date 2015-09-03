import * as types from '../constants/LaneActionTypes';

export function createLane(lane) {
  return {
    type: types.CREATE_LANE,
    lane
  };
};

export function updateLane(id, name) {
  return {
    type: types.UPDATE_LANE,
    id,
    name
  };
};

export function deleteLane(id) {
  return {
    type: types.DELETE_LANE,
    id
  };
};

export function attachToLane(laneId, noteId) {
  return {
    type: types.ATTACH_TO_LANE,
    laneId,
    noteId
  };
};

export function move(sourceId, targetId) {
  return {
    type: types.MOVE,
    sourceId,
    targetId
  };
};

