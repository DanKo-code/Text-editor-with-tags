import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INoteModalState {
  visibility: boolean;
}

const initialState: INoteModalState = {
  visibility: false,
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
  },
});

export const { visibilityMode } = NoteModalSlice.actions;

export default NoteModalSlice.reducer;
