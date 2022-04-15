import React from "react";
import Header from "../../../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Tasks_body from "../body/Tasks_body";

function Tasks_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Tasks_body />
    </div>
  );
}

export default Tasks_page;
