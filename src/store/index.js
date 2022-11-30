import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from "./slice/userInfo";
import message from "./slice/message";
import board from "./slice/board";
import cardAsList from "./slice/cardAsList";
import privateChat from "./slice/privateChat";

const rootReducer = combineReducers({
  workspace,
  space,
  userInfo,
  message,
  board,
  cardAsList,
  privateChat,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
