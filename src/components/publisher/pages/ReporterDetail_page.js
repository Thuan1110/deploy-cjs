import React from "react";
import Header from "../../../header/Header";
import ReporterDetail_body from "../body/ReporterDetail_body";
import Sidebar from "../sidebar/Sidebar";

function ReporterDetail_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <ReporterDetail_body />
    </div>
  );
}

export default ReporterDetail_page;
