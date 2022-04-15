import React from "react";
import Header from "../../../header/Header";
import EditorAdmin_body from "../body/EditorAdmin_body";
import Sidebar from "../sidebar/Sidebar";

function Editor_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <EditorAdmin_body />
    </div>
  );
}

export default Editor_page;
