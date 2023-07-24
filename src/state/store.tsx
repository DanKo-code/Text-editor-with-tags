import { configureStore } from "@reduxjs/toolkit";
import NoteModalReducer from "./storeSlice/NoteModalSlice";
import NoteListReducer from "./storeSlice/NotesListSlice";
import ControlPanelReducer from "./storeSlice/ControlPanelSlice";
import TagsListReducer from "./storeSlice/TagsListSlice";

const store = configureStore({
  reducer: {
    NoteModal: NoteModalReducer,
    NoteList: NoteListReducer,
    ControlPanel: ControlPanelReducer,
    TagsList: TagsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
