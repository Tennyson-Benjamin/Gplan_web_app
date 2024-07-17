import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import GplanIconWhite from "../../../common-components/icons/GplanIconWhite";

export default function Navbar() {
  return (
    <>
      <div className="homepage-navbar-outerdiv">
        <Grid container alignItems="center" justifyContent="space-between">
          <Box></Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '30px',
            marginLeft: '72px',
          }}>
            <GplanIconWhite />
            <Typography
              sx={{
                textAlign: "left",
                fontFamily: "Barlow semi Condensed",
                fontSize: "20px",
                fontStyle: "normal",
                color: "#F2F2F2",
                fontWeight: 500,
                lineHeight: "normal",
                padding: "8px",
              }}
            >
              GPLAN
            </Typography>
          </Box>
          <Box
            sx={{
              marginRight: '72px',
            }}
          >
            <Box
              sx={{
                backgroundColor: "#F2F2F2",
                padding: "16px",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Grid>
      </div>
    </>
  );
}