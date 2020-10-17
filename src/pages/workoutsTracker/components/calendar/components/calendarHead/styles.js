import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  monthSelector: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.2em",
    textTransform: "capitalize",
  },
  monthCell: {
    textAlign: 'center',
    "&:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },
  selectMonthTitle: {
    textAlign: 'center',
    fontWeight: "bold",
    background: "#efefef",
  },
  toggleMonth: {
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#efefef",
    },
  },
  arrowIcon: {
    padding: "5px 0 0 5px",
    transition: "250ms ease",
    "&:hover": {
      cursor: "pointer",
      opacity: ".5",
    },
  },
}));

export default useStyles;
