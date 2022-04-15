import React from "react";
import Header from "../../../header/Header";
import NewsDetail_body from "../body/NewsDetail_body";
import Sidebar from "../sidebar/Sidebar";

function NewsDetail_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <NewsDetail_body />
    </div>
  );
}

export default NewsDetail_page;
