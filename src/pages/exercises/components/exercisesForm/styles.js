import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapFields: {
    [theme.breakpoints.down("xl")]: {
      width: "35vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "47vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "65vw",
    },
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "blue",
  },
  formControl: {
    marginTop: "20px",
  },
  textField: {
    marginTop: "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  wrapButtons: {
    marginTop: "185px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useStyles;
