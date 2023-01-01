import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import workspace from "./slice/workspace";
import space from "./slice/space";
import userInfo from "./slice/userInfo";
import message from "./slice/message";
import board from "./slice/board";
import cardAsList from "./slice/cardAsList";
import privateChat from "./slice/privateChat";
import socket from "./slice/socket";
import screen from "./slice/screen";

const rootReducer = combineReducers({
    workspace,
    space,
    userInfo,
    message,
    board,
    cardAsList,
    privateChat,
    screen,
    socket,
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
