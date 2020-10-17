import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapItems: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  span: {
    fontWeight: "bold",
    color: "black",
  },
  name: {
    [theme.breakpoints.down("xl")]: {
      fontSize: "21px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "17px",
    },
  },
  icon: {
    [theme.breakpoints.down("xl")]: {
      fontSize: "21px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "17px",
    },
    color: "black",
  },
}));

export default useStyles;
