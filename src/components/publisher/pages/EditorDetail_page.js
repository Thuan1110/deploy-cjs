import React from "react";
import Header from "../../../header/Header";
import EditorDetail_body from "../body/EditorDetail_body";
import Sidebar from "../sidebar/Sidebar";

function EditorDetail_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <EditorDetail_body />
    </div>
  );
}

export default EditorDetail_page;
