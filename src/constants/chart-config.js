/**
 * Change all chart colors
 */
import AppConfig from "./AppConfig";

const {
  primary,
  warning,
  danger,
  success,
  info,
  purple,
  sky,
  yellow,
  white,
  greyLighten,
  grey
} = AppConfig.themeColors;

const ChartConfig = {
  color: {
    primary: primary,
    warning: warning,
    danger: danger,
    success: success,
    info: info,
    default: "#657786",
    purple: purple,
    sky: sky,
    yellow: yellow,
    white: "#FFFFFF",
    dark: white,
    orange: "#FF8C00",
    lightBlue: "#ADD8E6",
    greyLighten: greyLighten,
    grey: grey
  },
  legendFontColor: "#AAAEB3", // only works on react chart js 2
  chartGridColor: "#EAEAEA",
  axesColor: "#657786",
  shadowColor: "rgba(0,0,0,0.5)"
};

// Tooltip Styles
export const tooltipStyle = {
  backgroundColor: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(0,0,0,0.6)",
  borderRadius: "5px"
};

export const tooltipTextStyle = {
  color: "#FFF",
  fontSize: "12px",
  paddingTop: "5px",
  paddingBottom: "5px",
  lineHeight: "1"
};

export default ChartConfig;
