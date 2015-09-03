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
      const laneId = action.laneId;
      const noteId = action.noteId;

      return state.map((lane) => {
        const index = lane.notes.indexOf(noteId);

        if(index >= 0) {
          lane.notes = lane.notes.slice(0, index).concat(
            lane.notes.slice(index + 1)
          );
        }

        return lane;
      }).map((lane) => {
        return lane.id === laneId ? Object.assign({}, lane, {
          notes: [...lane.notes, noteId]
        }) : lane;
      });

    case types.MOVE_FROM_LANE_TO_LANE:
      console.log('move from lane to lane');

      return state;

    default:
      return state;
  }
}