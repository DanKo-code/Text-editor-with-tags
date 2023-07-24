import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";
import { ITag } from "../../components/TagsList/TagsInfo";
import { getAllNotesFromIndexedDB } from "./InitNotes";

//DB//////////////////////////////////////////////////////////////////////
const indexedDB = window.indexedDB;

const request = indexedDB.open("NotesDB", 1);

request.onerror = function (event) {
  alert("An error occurred with IndexDB " + event);
};

request.onupgradeneeded = function () {
  alert("onupgradeneeded");
  const db = request.result;
  db.createObjectStore("notes", { keyPath: "id" });
};

let db: IDBDatabase;

request.onsuccess = function () {
  db = request.result;
};

//DB//////////////////////////////////////////////////////////////////////

interface INotesListState {
  notes: INote[];
  filteredNotes: INote[];
  filterTitle: string;
}

const initialState: INotesListState = {
  notes: await getAllNotesFromIndexedDB(),
  filteredNotes: await getAllNotesFromIndexedDB(),
  filterTitle: "",
};

const NotesListSlice = createSlice({
  name: "NoteModalSlice",
  initialState,
  reducers: {
    //DB OK!!!
    addNewNote: (state: INotesListState, action: PayloadAction<INote>) => {
      state.notes.unshift(action.payload);

      //sad
      state.filteredNotes = state.notes;

      if (!db) {
        return;
      }

      try {
        const tx = db.transaction("notes", "readwrite");
        const notesDbStore = tx.objectStore("notes");

        notesDbStore.add(action.payload);
      } catch (error) {
        alert("Error adding new note to indexedDB: " + error);
      }
    },

    //DB
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

      if (!db) {
        alert("Error: indexedDB not available");
        return;
      }

      try {
        const tx = db.transaction("notes", "readwrite");
        const notesDbStore = tx.objectStore("notes");

        notesDbStore.delete(action.payload.previousNote.id);
        notesDbStore.add(action.payload.newNote);
      } catch (error) {
        alert("Error adding new note to indexedDB: " + error);
      }
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

    //DB
    removeSelected: (state: INotesListState) => {
      try {
        const tx = db.transaction("notes", "readwrite");
        const notesDbStore = tx.objectStore("notes");

        const idsToDelete = state.notes
          .filter((note) => note.selectedState)
          .map((note) => note.id);

        idsToDelete.forEach((item) => notesDbStore.delete(item));
      } catch (error) {
        alert("Error adding new note to indexedDB: " + error);
      }

      state.notes = state.notes.filter((item) => !item.selectedState);

      if (!db) {
        alert("Error: indexedDB not available");
        return;
      }

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
