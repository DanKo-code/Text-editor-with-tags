import { configureStore } from "@reduxjs/toolkit";
import NoteModalReducer from "./storeSlice/NoteModalSlice";
import NoteListReducer from "./storeSlice/NotesListSlice";

const store = configureStore({
  reducer: {
    NoteModal: NoteModalReducer,
    NoteList: NoteListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
