import React, { useRef, useState, useEffect } from "react";
import "../header/header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import jwt_decode from "jwt-decode";

function Header() {
  let history = useHistory();

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);

  const handleClick = () => {
    if (
      decoded[
        `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
      ] === "2"
    ) {
      //editor
      history.push({
        pathname: "/editor_profile",
      });
    } else if (
      decoded[
        `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
      ] === "3"
    ) {
      //publisher
      history.push({
        pathname: "/publisher_profile",
      });
    } else if (
      decoded[
        `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
      ] === "4"
    ) {
      //admin
      history.push({
        pathname: "/admin_profile",
      });
    } else if (
      decoded[
        `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
      ] === "1"
    ) {
      //reporter
      history.push({
        pathname: "/reporter_page",
      });
    }
  };

  return (
    <div className="header">
      <div
        style={{
          width: "400px",
          height: "auto",
          // border: "1px solid green",
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: "5px",
        }}
      >
        <AccountCircleIcon onClick={handleClick} style={{ fontSize: "30px" }} />

        <p style={{ paddingTop: "5px" }} onClick={handleClick}>
          {decoded.Username}
        </p>

        <Divider orientation="vertical" flexItem />

        <div>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
