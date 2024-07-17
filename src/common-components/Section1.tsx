import React from "react";
import { Box, Typography } from "@mui/material";

function Section1() {
  let height = window.innerHeight;
  height = height - 92;
  console.log(height);
  return (
    <Box
      sx={{
        left: "0px",
        paddingBottom: "92px",
        right: "0px",
        height: { height },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#DDD",
            width: "57%",
            padding: "35px 0px 36px 0px",
          }}
        >
          <Typography>Header Text 1</Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "82px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#DDD",
            width: "37%",
            padding: "35px 0px 36px 0px",
          }}
        >
          <Typography>Header Text 2</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Section1;
