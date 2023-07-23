import React from "react";
import AppStyles from "./App.module.css";

import ControlPanel from "./components/ControlPanel/ControlPanel";
import NodeList from "./components/NotesList/NotesList";
import TagsList from "./components/TagsList/TagsList";
import NodeModal from "./components/NoteModal/NoteModal";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./state/store";

function App() {
  const isVisible = useSelector(
    (state: RootState) => state.NoteModal.visibility
  );

  return (
    <div>
      {isVisible && <div className={AppStyles.NodeModalOverlay} />}
      <div
        style={{ display: isVisible ? "block" : "none" }}
        className={AppStyles.NodeModalWrapper}
      >
        <NodeModal />
      </div>
      <div className={AppStyles.wrapper}>
        <ControlPanel />
        <NodeList />
        <TagsList />
      </div>
    </div>
  );
}

export default App;
