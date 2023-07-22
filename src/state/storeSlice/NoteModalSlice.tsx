import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";

interface INoteModalState {
  visibility: boolean;
  selectedNote: INote;
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
      alert(JSON.stringify(action.payload));
      state.selectedNote = action.payload;
    },
  },
});

export const { visibilityMode, changeSelectedNote } = NoteModalSlice.actions;

export default NoteModalSlice.reducer;
