import uuid from 'node-uuid';
import * as types from '../constants/LaneActionTypes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_LANE:
      const lane = action.lane;

      lane.id = uuid.v4();
      lane.notes = lane.notes || [];

      return [lane, ...state];

    case types.UPDATE_LANE:
      console.log('update lane', action);

      return state;

    case types.DELETE_LANE:
      return state;

    case types.ATTACH_TO_LANE:
      return state;

    case types.DETACH_FROM_LANE:
      return state;

    case types.MOVE_FROM_LANE_TO_LANE:
      return state;

    default:
      return state;
  }
}