import React from "react";
import Header from "../../../header/Header";
import Publisher_body from "../body/Publisher_body";
import Sidebar from "../sidebar/Sidebar";

function Publisher_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Publisher_body />
    </div>
  );
}

export default Publisher_page;
