import NoteStyles from "./Note.module.css";
import { INote } from "../NotesInfo";
import React from "react";
import markImg from "../../../images/Vec3.svg";
import { changeSelectedState } from "../../../state/storeSlice/NotesListSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { contolButtonsVisibilityMode } from "../../../state/storeSlice/ControlPanelSlice";

interface NoteProps {
  note: INote;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const notes = useSelector((state: RootState) => state.NoteList.notes);

  const dispatch = useDispatch<AppDispatch>();

  const checkConsistsTrueStates = (): boolean => {
    return notes.some((note) => note.selectedState === true);
  };

  const handleMarkSelection = async (
    note: INote,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    await event.stopPropagation();
    await dispatch(changeSelectedState(note));

    //to useEffect
    //await dispatch(contolButtonsVisibilityMode(checkConsistsTrueStates()));
  };

  React.useEffect(() => {
    dispatch(contolButtonsVisibilityMode(checkConsistsTrueStates()));
  }, [notes]);

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
