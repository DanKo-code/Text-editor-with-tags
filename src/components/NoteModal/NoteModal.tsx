import React, { useEffect, useState } from "react";
import NoteModalStyles from "./NoteModal.module.css";
import tags from "../TagsList/TagsInfo";
import Tag from "../TagsList/Tag/Tag";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { visibilityMode } from "../../state/storeSlice/NoteModalSlice";
import { addNewNote } from "../../state/storeSlice/NotesListSlice";
import { INote } from "../NotesList/NotesInfo";

const NoteModal = () => {
  const selectedNote = useSelector(
    (state: RootState) => state.NoteModal.selectedNote
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

  const handlevisibilityMode = () => {
    dispatch(visibilityMode(false));
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
  const handleSave = () => {
    const newNote: INote = {
      id: Math.random(),
      title: title,
      body: body,
      createTime: new Date().toLocaleString("en-US", options),
      selectedState: false,
    };

    dispatch(addNewNote(newNote));
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
