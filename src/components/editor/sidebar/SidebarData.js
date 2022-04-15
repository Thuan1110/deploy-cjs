import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FeedIcon from "@mui/icons-material/Feed";
import TaskIcon from "@mui/icons-material/Task";

export const SidebarData = [
  {
    title: "Reports",
    icon: <FeedIcon />,
    link: "/reports",
    arrow: <ArrowForwardIosIcon />,
  },
  {
    title: "News",
    icon: <FeedIcon />,
    link: "/news",
    arrow: <ArrowForwardIosIcon />,
  },
  {
    title: "Tasks",
    icon: <TaskIcon />,
    link: "/tasks",
    arrow: <ArrowForwardIosIcon />,
  },
];
