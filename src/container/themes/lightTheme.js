/**
 * App Light Theme
 */
import { createMuiTheme } from "@material-ui/core/styles";
import AppConfig from "../../constants/AppConfig";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: AppConfig.themeColors.primary
    },
    secondary: {
      main: AppConfig.themeColors.primary
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
