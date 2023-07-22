import NotesListStyles from "./NotesList.module.css";
import Note from "./Note/Note";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { changeSelectedNote } from "../../state/storeSlice/NoteModalSlice";
import { INote } from "./NotesInfo";
import { visibilityMode } from "../../state/storeSlice/NoteModalSlice";
import { clickOptions } from "@testing-library/user-event/dist/click";
import React, { MouseEventHandler } from "react";

const NotesList = () => {
  const notes = useSelector((state: RootState) => state.NoteList.notes);

  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = (note: INote) => {
    debugger;
    dispatch(changeSelectedNote(note));
    dispatch(visibilityMode(true));
  };

  return (
    <div className={NotesListStyles.wrapper}>
      {notes.map((note) => {
        return (
          <div onClick={() => handleSelect(note)}>
            <Note key={note.id} note={note} />
          </div>
        );
      })}
    </div>
  );
};

export default NotesList;
