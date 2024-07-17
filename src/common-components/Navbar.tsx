import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";

function Navbar() {
  return (
    <>
      <Box>
        <AppBar sx={{ background: "#DDD", boxShadow: "0", height: "92px" }}>
          <Toolbar>
            <Typography color="black">NavBar</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
