import NotesListStyles from "./NotesList.module.css";
import Note from "./Note/Note";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { changeSelectedNote } from "../../state/storeSlice/NoteModalSlice";
import { INote } from "./NotesInfo";
import {
  visibilityMode,
  fromNewFromExistingMode,
} from "../../state/storeSlice/NoteModalSlice";
import { clickOptions } from "@testing-library/user-event/dist/click";
import React, { MouseEventHandler } from "react";

const NotesList = () => {
  //const notes = useSelector((state: RootState) => state.NoteList.notes);
  const filterNotes = useSelector(
    (state: RootState) => state.NoteList.filteredNotes
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = async (note: INote) => {
    await dispatch(changeSelectedNote(note));
    await dispatch(visibilityMode(true));
    dispatch(fromNewFromExistingMode({ fromNew: false, fromExisting: true }));
  };

  return (
    <div className={NotesListStyles.wrapper}>
      {filterNotes.length ? (
        filterNotes.map((note) => {
          return (
            <div onClick={() => handleSelect(note)}>
              <Note key={note.id} note={note} />
            </div>
          );
        })
      ) : (
        <div className={NotesListStyles.noNotes}>There are no notes yet!</div>
      )}
    </div>
  );
};

export default NotesList;
