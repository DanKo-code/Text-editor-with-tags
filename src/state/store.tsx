import { configureStore } from "@reduxjs/toolkit";
import NoteModalReducer from "./storeSlice/NoteModalSlice";

const store = configureStore({
  reducer: {
    NoteModal: NoteModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
