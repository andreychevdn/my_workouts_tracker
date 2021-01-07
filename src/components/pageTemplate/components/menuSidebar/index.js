import React from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import useStyles from "./styles";
import { EXERCISES_PAGE, WORKOUTS_TRACKER_PAGE } from "../../../../constants";

function MenuSidebar({ isOpenSidebar, onSidebarClose }) {
  const sidebar = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          sidebar.drawerPaper,
          !isOpenSidebar && sidebar.drawerPaperClose
        ),
      }}
      open={isOpenSidebar}
    >
      <div className={sidebar.toolbarIcon}>
        <IconButton onClick={onSidebarClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListSubheader inset className={sidebar.subheader}>
          Menu
        </ListSubheader>
        <Link to={WORKOUTS_TRACKER_PAGE} className={sidebar.link}>
          <ListItem button>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Workouts tracker" />
          </ListItem>
        </Link>
        <Link to={EXERCISES_PAGE} className={sidebar.link}>
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Exercises list" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Drawer>
  );
}

export default MenuSidebar;
