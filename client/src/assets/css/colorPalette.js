import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#FFFFFF",
      light: "#5D737E",
    },
    secondary: {
      main: "#C80E10",
      contrastText: "#000000",
      dark: "#86090B",
      light: "#FFFFFF",
    },
  },
});

export default theme;
