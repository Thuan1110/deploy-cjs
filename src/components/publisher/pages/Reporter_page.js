import React from "react";
import Header from "../../../header/Header";
import Reporter_body from "../body/Reporter_body";
import Sidebar from "../sidebar/Sidebar";

function Reporter_page() {
  return (
    <div>
      <Header />
      <Sidebar />

      <Reporter_body />
    </div>
  );
}

export default Reporter_page;
