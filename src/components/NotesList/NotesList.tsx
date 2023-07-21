import NotesListStyles from "./NotesList.module.css";
import Note from "./Note/Note";
import items from "./NotesInfo";

const NotesList = () => {
  return (
    <div className={NotesListStyles.wrapper}>
      {items.map((item) => {
        return <Note key={item.id} note={item} />;
      })}
    </div>
  );
};

export default NotesList;
