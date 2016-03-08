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

      const sourceLane = state.findEntry(lane => lane.get('notes').indexOf(sourceId) >= 0);
      const targetLane = state.findEntry(lane => lane.get('notes').indexOf(targetId) >= 0);

      const sourceNoteIndex = sourceLane[1].get('notes').indexOf(sourceId);
      const targetNoteIndex = targetLane[1].get('notes').indexOf(targetId);

      // TODO: these portions can likely be simplified by using immutable.js API
      // in a smarter way
      if(sourceLane === targetLane) {
        return state.map((lane) => {
          return lane.get('id') === sourceLane[1].get('id') ? Map(Object.assign({}, lane, {
            notes: List(update(sourceLane[1].get('notes').toJS(), {
              $splice: [
                [sourceNoteIndex, 1],
                [targetNoteIndex, 0, sourceId]
              ]
            }))
          })) : lane;
        });
      }
      else {
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
      }

      return state;

    default:
      return state;
  }
}
