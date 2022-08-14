import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from './slice/userInfo';


const rootReducer = combineReducers({
  workspace,
  space,
  userInfo,
});


const store = configureStore({
  reducer: rootReducer,
});


export default store;
