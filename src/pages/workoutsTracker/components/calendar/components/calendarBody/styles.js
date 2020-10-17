import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  calendar: {
    overflow: "hidden",
  },
  tableCell: {
    textAlign: "center",
    [theme.breakpoints.down("xl")]: {
      padding: "16px 10px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "10px 5px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  activeTableCell: {
    "&:hover": {
      cursor: "pointer",
      background: "#efefef",
    },
  },
  activeDay: {
    backgroundColor: "green",
    color: "white",
    [theme.breakpoints.down("xl")]: {
      padding: "5px",
    },
    [theme.breakpoints.down("xxs")]: {
      padding: "0px",
    },
    borderRadius: "50%",
    minWidth: "29px",
    display: "inline-block",
  },
}));

export default useStyles;
