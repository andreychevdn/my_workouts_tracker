import React from "react";

import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";

import useStyles from "./styles";
import PageButton from "../pageButton";

const Footer = ({
  isOpenSidebar,
  onCreationFormWorkoutsOpen,
  onCreationFormExercisesOpen,
  text,
}) => {
  const footer = useStyles();

  return (
    <div className={footer.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(footer.appBar, isOpenSidebar && footer.appBarShift)}
      >
        <Toolbar className={footer.toolbar}>
          <PageButton
            text={text}
            onCreationFormExercisesOpen={onCreationFormExercisesOpen}
            onCreationFormWorkoutsOpen={onCreationFormWorkoutsOpen}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
