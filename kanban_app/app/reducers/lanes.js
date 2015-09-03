import {
  CREATE_LANE, UPDATE_LANE, DELETE_LANE,
  ATTACH_TO_LANE, DETACH_FROM_LANE,
  MOVE_FROM_LANE_TO_LANE
} from '../constants/LaneActionTypes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
      return [];

    case UPDATE_LANE:
      return [];

    case DELETE_LANE:
      return [];

    case ATTACH_TO_LANE:
      return [];

    case DETACH_FROM_LANE:
      return [];

    case MOVE_FROM_LANE_TO_LANE:
      return [];

    default:
      return state;
  }
}