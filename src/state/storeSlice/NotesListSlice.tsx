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

    updateExistingNote: (
      state: INotesListState,
      action: PayloadAction<{ previousNote: INote; newNote: INote }>
    ) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.previousNote.id
          ? action.payload.newNote
          : note
      );
    },

    changeSelectedState: (
      state: INotesListState,
      action: PayloadAction<INote>
    ) => {
      let foundNote: INote | undefined = state.notes.find(
        (item) => item.id === action.payload.id
      );

      if (foundNote !== undefined) {
        foundNote.selectedState = !foundNote.selectedState;
      } else {
        alert("NotesListSlice: Object not found");
      }
    },

    deselectAll: (state: INotesListState) => {
      state.notes.forEach((note) => {
        note.selectedState = false;
      });
    },

    removeSelected: (state: INotesListState) => {
      state.notes = state.notes.filter((item) => !item.selectedState);
    },
  },
});

export const {
  addNewNote,
  changeSelectedState,
  deselectAll,
  removeSelected,
  updateExistingNote,
} = NotesListSlice.actions;

export default NotesListSlice.reducer;
