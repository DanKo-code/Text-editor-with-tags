import NoteStyles from "./Note.module.css";
import { INote } from "../NotesInfo";
import React from "react";
import markImg from "../../../images/Vec3.svg";
import { changeSelectedState } from "../../../state/storeSlice/NotesListSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";

interface NoteProps {
  note: INote;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleMarkSelection = (
    note: INote,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    dispatch(changeSelectedState(note));
    event.stopPropagation();
  };

  return (
    <div className={NoteStyles.note}>
      <div>
        <div>{note.title}</div>
        <div>{note.createTime}</div>
      </div>
      <div
        onClick={(event) => handleMarkSelection(note, event)}
        className={NoteStyles.toggle}
      >
        <img
          style={{ display: note.selectedState ? "block" : "none" }}
          src={markImg}
          alt="markImg"
        />
      </div>
    </div>
  );
};

export default Note;
