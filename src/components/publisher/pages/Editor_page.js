import React from "react";
import Header from "../../../header/Header";
import Editor_body from "../body/Editor_body";
import Sidebar from "../sidebar/Sidebar";

function Editor_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Editor_body />
    </div>
  );
}

export default Editor_page;
