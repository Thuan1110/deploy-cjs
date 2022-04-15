import React from "react";
import Sidebar from "../sidebar/Sidebar";
import CreateNews_body from "../body/CreateNews_body";
import Header from "../../../header/Header";

function CreateNews_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <CreateNews_body />
    </div>
  );
}

export default CreateNews_page;
