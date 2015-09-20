import {combineReducers} from 'redux';
import lanes from './lanes';
import notes from './notes';

export default combineReducers({
  lanes,
  notes
});
