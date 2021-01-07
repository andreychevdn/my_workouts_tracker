import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0),
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "blue",
    },
  },
  subheader: {
    fontSize: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#9e9e9e",
  },
}));

export default useStyles;
