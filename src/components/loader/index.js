import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./styles";

const Loader = () => {
  const loader = useStyles();

  return (
    <div className={loader.wrap}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
