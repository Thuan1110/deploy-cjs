import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Reports_body from "../body/Reports_body";
import Header from "../../../header/Header";

function Reports_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Reports_body />
    </div>
  );
}

export default Reports_page;
