import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";
import { ITag } from "../../components/TagsList/TagsInfo";

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
let notesDbStore: IDBObjectStore;
let getAllRequest: IDBRequest<INote[]>;
let initialNotes: INote[];

request.onsuccess = function () {
  db = request.result;
  // Assign the object store to the variable for later use
  notesDbStore = db.transaction("notes", "readwrite").objectStore("notes");

  getAllRequest = notesDbStore.getAll();

  getAllRequest.onsuccess = function (event) {
    initialNotes = getAllRequest.result;
  };
};

//DB//////////////////////////////////////////////////////////////////////

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
    //DB OK!!!
    addNewNote: (state: INotesListState, action: PayloadAction<INote>) => {
      state.notes.unshift(action.payload);

      //sad
      state.filteredNotes = state.notes;

      // Check if the indexedDB is available
      if (!db) {
        alert("Error: indexedDB not available");
        return;
      }

      try {
        // Create a new transaction for adding the new note
        const tx = db.transaction("notes", "readwrite");
        const notesDbStore = tx.objectStore("notes");

        // Perform the transaction to add the new note
        notesDbStore.add(action.payload);

        // Note added successfully to indexedDB
        alert("New note added to indexedDB");
      } catch (error) {
        // Error occurred while adding the note to indexedDB
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
