import React from "react";
import Header from "../../../header/Header";
import PublisherDetail_body from "../body/PublisherDetail_body";
import Sidebar from "../sidebar/Sidebar";

function PublisherDetail_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <PublisherDetail_body />
    </div>
  );
}

export default PublisherDetail_page;
