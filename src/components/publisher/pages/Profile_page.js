import React from "react";
import Sidebar from "../../publisher/sidebar/Sidebar";
import Profile_body from "../body/Profile_body";
import Header from "../../../header/Header";

function Profile_page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Profile_body />
    </div>
  );
}

export default Profile_page;
