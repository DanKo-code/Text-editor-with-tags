import ControlPanelStyles from "./ControlPanel.module.css";

const ControlPanel = () => {
  return (
    <div className={ControlPanelStyles.wrapper}>
      <div className={ControlPanelStyles.control}>Create</div>
      <div className={ControlPanelStyles.controlsForSelectedItems}>
        <div className={ControlPanelStyles.control}>Remove selected</div>
        <div className={ControlPanelStyles.control}>Deselect</div>
      </div>
    </div>
  );
};

export default ControlPanel;
