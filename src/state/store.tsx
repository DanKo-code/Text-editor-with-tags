import { configureStore } from "@reduxjs/toolkit";
import NoteModalReducer from "./storeSlice/NoteModalSlice";
import NoteListReducer from "./storeSlice/NotesListSlice";
import ControlPanelReducer from "./storeSlice/ControlPanelSlice";

const store = configureStore({
  reducer: {
    NoteModal: NoteModalReducer,
    NoteList: NoteListReducer,
    ControlPanel: ControlPanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
