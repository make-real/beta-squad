import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from "./slice/userInfo";
import message from "./slice/message";
import board from "./slice/board";

const rootReducer = combineReducers({
  workspace,
  space,
  userInfo,
  message,
  board,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
