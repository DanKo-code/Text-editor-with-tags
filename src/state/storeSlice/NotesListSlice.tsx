import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";
import { ITag } from "../../components/TagsList/TagsInfo";

interface INotesListState {
  notes: INote[];
  filteredNotes: INote[];
  filterTitle: string;
}

const initialState: INotesListState = {
  notes: [],
  filteredNotes: [],
  filterTitle: "",
};

const NotesListSlice = createSlice({
  name: "NoteModalSlice",
  initialState,
  reducers: {
    addNewNote: (state: INotesListState, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);

      //sad
      state.filteredNotes = state.notes;
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

      //sad
      state.filteredNotes = state.notes;
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

      //sad
      state.filteredNotes = state.notes;
    },

    deselectAll: (state: INotesListState) => {
      state.notes.forEach((note) => {
        note.selectedState = false;
      });

      //sad
      state.filteredNotes = state.notes;
    },

    removeSelected: (state: INotesListState) => {
      state.notes = state.notes.filter((item) => !item.selectedState);

      //sad
      state.filteredNotes = state.notes;
    },

    filterNotes: (state: INotesListState, action: PayloadAction<ITag>) => {
      if (state.filterTitle === action.payload.title) {
        state.filteredNotes = state.notes;
        state.filterTitle = "";
        return;
      }
      state.filterTitle = action.payload.title;

      state.filteredNotes = state.notes.filter((note) =>
        note.tags?.some((tag) => tag.title === action.payload.title)
      );
    },
  },
});

export const {
  addNewNote,
  changeSelectedState,
  deselectAll,
  removeSelected,
  updateExistingNote,
  filterNotes,
} = NotesListSlice.actions;

export default NotesListSlice.reducer;
