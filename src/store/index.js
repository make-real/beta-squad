import { configureStore, combineReducers } from "@reduxjs/toolkit";

import workspace from "./slice/workspace";
import space from "./slice/space";

const rootReducer = combineReducers({
  workspace,
  space,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
