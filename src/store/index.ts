import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import FileSlice from "./FileSlice";
import storeMiddleware from "./storeMiddleware";
import Preload from "../constants/Preload";

const reducer = combineReducers({
  [FileSlice.name]: FileSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;
const store = configureStore({
  reducer,
  middleware: [storeMiddleware],
  preloadedState: Preload.Store.get() || undefined,
});

export default store;
