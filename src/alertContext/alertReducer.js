import { SHOW_ALERT, HIDE_ALERT } from "./constants.js";

const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        text: payload.text,
        severity: payload.severity,
        alertVisible: true,
      };
    case HIDE_ALERT:
      return {
        ...state,
        alertVisible: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
