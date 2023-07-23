import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INoteModalState {
  contolButtonsVisibility: boolean;
}

const initialState: INoteModalState = {
  contolButtonsVisibility: false,
};

const ControlPanelSlice = createSlice({
  name: "ControlPanelSlice",
  initialState,
  reducers: {
    contolButtonsVisibilityMode: (
      state: INoteModalState,
      action: PayloadAction<boolean>
    ) => {
      state.contolButtonsVisibility = action.payload;
    },
  },
});

export const { contolButtonsVisibilityMode } = ControlPanelSlice.actions;

export default ControlPanelSlice.reducer;
