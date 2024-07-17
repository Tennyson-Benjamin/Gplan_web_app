import { Box, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "200px",
          justifyContent: "center",
          backgroundColor: "#6FCF97",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4">Get in touch with Gplan</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#DDD",
            paddingLeft: "175px",
            paddingRight: "175px",
            my: "10px",
          }}
        >
          <Typography variant="subtitle1">Email</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
