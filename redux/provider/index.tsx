import { combineReducers } from "redux";
import MainReducer from "../reducers/MainReducer";
import SecondaryReducer from "../reducers/SecondaryReducer";

const rootReducer = combineReducers({
  main: MainReducer,
  secondary: SecondaryReducer,
});

export default rootReducer;
