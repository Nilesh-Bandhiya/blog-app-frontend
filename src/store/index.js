import { configureStore, combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./blogs-slice"
import usersReducer from "./users-slice"

const rootReducer = combineReducers({
  blog: blogReducer,
  users:usersReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
