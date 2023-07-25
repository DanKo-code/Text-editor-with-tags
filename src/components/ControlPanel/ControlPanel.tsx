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

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";

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
    // <Button
    //   variant="contained"
    //   color="primary"
    //   //onClick={handlevisibilityMode}
    // >
    //   Create
    // </Button>
    <div className={ControlPanelStyles.wrapper}>
      {/* <div
        onClick={handlevisibilityMode}
        className={ControlPanelStyles.control}
      >
        Create
      </div> */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handlevisibilityMode}
      >
        Create
      </Button>
      <div className={controlsForSelectedItemsWrapperStyles}>
        {/* <Button
          variant="contained"
          onClick={() => {
            dispatch(removeSelected());
            dispatch(contolButtonsVisibilityMode(false));
          }}
        >
          Remove selected
        </Button> */}

        <Button
          variant="contained"
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch(removeSelected());
            dispatch(contolButtonsVisibilityMode(false));
          }}
        >
          Remove selected
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<CancelIcon />}
          onClick={() => {
            dispatch(deselectAll());
            dispatch(contolButtonsVisibilityMode(false));
          }}
        >
          Deselect All
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
