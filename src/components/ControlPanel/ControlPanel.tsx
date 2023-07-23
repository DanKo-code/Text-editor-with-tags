import ControlPanelStyles from "./ControlPanel.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  visibilityMode,
  changeSelectedNote,
} from "../../state/storeSlice/NoteModalSlice";
import { deselectAll } from "../../state/storeSlice/NotesListSlice";

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlevisibilityMode = () => {
    dispatch(
      changeSelectedNote({
        id: 0,
        title: "",
        body: "",
        createTime: "",
        selectedState: false,
      })
    );
    dispatch(visibilityMode(true));
  };

  return (
    <div className={ControlPanelStyles.wrapper}>
      <div
        onClick={handlevisibilityMode}
        className={ControlPanelStyles.control}
      >
        Create
      </div>
      <div className={ControlPanelStyles.controlsForSelectedItems}>
        <div className={ControlPanelStyles.control}>Remove selected</div>
        <div
          onClick={() => dispatch(deselectAll())}
          className={ControlPanelStyles.control}
        >
          Deselect All
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
