import { combineReducers } from "redux";
import * as userReducer from "./user";
import * as productReducer from "./products";
import * as testMasterReducer from "./testMaster";
import * as templateReducer from "./templates";
import * as customerReducer from "./customer";

const rootReducer = combineReducers({
  ...userReducer,
  ...productReducer,
  ...testMasterReducer,
  ...templateReducer,
  ...customerReducer
});

export default rootReducer;

