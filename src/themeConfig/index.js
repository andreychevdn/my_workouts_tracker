import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xxs: 200,
      xs: 560,
      sm: 768,
      md: 900,
      lg: 1150,
      xl: 1320,
    },
  },
});

export default theme;
