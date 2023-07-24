import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITag } from "../../components/TagsList/TagsInfo";
import { INote } from "../../components/NotesList/NotesInfo";

interface ITagsListState {
  tags: ITag[];
}

const initialState: ITagsListState = {
  tags: [],
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

      //alert("updatedTags:" + JSON.stringify(updatedTags));
      state.tags = updatedTags;
    },
  },
});

export const { changeTags, checkForRemove } = TagsListSlice.actions;

export default TagsListSlice.reducer;
