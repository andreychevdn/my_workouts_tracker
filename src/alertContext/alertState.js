import React, { useReducer } from "react";

import alertReducer from "./alertReducer";
import { AlertContext } from "./alertContext";
import { SHOW_ALERT, HIDE_ALERT } from "../alertContext/constants.js";

const AlertState = ({ children }) => {
  const initialState = {
    text: "",
    severity: "info",
    alertVisible: false,
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const handleShowAlert = (text, severity) => {
    dispatch({ type: SHOW_ALERT, payload: { text, severity } });
  };

  const handleHideAlert = () => {
    dispatch({ type: HIDE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{ handleShowAlert, handleHideAlert, alert: state }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
