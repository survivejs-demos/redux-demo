import uuid from 'node-uuid';
import * as types from '../constants/LaneActionTypes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_LANE:
      const lane = action.lane;

      lane.id = uuid.v4();
      lane.notes = lane.notes || [];

      return [...state, lane];

    case types.UPDATE_LANE:
      return state.map((lane) => {
        return lane.id === action.id ? Object.assign({}, lane, {
          name: action.name
        }) : lane;
      });

    case types.DELETE_LANE:
      return state.filter((lane) => lane.id !== action.id);

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