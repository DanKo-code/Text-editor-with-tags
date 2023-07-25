import tags from "./TagsInfo";
import Tag from "./Tag/Tag";
import React, { useEffect, useState } from "react";
import TagsListStyles from "./TagsList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { ITag } from "./TagsInfo";
import { filterNotes } from "../../state/storeSlice/NotesListSlice";

interface ITagWithState {
  id: number;
  title: string;
  state: boolean;
}

const TagsList = () => {
  const globalTags = useSelector((state: RootState) => state.TagsList.tags);
  // const globalTagsWithStates = useSelector((state: RootState) =>
  //   state.TagsList.tags.map((tag) => ({ ...tag, state: false }))
  // );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setGlobalTags(globalTags);

    //1
    const existingTitles = TagsWithStates.map((item) => item.title);

    //2
    const newTagsToAdd = globalTags.filter(
      (item) => !existingTitles.includes(item.title)
    );

    //3
    const updatedSecondArray = [...TagsWithStates];

    //4
    newTagsToAdd.forEach((newTag) => {
      // Check if the newTag already exists in the second array based on the title
      const existingTag = updatedSecondArray.find(
        (item) => item.title === newTag.title
      );

      if (!existingTag) {
        // If the newTag does not exist, add it to the second array
        updatedSecondArray.push({ ...newTag, state: false });
      }
    });

    setGlobaltagsWithStates(updatedSecondArray);
  }, [globalTags]);

  const [tags, setGlobalTags] = useState<ITag[]>(globalTags);
  const [TagsWithStates, setGlobaltagsWithStates] = useState<ITagWithState[]>(
    globalTags.map((tag) => ({ ...tag, state: false }))
  );

  const handleTagClick = (tag: ITag) => {
    // alert("Befor" + JSON.stringify(TagsWithStates));
    const res: ITagWithState[] = TagsWithStates.map((item) => {
      if (item.title === tag.title) {
        return { id: item.id, title: item.title, state: !item.state }; // Toggle the state value
      }
      return item;
    });

    // alert("After" + JSON.stringify(res));

    setGlobaltagsWithStates(res);

    dispatch(filterNotes(tag));
  };

  return (
    <div>
      <div className={TagsListStyles.title}>Tags filter:</div>
      <div className={TagsListStyles.tagsListWrapper}>
        {TagsWithStates.length ? (
          TagsWithStates.map((item) => {
            return item.state ? (
              <div>
                <div
                  className={TagsListStyles.active}
                  onClick={() => handleTagClick(item)}
                >
                  <Tag key={item.id} tag={item} />
                </div>
              </div>
            ) : (
              <div>
                <div onClick={() => handleTagClick(item)}>
                  <Tag key={item.id} tag={item} />
                </div>
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
