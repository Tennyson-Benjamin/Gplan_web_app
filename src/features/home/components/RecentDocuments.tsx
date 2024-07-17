import React from "react";
import { Box, Grid, Input, InputAdornment, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function RecentDocuments() {
  return (
    <>
      <Grid
        sx={{
          backgroundColor: "#fff",
          pl: "7%",
          pr: "7%",
          pb: "32px",
          mb: "36px",
          pt: "29px",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: "#333333",
                textAlign: "left",
                fontFamily: "Poppins",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "15px",
                pt: '2px',
                pb: '2px',
              }}
            >
              Your
            </Typography>
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: '7px',
              pl: '5px',
              mt: '5px',
              mb: '5px',
              pt: '1px',
              pb: '2px',
              mr: '5px',
              backgroundColor: "#F2F7FC",
              borderRadius: '4px',
            }}
            >
              <Typography
                sx={{
                  color: "#1C4C82",
                  textAlign: "left",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "15px",
                  pt: '2px',
                  pb: '2px',
                }}
              >
                Recent
              </Typography>
              <ArrowDropDownIcon/>
            </Box>
            <Typography
              sx={{
                color: "#333333",
                textAlign: "left",
                fontFamily: "Poppins",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "15px",
                pt: '2px',
                pb: '2px',
              }}
            >
              Documents
            </Typography>
          </Box>
          <Box>
            <FormControl variant="standard">
              <Input
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </>
  );
}