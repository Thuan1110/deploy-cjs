import React from "react";
import Header from "../../../header/Header";
import CreateReports_body from "../body/CreatReports_body";
import Sidebar from "../slidebar/Slidebar";

function CreateReports_page() {
    return (
        <div>
            <Header />
            <Sidebar />
            <CreateReports_body />
        </div>
    );
}

export default CreateReports_page;
