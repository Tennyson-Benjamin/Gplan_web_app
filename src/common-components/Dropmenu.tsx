import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../resources/logo.png";

function Dropmenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    //This should be replaced by specific function the menuitems are supposed to do with every function making AnchorEl null in the first line to close the menu.
  };

  return (
    <>
      <Box marginLeft="100px">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1C4C82",
            borderRadiusTop: "1",
            "&:hover": { background: "#1C4C82" },
          }}
          id="dropdown-button"
          onClick={handleClick}
          aria-controls={open ? "dropdown-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<Avatar src={logo} />}
        ></Button>
        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ "aria-labelledby": "dropdown-button" }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            dense
            onClick={handleClose}
            sx={{
              paddingRight: "75px",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              fontFamily="Montserrat, Arial"
              fontSize="16px"
              color="#333"
            >
              Go To All Files
            </Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem
            dense
            onClick={handleClose}
            sx={{
              paddingRight: "75px",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              fontFamily="Montserrat, Arial"
              fontSize="16px"
              color="#333"
            >
              New File
            </Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem
            dense
            onClick={handleClose}
            sx={{
              paddingRight: "75px",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              fontFamily="Montserrat, Arial"
              fontSize="16px"
              color="#333"
            >
              Save File
            </Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem
            dense
            onClick={handleClose}
            sx={{
              paddingRight: "75px",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              fontFamily="Montserrat, Arial"
              fontSize="16px"
              color="#333"
            >
              View Graph
            </Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem
            dense
            onClick={handleClose}
            sx={{
              paddingRight: "75px",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              fontFamily="Montserrat, Arial"
              fontSize="16px"
              color="#333"
            >
              Export
            </Typography>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem
            dense
            onClick={handleClose}
            sx={{
              paddingRight: "75px",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              fontFamily="Montserrat, Arial"
              fontSize="16px"
              color="#333"
            >
              Exit
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default Dropmenu;
