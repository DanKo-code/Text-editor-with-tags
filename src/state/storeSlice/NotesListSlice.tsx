import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";

interface INotesListState {
  notes: INote[];
}

const initialState: INotesListState = {
  notes: [
    {
      id: 1,
      title: "Granny",
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint architecto iure consectetur, at animi molestiae harum ab voluptates reiciendis consequatur sequi sed voluptas dicta maiores voluptate ex nobis necessitatibus possimus.",
      createTime: "21.07.2023",
      selectedState: false,
    },
  ],
};

const NotesListSlice = createSlice({
  name: "NoteModalSlice",
  initialState,
  reducers: {
    addNewNote: (state: INotesListState, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
    },
  },
});

export const { addNewNote } = NotesListSlice.actions;

export default NotesListSlice.reducer;
