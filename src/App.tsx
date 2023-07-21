import React from "react";
import AppStyles from "./App.module.css";

import ControlPanel from "./components/ControlPanel/ControlPanel";
import NodeList from "./components/NotesList/NotesList";
import TagsList from "./components/TagsList/TagsList";
import NodeModal from "./components/NoteModal/NoteModal";

function App() {
  return (
    <div>
      <div className={AppStyles.NodeModalWrapper}>
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
