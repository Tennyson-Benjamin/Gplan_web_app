import React from "react";
import { Box, Typography } from "@mui/material";

function Section4() {
  return (
    <>
      <Box
        sx={{
          height: `${window.innerHeight - 150}px`,
          display: "flex",
          margin: "29px 64px",
        }}
      >
        <Box
          sx={{
            height: `${window.innerHeight - 150}px`,
            backgroundColor: "#DDD",
            flex: "1.5",
            marginRight: "16px",
          }}
        ></Box>
        <Box
          sx={{
            height: `${window.innerHeight - 150}px`,
            display: "flex",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <Box sx={{ flex: "1", backgroundColor: "#DDD", marginBottom: "8px" }}>
            <Typography my={10} mx={5}>
              Born in the desert sands of BITS Pilani, GPLAN is a Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flex: "1" }}>
            <Box
              sx={{ flex: "1", backgroundColor: "#DDD", marginRight: "8px" }}
            >
              <Typography my={18} mx={10}>
                Our Team
              </Typography>
            </Box>
            <Box sx={{ flex: "1", backgroundColor: "#DDD" }}>
              <Typography my={18} mx={7}>
                What we are upto
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Section4;
