import Input from "./Input";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FiltersContext from "../../context/filters";
import { useContext } from "react";

const theme = createTheme({
  palette: {
    black: {
      main: "#EC0B43",
      light: "#040F0F",
      dark: "#040F0F",
      contrastText: "#040F0F",
    },
  },
});

const Inputbox = () => {
  const navigate = useNavigate();

  const { setTags } = useContext(FiltersContext);

  const handleSearch = () => {
    setTags([]);
    console.log("clicked");
    navigate("/list");
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Input />
        <Button
          onClick={handleSearch}
          sx={{
            fontSize: "1rem",
            font: "Inter",
            boxShadow: "0px 0px",
            fontWeight: "500",
            color: "white",
          }}
          variant="contained"
          color="black"
        >
          {" "}
          Search
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Inputbox;
