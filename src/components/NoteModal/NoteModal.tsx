import React, { useEffect, useState } from "react";
import NoteModalStyles from "./NoteModal.module.css";
import tags from "../TagsList/TagsInfo";
import Tag from "../TagsList/Tag/Tag";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  visibilityMode,
  fromNewFromExistingMode,
} from "../../state/storeSlice/NoteModalSlice";
import {
  addNewNote,
  updateExistingNote,
} from "../../state/storeSlice/NotesListSlice";
import { INote } from "../NotesList/NotesInfo";

const NoteModal = () => {
  const selectedNote = useSelector(
    (state: RootState) => state.NoteModal.selectedNote
  );

  const fromNew = useSelector((state: RootState) => state.NoteModal.fromNew);
  const fromExisting = useSelector(
    (state: RootState) => state.NoteModal.fromExisting
  );

  useEffect(() => {
    setTitle(selectedNote.title);
    setBody(selectedNote.body);
  }, [selectedNote]);

  const [title, setTitle] = useState<string>(selectedNote?.title);
  const [body, setBody] = useState<string>(selectedNote?.body);

  const handleState = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debugger;
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handlevisibilityMode = async () => {
    await dispatch(visibilityMode(false));
    await dispatch(
      fromNewFromExistingMode({ fromNew: false, fromExisting: false })
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
    //for Create
    if (fromNew === true && fromExisting === false) {
      const newNote: INote = {
        id: Math.random(),
        title: title,
        body: body,
        createTime: new Date().toLocaleString("en-US", options),
        selectedState: false,
      };

      await dispatch(addNewNote(newNote));
      await dispatch(
        fromNewFromExistingMode({ fromNew: false, fromExisting: true })
      );
    }
    //for update
    else if (fromNew === false && fromExisting === true) {
      dispatch(
        updateExistingNote({
          previousNote: selectedNote,
          newNote: {
            id: Math.random(),
            title: title,
            body: body,
            createTime: new Date().toLocaleString("en-US", options),
            selectedState: selectedNote.selectedState,
          },
        })
      );
    }
  };

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
          {tags.map((item) => {
            return <Tag key={item.id} tag={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
