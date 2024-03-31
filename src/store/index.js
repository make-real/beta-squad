import { configureStore, combineReducers } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from "./slice/userInfo";
import message from "./slice/message";
import board from "./slice/board";
import cardAsList from "./slice/cardAsList";
import privateChat from "./slice/privateChat";
import global from "./slice/global";
import screen from "./slice/screen";
import TagId from "./slice/TagId";
import cardsLists from "./slice/allboard";
import subscription from "./slice/subscription";
import { AiMessageSlice } from "./slice/ai";

const rootReducer = combineReducers({
  workspace,
  space,
  userInfo,
  message,
  board,
  cardAsList,
  privateChat,
  screen,
  global,
  TagId,
  cardsLists,
  subscription,
  AiMessage: AiMessageSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
