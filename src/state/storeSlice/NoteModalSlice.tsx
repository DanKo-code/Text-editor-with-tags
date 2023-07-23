import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";

interface INoteModalState {
  visibility: boolean;
  selectedNote: INote;

  fromNew: boolean;
  fromExisting: boolean;
}

const initialState: INoteModalState = {
  visibility: false,
  selectedNote: {
    id: 0,
    title: "",
    body: "",
    createTime: "",
    selectedState: false,
  },
  fromNew: false,
  fromExisting: false,
};

const NoteModalSlice = createSlice({
  name: "NoteModalSlice",
  initialState,
  reducers: {
    visibilityMode: (
      state: INoteModalState,
      action: PayloadAction<boolean>
    ) => {
      state.visibility = action.payload;
    },

    changeSelectedNote: (
      state: INoteModalState,
      action: PayloadAction<typeof initialState.selectedNote>
    ) => {
      state.selectedNote = action.payload;
    },

    fromNewFromExistingMode: (
      state: INoteModalState,
      action: PayloadAction<{ fromNew: boolean; fromExisting: boolean }>
    ) => {
      state.fromNew = action.payload.fromNew;
      state.fromExisting = action.payload.fromExisting;
    },
  },
});

export const { visibilityMode, changeSelectedNote, fromNewFromExistingMode } =
  NoteModalSlice.actions;

export default NoteModalSlice.reducer;
