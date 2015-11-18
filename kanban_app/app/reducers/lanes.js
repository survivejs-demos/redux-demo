import update from 'react/lib/update';
import * as types from '../actions/lanes';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_LANE:
      return [...state, action.lane];

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

    case types.MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const lanes = state;
      const sourceLane = lanes.filter((lane) => {
        return lane.notes.indexOf(sourceId) >= 0;
      })[0];
      const targetLane = lanes.filter((lane) => {
        return lane.notes.indexOf(targetId) >= 0;
      })[0];
      const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
      const targetNoteIndex = targetLane.notes.indexOf(targetId);

      if(sourceLane === targetLane) {
        return state.map((lane) => {
          return lane.id === sourceLane.id ? Object.assign({}, lane, {
            notes: update(sourceLane.notes, {
              $splice: [
                [sourceNoteIndex, 1],
                [targetNoteIndex, 0, sourceId]
              ]
            })
          }) : lane;
        });
      }
      else {
        // get rid of the source
        sourceLane.notes.splice(sourceNoteIndex, 1);

        // and move it to target
        targetLane.notes.splice(targetNoteIndex, 0, sourceId);
      }

      return state;

    default:
      return state;
  }
}