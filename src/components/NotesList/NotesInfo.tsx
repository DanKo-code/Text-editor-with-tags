export interface INote {
  id: number;
  title: string;
  createTime: string;
  selectedState: boolean;
}

const notes: INote[] = [
  { id: 1, title: "Granny", createTime: "21.07.2023", selectedState: false },
  { id: 2, title: "Note2", createTime: "21.07.2023", selectedState: false },
  { id: 3, title: "Note3", createTime: "21.07.2023", selectedState: false },
];

export default notes;
