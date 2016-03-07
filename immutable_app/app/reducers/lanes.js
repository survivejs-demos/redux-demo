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

      return state.mergeIn([laneIndex], action);

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
      return state.map(lane => {
        if(lane.id === action.laneId) {
          return lane.deleteIn(['notes', lane.get('notes').indexOf(action.noteId)]);
        }

        return lane;
      });

    case types.MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const sourceLane = state.find(lane => lane.get('notes').indexOf(sourceId) >= 0);
      const targetLane = state.find(lane => lane.get('notes').indexOf(targetId) >= 0);

      const sourceNoteIndex = sourceLane.get('notes').indexOf(sourceId);
      const targetNoteIndex = targetLane.get('notes').indexOf(targetId);

      // TODO: these portions can likely be simplified by using immutable.js API
      // in a smarter way
      if(sourceLane === targetLane) {
        return state.map((lane) => {
          return lane.get('id') === sourceLane.get('id') ? Map(Object.assign({}, lane, {
            notes: List(update(sourceLane.get('notes').toJS(), {
              $splice: [
                [sourceNoteIndex, 1],
                [targetNoteIndex, 0, sourceId]
              ]
            }))
          })) : lane;
        });
      }
      else {
        return state.map((lane) => {
          if(lane === sourceLane) {
            // get rid of the source note
            return Map(Object.assign({}, lane, {
              notes: lane.get('notes').count() > 1 ? List(lane.get('notes').slice(0, sourceNoteIndex).concat(
                lane.get('notes').slice(sourceNoteIndex + 1)
              )): List()
            }));
          }

          if(lane === targetLane) {
            // and move it to target
            return Map(Object.assign({}, lane, {
              notes: List(lane.get('notes').slice(0, targetNoteIndex).concat(
                [sourceId]
              ).concat(
                lane.get('notes').slice(targetNoteIndex)
              ))
            }));
          }

          return lane;
        });
      }

      return state;

    default:
      return state;
  }
}
