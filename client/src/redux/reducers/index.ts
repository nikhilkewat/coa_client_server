import { combineReducers } from "redux";
import * as userReducer from "./user";

const rootReducer = combineReducers({
  ...userReducer
});

export default rootReducer;

