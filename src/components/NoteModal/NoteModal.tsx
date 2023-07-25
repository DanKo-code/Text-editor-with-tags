import React, { useEffect, useState } from "react";
import NoteModalStyles from "./NoteModal.module.css";
import tags from "../TagsList/TagsInfo";
import Tag from "../TagsList/Tag/Tag";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  visibilityMode,
  fromNewFromExistingMode,
  changeSelectedNote,
} from "../../state/storeSlice/NoteModalSlice";
import {
  addNewNote,
  updateExistingNote,
  changeSelectedState,
} from "../../state/storeSlice/NotesListSlice";
import { INote } from "../NotesList/NotesInfo";
import { json } from "stream/consumers";
import { match } from "assert";
import { ITag } from "../TagsList/TagsInfo";
import {
  changeTags,
  checkForRemove,
} from "../../state/storeSlice/TagsListSlice";

import TextField from "@material-ui/core/TextField";

import { HighlightWithinTextarea } from "react-highlight-within-textarea";

const NoteModal = () => {
  let selectedNote = useSelector(
    (state: RootState) => state.NoteModal.selectedNote
  );

  const allNotes = useSelector((state: RootState) => state.NoteList.notes);

  const fromNew = useSelector((state: RootState) => state.NoteModal.fromNew);
  const fromExisting = useSelector(
    (state: RootState) => state.NoteModal.fromExisting
  );

  useEffect(() => {
    setTitle(selectedNote.title);
    setBody(selectedNote.body);
    setTags(selectedNote.tags);
  }, [selectedNote]);

  useEffect(() => {
    setNotes(allNotes);
    dispatch(checkForRemove(allNotes));
  }, [allNotes]);

  const [title, setTitle] = useState<string>(selectedNote?.title);
  const [body, setBody] = useState<string>(selectedNote?.body);
  const [tags, setTags] = useState<ITag[] | undefined>(selectedNote?.tags);
  const [notes, setNotes] = useState<INote[]>(allNotes);
  const [prevTag, setPrevTag] = useState<ITag>({
    id: 0,
    title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  });

  const findTags = (value: string): ITag[] | undefined => {
    const regex = /#[^ .,!?;:]+/g;
    const matches = value.match(regex);
    let hashtagsArray: string[];
    if (matches != null) {
      hashtagsArray = Array.from(
        new Set(matches.map((match) => match.slice(1).toLowerCase()))
      );

      const TypedhashtagsArray: ITag[] = hashtagsArray.map((tag) => {
        return { id: Math.random(), title: tag };
      });

      return TypedhashtagsArray;
    } else return undefined;
  };

  const handleState = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
      const res = findTags(value);
      setTags(res);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handlevisibilityMode = async () => {
    await dispatch(visibilityMode(false));
    await dispatch(
      fromNewFromExistingMode({ fromNew: false, fromExisting: false })
    );
    await dispatch(
      changeSelectedNote({
        id: 0,
        title: "",
        body: "",
        createTime: "",
        selectedState: false,
      })
    );
  };

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const handleSave = async () => {
    //Global tags handle
    if (tags !== undefined) dispatch(changeTags(tags));

    //MUST HANDLE TAGS HEARE!!!!
    //for Create
    if (fromNew === true && fromExisting === false) {
      const newNote: INote = {
        id: Math.random(),
        title: title,
        body: body,
        createTime: new Date().toLocaleString("en-US", options),
        selectedState: false,
        tags: tags,
      };

      await dispatch(addNewNote(newNote));

      await handlevisibilityMode();
    }
    //for update
    else if (fromNew === false && fromExisting === true) {
      let updateSelectedNote: INote = {
        id: Math.random(),
        title: title,
        body: body,
        createTime: new Date().toLocaleString("en-US", options),
        selectedState: selectedNote.selectedState,
        tags: tags,
      };

      await dispatch(
        updateExistingNote({
          previousNote: selectedNote,
          newNote: updateSelectedNote,
        })
      );

      await dispatch(changeSelectedNote(updateSelectedNote));
      //selectedNote = updateSelectedNote;
    }
  };

  //

  function highlightMatchingWords(inputWord: string, text: string): string {
    const pattern = new RegExp(`\\b${inputWord}\\b`, "gi");
    return text.replace(pattern, (match) => `$${match}$`);
  }

  function UnHighlightMatchingWords(inputWord: string, text: string): string {
    const pattern = new RegExp(`\\$(${inputWord})\\$`, "gi");
    return text.replace(pattern, `${inputWord}`);
  }

  const handleTagClick = (tag: ITag) => {
    if (prevTag?.title === tag.title) {
      setBody((prevBody) => UnHighlightMatchingWords(tag.title, prevBody));

      setPrevTag({ id: 0, title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" });
    } else {
      setBody((prevBody) => UnHighlightMatchingWords(prevTag?.title, prevBody));
      setPrevTag(tag);

      setBody((prevBody) => highlightMatchingWords(tag.title, prevBody));
    }
  };

  return (
    <div className={NoteModalStyles.wrapper}>
      <form>
        <div className={NoteModalStyles.headerPanel}>
          {/* <TextField
            name="title"
            className={NoteModalStyles.noteTitle}
            placeholder="Enter title"
            value={title}
            onChange={handleState}
            onFocus={handleFocus}
          /> */}

          <input
            name="title"
            className={NoteModalStyles.noteTitle}
            placeholder="Enter title"
            value={title}
            onChange={handleState}
          />
          {/* TODO Problems!!! */}
          <div onClick={handleSave} className={NoteModalStyles.save}></div>
          <div
            onClick={handlevisibilityMode}
            className={NoteModalStyles.close}
          ></div>
        </div>
        <textarea
          name="body"
          className={NoteModalStyles.noteBody}
          placeholder="Enter body"
          value={body}
          onChange={handleState}
        />
        {/* <div>
          <HighlightWithinTextarea
            value={body}
            highlight="nikita"
            //onChange={handleState}
          />
        </div> */}
      </form>

      <div className={NoteModalStyles.tagsWrapper}>
        <div>Tags:</div>
        <div className={NoteModalStyles.tagsListWrapper}>
          {tags?.map((item) => {
            return (
              <div
                onClick={() => handleTagClick(item)}
                // onClick={() => {
                //   handleTagSelection(item);
                // }}
              >
                <Tag key={item.id} tag={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
