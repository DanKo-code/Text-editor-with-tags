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
} from "../../state/storeSlice/NotesListSlice";
import { INote } from "../NotesList/NotesInfo";
import { json } from "stream/consumers";
import { match } from "assert";
import { ITag } from "../TagsList/TagsInfo";
import {
  changeTags,
  checkForRemove,
} from "../../state/storeSlice/TagsListSlice";

const NoteModal = () => {
  const selectedNote = useSelector(
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
    setNotes(allNotes);

    dispatch(checkForRemove(allNotes));

    // alert("allNotes: " + JSON.stringify(allNotes));
    // ///alert("allNotes: " + JSON.stringify(allNotes[0].tags));
    // allNotes.forEach((note) => {
    //   alert("TagsList-action.payload.Note: " + JSON.stringify(note?.tags));
    // });
  }, [selectedNote, allNotes]);

  const [title, setTitle] = useState<string>(selectedNote?.title);
  const [body, setBody] = useState<string>(selectedNote?.body);
  const [tags, setTags] = useState<ITag[] | undefined>(selectedNote?.tags);
  const [notes, setNotes] = useState<INote[]>(allNotes);

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

      //TODO in the feature mabe add ability to update after create
      // await dispatch(
      //   fromNewFromExistingMode({ fromNew: false, fromExisting: true })
      // );

      //temp solution
      await handlevisibilityMode();
    }
    //for update
    else if (fromNew === false && fromExisting === true) {
      await dispatch(
        updateExistingNote({
          previousNote: selectedNote,
          newNote: {
            id: Math.random(),
            title: title,
            body: body,
            createTime: new Date().toLocaleString("en-US", options),
            selectedState: selectedNote.selectedState,
            tags: tags,
          },
        })
      );
    }
  };

  // const handleTagSelection = (tag: ITag) => {
  //   const lowercaseBody = body.toLowerCase();
  //   const regex = new RegExp(`${tag}`);

  //   const highlightedString = lowercaseBody.replace(
  //     regex,
  //     (match) => `<mark>${match}</mark>`
  //   );

  //   setBody(highlightedString);
  // };

  // function surroundWordWithSymbols(text, word, symbol) {
  //   const regex = new RegExp(`\\b(${word})\\b`, "gi");
  //   return text.replace(regex, (match) => `${symbol}${match}${symbol}`);
  // }

  return (
    <div className={NoteModalStyles.wrapper}>
      <form>
        <div className={NoteModalStyles.headerPanel}>
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
      </form>

      <div className={NoteModalStyles.tagsWrapper}>
        <div>Tags:</div>
        <div className={NoteModalStyles.tagsListWrapper}>
          {tags?.map((item) => {
            return (
              <div
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
