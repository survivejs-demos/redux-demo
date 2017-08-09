import { combineReducers } from "redux";
import boards from "./boards";
import lanes from "./lanes";
import notes from "./notes";

export default combineReducers({
  boards,
  lanes,
  notes
});
