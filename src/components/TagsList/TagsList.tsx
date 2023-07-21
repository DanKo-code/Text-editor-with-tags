import tags from "./TagsInfo";
import Tag from "./Tag/Tag";
import TagsListStyles from "./TagsList.module.css";

const TagsList = () => {
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
