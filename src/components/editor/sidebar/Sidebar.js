import React from "react";
import { useHistory } from "react-router-dom";
import "../../../App.css";
import "../sidebar/Sidebar.css";
import { SidebarData } from "./SidebarData";

const Sidebar = ({ onSideBarClick }) => {
  //   const user = jwt_decode(sessionStorage.getItem("staffId"));
  let history = useHistory();

  const handleClick = (value) => {
    history.push(value);
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div className="Sidebar">
        <h2 style={{ fontSize: "40px", color: "white", textAlign: "center" }}>
          CJS
        </h2>

        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                  typeof onSideBarClick === "function"
                    ? onSideBarClick(val.link)
                    : history.push(val.link);
                }}
              >
                {" "}
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
                <div id="arrow">{val.arrow}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
