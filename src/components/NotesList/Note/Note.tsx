import NoteStyles from "./Note.module.css";
import { INote } from "../NotesInfo";
import React from "react";
import markImg from "../../../images/Vec3.svg";

interface NoteProps {
  note: INote;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <div className={NoteStyles.note}>
      <div>
        <div>{note.title}</div>
        <div>{note.createTime}</div>
      </div>
      <div className={NoteStyles.toggle}>
        <img src={markImg} alt="markImg" />
      </div>
    </div>
  );
};

export default Note;
