import React from "react";
import Header from "../../../header/Header";
import News_body from "../body/News_body";
import Sidebar from "../sidebar/Sidebar";

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
