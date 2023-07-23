import ControlPanelStyles from "./ControlPanel.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  visibilityMode,
  changeSelectedNote,
  fromNewFromExistingMode,
} from "../../state/storeSlice/NoteModalSlice";
import {
  deselectAll,
  removeSelected,
} from "../../state/storeSlice/NotesListSlice";
//delete then, for use bool visibility for control buttons
import { contolButtonsVisibilityMode } from "../../state/storeSlice/ControlPanelSlice";

const ControlPanel: React.FC = () => {
  const contolButtonsVisibility = useSelector(
    (state: RootState) => state.ControlPanel.contolButtonsVisibility
  );
  const dispatch = useDispatch<AppDispatch>();

  const handlevisibilityMode = async () => {
    await dispatch(
      changeSelectedNote({
        id: 0,
        title: "",
        body: "",
        createTime: "",
        selectedState: false,
      })
    );
    await dispatch(visibilityMode(true));
    await dispatch(
      fromNewFromExistingMode({ fromNew: true, fromExisting: false })
    );
  };

  const controlsForSelectedItemsWrapperStyles: string = contolButtonsVisibility
    ? ControlPanelStyles.controlsForSelectedItems
    : ControlPanelStyles.controlsForSelectedItemsHide;

  return (
    <div className={ControlPanelStyles.wrapper}>
      <div
        onClick={handlevisibilityMode}
        className={ControlPanelStyles.control}
      >
        Create
      </div>
      <div className={controlsForSelectedItemsWrapperStyles}>
        <div
          onClick={() => {
            dispatch(removeSelected());
            dispatch(contolButtonsVisibilityMode(false));
          }}
          className={ControlPanelStyles.control}
        >
          Remove selected
        </div>
        <div
          onClick={() => {
            dispatch(deselectAll());
            dispatch(contolButtonsVisibilityMode(false));
          }}
          className={ControlPanelStyles.control}
        >
          Deselect All
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
