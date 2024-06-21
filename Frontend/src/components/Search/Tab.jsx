import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Input from "./Input";
import Inputbox from "./Input+Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    black: {
      //main color
      main: "#EC0B43",
      light: "#040F0F",
      //hover karne par
      dark: "#040F0F",
      contrastText: "#040F0F",
    },
  },
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const CustomPanel = ({ value, index }) => {
  return (
    <CustomTabPanel value={value} index={index}>
      <Input />
    </CustomTabPanel>
  );
};
export default function BasicTabs({
  // setSearch
}) {
  const [value, setValue] = React.useState(0);
  // const [search, setSearch] = React.useState("bandra");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="black"
            indicatorColor="primary"
            centered
          >
            <Tab label="Rent" {...a11yProps(0)} />
            <Tab label="PG" {...a11yProps(1)} />
            {/* <Tab label="PG" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Inputbox/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Inputbox />
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={2}>
          <Inputbox />
        </CustomTabPanel> */}
        {/* <CustomPanel value={value} index={2}/> */}
        {/* <CustomPanel value={value} index={2}/> */}
      </Box>
    </ThemeProvider>
  );
}
