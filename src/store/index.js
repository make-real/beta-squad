import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from './slice/userInfo';
import boardListsCards from './slice/boardListsCards';
import message from './slice/message';



const rootReducer = combineReducers({
  workspace,
  space,
  userInfo,
  boardListsCards,
  message
});


const store = configureStore({
  reducer: rootReducer,
  devTools: true
});


export default store;
