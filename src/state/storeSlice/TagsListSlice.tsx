import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITag } from "../../components/TagsList/TagsInfo";
import { INote } from "../../components/NotesList/NotesInfo";
import { getAllTagsFromIndexedDB } from "./InitTags";

//DB//////////////////////////////////////////////////////////////////////
const indexedDB = window.indexedDB;

const request = indexedDB.open("TagsDB", 1);

request.onerror = function (event) {
  alert("An error occurred with IndexDB " + event);
};

request.onupgradeneeded = function () {
  const db = request.result;
  db.createObjectStore("tags", { keyPath: "id" });
};

let db: IDBDatabase;

request.onsuccess = function () {
  db = request.result;
};

//DB//////////////////////////////////////////////////////////////////////

interface ITagsListState {
  tags: ITag[];
}

const initialState: ITagsListState = {
  tags: await getAllTagsFromIndexedDB(),
};

const TagsListSlice = createSlice({
  name: "TagsList",
  initialState,
  reducers: {
    changeTags: (state: ITagsListState, action: PayloadAction<ITag[]>) => {
      action.payload.forEach((newTag) => {
        const existingTagIndex = state.tags.findIndex(
          (tag) => tag.title === newTag.title
        );
        if (existingTagIndex === -1) {
          state.tags.push(newTag);

          if (!db) {
            return;
          }

          try {
            const tx = db.transaction("tags", "readwrite");
            const notesDbStore = tx.objectStore("tags");

            notesDbStore.add(newTag);
          } catch (error) {
            alert("Error adding new note to indexedDB: " + error);
          }
        }
      });
    },

    checkForRemove: (state: ITagsListState, action: PayloadAction<INote[]>) => {
      //   alert("state.tags" + JSON.stringify(state.tags));
      //   alert("action.payload" + JSON.stringify(action.payload));

      const updatedTags = state.tags.filter((exTag) => {
        return action.payload.some((note) =>
          note.tags?.some((tag) => tag.title === exTag.title)
        );
      });

      //DB
      state.tags.forEach((tag) => {
        if (!updatedTags.includes(tag)) {
          if (!db) {
            return;
          }

          try {
            const tx = db.transaction("tags", "readwrite");
            const notesDbStore = tx.objectStore("tags");

            notesDbStore.delete(tag.id);
          } catch (error) {
            alert("Error adding new note to indexedDB: " + error);
          }
        }
      });
      //alert("updatedTags:" + JSON.stringify(updatedTags));
      state.tags = updatedTags;
    },
  },
});

export const { changeTags, checkForRemove } = TagsListSlice.actions;

export default TagsListSlice.reducer;
