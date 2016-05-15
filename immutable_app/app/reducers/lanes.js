import {List, Map} from 'immutable';
import update from 'react-addons-update';
import * as types from '../actions/lanes';

const initialState = List();

export default function lanes(state = initialState, action) {
  let laneIndex;

  switch (action.type) {
    case types.CREATE_LANE:
      return state.push(Map(action.lane));

    case types.UPDATE_LANE:
      laneIndex = state.findIndex(lane => lane.get('id') === action.id);

      if(laneIndex < 0) {
        return state;
      }

      const {type, ...updatedLane} = action;
      return state.mergeIn([laneIndex], updatedLane);

    case types.DELETE_LANE:
      laneIndex = state.findIndex(lane => lane.get('id') === action.id);

      if(laneIndex < 0) {
        return state;
      }

      return state.delete(laneIndex);

    case types.ATTACH_TO_LANE:
      const laneId = action.laneId;
      const noteId = action.noteId;

      return state.map(
        lane => {
          const noteIndex = lane.get('notes').indexOf(noteId);

          // Delete notes if found
          if(noteIndex >= 0) {
             return lane.deleteIn(['notes', noteIndex]);
          }

          // Attach note to the lane
          if(lane.get('id') === laneId) {
            return lane.setIn(['notes'], lane.get('notes').push(noteId));
          }

          return lane;
        }
      );

    case types.DETACH_FROM_LANE:
      return state.updateIn(
        [state.findIndex(lane => lane.id === action.laneId)],
        lane => lane.deleteIn(['notes', lane.get('notes').indexOf(action.noteId)])
      );

    case types.MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const sourceLane = state.findEntry(lane => lane.get('notes').indexOf(sourceId) >= 0);
      const targetLane = state.findEntry(lane => lane.get('notes').indexOf(targetId) >= 0);

      const sourceNoteIndex = sourceLane[1].get('notes').indexOf(sourceId);
      const targetNoteIndex = targetLane[1].get('notes').indexOf(targetId);

      return state.updateIn(
        // Get rid of the source note
        [sourceLane[0]],
        lane => lane.deleteIn(['notes', sourceNoteIndex])
      ).updateIn(
        // And move it to the target
        [targetLane[0]],
        lane => lane.updateIn(['notes'], notes => notes.insert(
          targetNoteIndex, sourceId
        ))
      );

    default:
      return state;
  }
}
