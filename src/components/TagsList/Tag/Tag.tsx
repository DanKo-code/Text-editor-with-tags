import TagStyles from "./Tag.module.css";
import { ITag } from "../TagsInfo";
import React from "react";

interface TagProps {
  tag: ITag;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return <div className={TagStyles.Tag}># {tag.title}</div>;
};

export default Tag;
