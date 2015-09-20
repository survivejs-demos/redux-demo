import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import lanes from './lanes';
import notes from './notes';

export default combineReducers({
  lanes,
  notes,
  routerStateReducer
});
