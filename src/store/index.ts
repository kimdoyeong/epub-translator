import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import FileSlice from "./FileSlice";

const reducer = combineReducers({
  [FileSlice.name]: FileSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;
const store = configureStore({
  reducer,
});

export default store;
