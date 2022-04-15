import React from "react";
import ListIcon from "@material-ui/icons/List";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const SidebarData = [
  {
    title: "Publishers",
    icon: <AccountBoxIcon />,
    link: "/publishers",
    arrow: <ArrowForwardIosIcon />,
  },

  {
    title: "Editors",
    icon: <AccountBoxIcon />,
    link: "/editor_admin",
    arrow: <ArrowForwardIosIcon />,
  },
];
