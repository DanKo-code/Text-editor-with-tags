import tags from "./TagsInfo";
import Tag from "./Tag/Tag";
import React, { useEffect, useState } from "react";
import TagsListStyles from "./TagsList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { ITag } from "./TagsInfo";
import { filterNotes } from "../../state/storeSlice/NotesListSlice";

const TagsList = () => {
  const globalTags = useSelector((state: RootState) => state.TagsList.tags);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setGlobalTags(globalTags);
  }, [globalTags]);

  const [tags, setGlobalTags] = useState<ITag[]>(globalTags);

  const handleTagClick = (tag: ITag) => {
    dispatch(filterNotes(tag));
  };

  return (
    <div>
      <div className={TagsListStyles.title}>Tags filter:</div>
      <div className={TagsListStyles.tagsListWrapper}>
        {tags.length ? (
          tags.map((item) => {
            return (
              <div onClick={() => handleTagClick(item)}>
                <Tag key={item.id} tag={item} />
              </div>
            );
          })
        ) : (
          <div className={TagsListStyles.noTags}>There are no tags yet!</div>
        )}
      </div>
    </div>
  );
};

export default TagsList;
