import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    position: "relative",
  },
  wrapFields: {
    [theme.breakpoints.down("xl")]: {
      width: "50vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "65vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "75vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px 10px",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#9e9e9e",
  },
  textField: {
    marginTop: "10px",
    width: "70%",
  },
  btnCancel: {
    position: "absolute",
    left: "20px",
    bottom: "20px",
  },
  btnSave: {
    position: "absolute",
    right: "20px",
    bottom: "20px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  btnAddExercise: {
    marginTop: "5px",
    width: "25%",
  },
  table: {
    marginTop: "25px",
    maxHeight: "325px",
  },
  tableHead: {
    fontSize: "15px",
    color: "rgba(0, 0, 0, 1)",
  },
}));

export default useStyles;
