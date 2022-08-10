import { configureStore, combineReducers } from "@reduxjs/toolkit";

import workspace from "./slice/workspace";

const rootReducer = combineReducers({
  workspace,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
