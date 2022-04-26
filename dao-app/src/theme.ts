import { createTheme, Input } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "Ubuntu",
  },
  overrides: {
    MuiButton: {
      root: {
        width: '20vw',
      },
    },
    MuiFormControl: {
      root: {
        width: '20vw',
      }
    }
  },
  
});

export default theme;
