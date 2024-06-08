import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userRedux: userReducer,
});

export default rootReducer;
