import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from './slice/userInfo';
// import boardLists from './slice/boardLists';


const rootReducer = combineReducers({
  workspace,
  space,
  userInfo,
  // boardLists,
});


const store = configureStore({
  reducer: rootReducer,
});


export default store;
