import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrap: {
    width: "50vw",
    [theme.breakpoints.down("md")]: {
      width: "57vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "65vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "87vw",
    },
    padding: "15px",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#9e9e9e",
  },
  table: {
    marginTop: "10px",
  },
  container: {
    maxHeight: "550px",
    padding: "5px",
  },
  tableHead: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: "15px",
  },
  warning: {
    textAlign: "center",
    color: "red",
  },
}));

export default useStyles;
