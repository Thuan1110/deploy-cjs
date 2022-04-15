import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "../sidebar/Sidebar.css";
import "../../../App.css";
import { SidebarData } from "./SidebarData";

const Sidebar = () => {
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
    <React.Fragment>
      <div className="Sidebar">
        <h2 style={{ fontSize: "40px", color: "white", textAlign: "center" }}>
          CJS
        </h2>
        {/* <AccountCircleIcon
          style={{
            color: "white",
            fontSize: "100px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
        />
        <Typography variant="h6" align="center" style={{ color: "white" }}>
          Thuan
        </Typography> */}

        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname == val.link ? "active" : ""}
                onClick={() => {
                  window.location.pathname = val.link;
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

        {/* <Typography variant="h4" align="center">
       
        </Typography> */}

        {/* <AccountCircleIcon
          style={{
            color: "white",
            fontSize: "100px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
        /> */}
        {/* <Typography variant="h6" align="center">
          {user.Username}
        </Typography> */}

        {/* <List>
          <ListItem button onClick={() => handleClick("/news")}>
            <ListItemIcon>
              <HomeIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
          <ListItem button onClick={() => handleClick("/contents")}>
            <ListItemIcon>
              <CalendarTodayIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Contents" />
          </ListItem>
          <ListItem button onClick={() => handleClick("/media")}>
            <ListItemIcon>
              <PeopleIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Media" />
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary=" Log Out" />
          </ListItem>
        </List> */}
        {/* 
        <ListItem
          style={{ marginTop: "65.5vh", backgroundColor: "#2b7dc5" }}
          button
          onClick={logout}
        >
          <AccountCircleIcon
            style={{
              color: "white",
              fontSize: "40px",
              display: "block",
            }}
          />
          <ListItemText primary=" thuan" align="left" /> */}

        {/* <ListItemText primary=" Log Out" /> */}
        {/* <ListItemIcon>
            <ExitToAppIcon style={{ color: "white" }} />
          </ListItemIcon>
        </ListItem> */}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
