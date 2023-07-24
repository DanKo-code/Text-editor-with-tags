import tags from "./TagsInfo";
import Tag from "./Tag/Tag";
import React, { useEffect, useState } from "react";
import TagsListStyles from "./TagsList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { ITag } from "./TagsInfo";

const TagsList = () => {
  const globalTags = useSelector((state: RootState) => state.TagsList.tags);

  useEffect(() => {
    setGlobalTags(globalTags);
  }, [globalTags]);

  const [tags, setGlobalTags] = useState<ITag[]>(globalTags);

  return (
    <div>
      <div className={TagsListStyles.title}>Tags filter:</div>
      <div className={TagsListStyles.tagsListWrapper}>
        {tags.map((item) => {
          return <Tag key={item.id} tag={item} />;
        })}
      </div>
    </div>
  );
};

export default TagsList;
