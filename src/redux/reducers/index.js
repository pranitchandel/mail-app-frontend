import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

export const reducers = combineReducers({
  login: loginReducer,
});
