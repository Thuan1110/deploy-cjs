import React from "react";
import Header from "../../../header/Header";
import ReportsDetail_body from "../body/ReportsDetail_body";
import Sidebar from "../sidebar/Sidebar";

function ReportsDetail_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <ReportsDetail_body />
    </div>
  );
}

export default ReportsDetail_page;
