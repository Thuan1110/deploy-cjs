import React from "react";
import Header from "../../../header/Header";
import ViewDetailNews_body from "../body/ViewDetailNews_body";
import Sidebar from "../sidebar/Sidebar";

function ViewDetailNews_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <ViewDetailNews_body />
    </div>
  );
}

export default ViewDetailNews_page;
