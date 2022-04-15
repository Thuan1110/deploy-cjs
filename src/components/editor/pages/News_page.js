import React from "react";
import Sidebar from "../sidebar/Sidebar";
import News_body from "../body/News_body";
import Header from "../../../header/Header";

function News_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <News_body />
    </div>
  );
}

export default News_page;
