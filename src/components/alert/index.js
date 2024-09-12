import React, { useContext } from "react";

import { Alert } from "@material-ui/lab";

import useStyles from "./styles";
import { AlertContext } from "../../alertContext/alertContext";

const AppAlert = () => {
  const appAlert = useStyles();
  const { alert } = useContext(AlertContext);
  let { text, severity } = alert;

  return (
    <div className={appAlert.wrap}>
      <Alert variant="filled" severity={severity}>
        {text}
      </Alert>
    </div>
  );
};

export default AppAlert;
