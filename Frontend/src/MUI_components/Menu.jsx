import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu({name}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "1.25rem", color : "#F5FBEF" }}
        // color="secondary"
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <a href="">
          <MenuItem onClick={handleClose}>Borivali</MenuItem>
        </a>
        <a href="">
          <MenuItem onClick={handleClose}>Bhayander</MenuItem>
        </a>
        <a href="">
          <MenuItem onClick={handleClose}>Bandra</MenuItem>
        </a>
      </Menu>
    </div>
  );
}
