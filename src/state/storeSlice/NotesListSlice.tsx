import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INote } from "../../components/NotesList/NotesInfo";
import { ITag } from "../../components/TagsList/TagsInfo";

interface INotesListState {
  notes: INote[];
  filteredNotes: INote[];
  filterTitle: string;
}

//DB//////////////////////////////////////////////////////////////////////
const indexedDB = window.indexedDB;

const request = indexedDB.open("NotesDB", 1);

request.onupgradeneeded = (e) => {
  alert("onupgradeneeded");
  const db = request.result;
  db.createObjectStore("notes", { keyPath: "id" });
};

let db: IDBDatabase;

request.onsuccess = function () {
  db = request.result;
};

request.onerror = function (event) {
  alert("An error occurred with IndexDB " + event);
};

//DB//////////////////////////////////////////////////////////////////////

// const tx = db.transaction("notes", "readwrite");
// const notesDbStore = tx.objectStore("notes");
// //notesDbStore.add();

const transaction = request.result.transaction("notes", "readwrite");
const notesDbStore = transaction.objectStore("notes");
const getAllRequest: IDBRequest<INote[]> = notesDbStore.getAll();

getAllRequest.onsuccess = function (event) {
  const initNotes: INote[] = getAllRequest.result;
  // Now you have the data in `initNotes`, you can use it as needed
  console.log(initNotes);

  const initialState: INotesListState = {
    notes: initNotes,
    filteredNotes: initNotes,
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

        try {
          const tx = db.transaction("notes", "readwrite");
          const notesDbStore = tx.objectStore("notes");
          notesDbStore.add(action.payload);

          alert("New note added to indexedDB");
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
};

getAllRequest.onerror = function (event) {
  // Handle the error appropriately
  console.error("Error getting notes from IndexedDB:", event);
};
