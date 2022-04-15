import React from "react";
import Header from "../../../header/Header";
import EditorAdminDetail_body from "../body/EditorAdminDetail_body";
import Sidebar from "../sidebar/Sidebar";

function EditorDetail_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <EditorAdminDetail_body />
    </div>
  );
}

export default EditorDetail_page;
