import NoteModalStyles from "./NoteModal.module.css";
import tags from "../TagsList/TagsInfo";
import Tag from "../TagsList/Tag/Tag";

const NoteModal = () => {
  return (
    <div className={NoteModalStyles.wrapper}>
      <form>
        <div className={NoteModalStyles.headerPanel}>
          <input
            className={NoteModalStyles.noteTitle}
            placeholder="Enter title"
          />
          <div className={NoteModalStyles.save}></div>
          <div className={NoteModalStyles.close}></div>
        </div>

        <textarea
          className={NoteModalStyles.noteBody}
          placeholder="Enter body"
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
