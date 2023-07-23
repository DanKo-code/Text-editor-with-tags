import { ITag } from "../../components/TagsList/TagsInfo";

export interface INote {
  id: number;
  title: string;
  body: string;
  createTime: string;
  selectedState: boolean;
  tags?: ITag[];
}
