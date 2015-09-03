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
      // XXX: how to get the note id here in a nice way?
      console.log('attach to lane', action);

      return state;

    case types.DETACH_FROM_LANE:
      console.log('detach from lane');

      return state;

    case types.MOVE_FROM_LANE_TO_LANE:
      console.log('move from lane to lane');

      return state;

    default:
      return state;
  }
}