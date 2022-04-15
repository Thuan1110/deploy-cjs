import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@mui/icons-material/People";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FeedIcon from "@mui/icons-material/Feed";

export const SidebarData = [
    // {
    //   title: "Dashboard",
    //   icon: <DashboardIcon />,
    //   link: "/home",
    // },

    {
        title: "Report",
        icon: <PeopleIcon />,
        link: "/reporter_page",
        arrow: <ArrowForwardIosIcon />,
    },
    // {
    //   title: "Profile",
    //   icon: <AccountBoxIcon />,
    //   link: "/publisher_profile",
    //   arrow: <ArrowForwardIosIcon />,
    // },
    // {
    //   title: "Logout",
    //   icon: <ExitToAppIcon />,
    //   link: "/",
    //   arrow: <ArrowForwardIosIcon />,
    // },
];
