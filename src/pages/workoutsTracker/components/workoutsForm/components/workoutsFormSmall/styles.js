import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "17px",
    color: "#9e9e9e",
  },
  formControl: {
    marginTop: "10px",
    width: "100%",
  },
  wrapButtons: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    marginTop: "25px",
    [theme.breakpoints.up("xxs")]: {
      padding: "10px 20px 15px",
    },
    [theme.breakpoints.up("xs")]: {
      padding: "10px 40px 15px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "10px 50px 15px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "10px 65px 15px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "10px 85px 15px",
    },
  },
  wrapNumbersFields: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  numbersField: {
    width: "20%",
  },
  slider: {
    marginTop: "15px",
  },
}));

export default useStyles;
