import * as types from '../constants/LaneActionTypes';

export createLane(lane) => {
  return {
    type: types.CREATE_LANE,
    lane
  };
}

export updateLane(id, name) => {
  return {
    type: types.UPDATE_LANE,
    id,
    name
  };
}

export deleteLane(id) => {
  return {
    type: types.DELETE_LANE,
    id
  };
}

export attachToLane(laneId, noteId) => {
  return {
    type: types.ATTACH_TO_LANE,
    laneId,
    noteId
  };
}

export detachFromLane(laneId, noteId) => {
  return {
    type: types.DETACH_FROM_LANE,
    laneId,
    noteId
  };
}

export moveFromLaneToLane(sourceId, targetId) => {
  return {
    type: types.MOVE_FROM_LANE_TO_LANE,
    sourceId,
    targetId
  };
}
