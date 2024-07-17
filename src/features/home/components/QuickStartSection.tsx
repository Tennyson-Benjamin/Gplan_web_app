import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import createQuickStart from "../../../assets/homepage/createQuickStart.svg";
import existingQuickStart from "../../../assets/homepage/existingQuickStart.svg";
import { useNavigate } from "react-router-dom";

interface templateProps {
  imageProp: string;
  imageText: string;
  textSize: string;
}

export default function QuickStartSection() {
  const navigate = useNavigate();
  return (
    <>
      <div className="quickStartSectionBG">
        <Grid
          spacing={5}
          sx={{
            backgroundColor: "#1C4C82",
            pl: "7%",
            pr: "7%",
            pt: "0px",
          }}
        >
          <Typography
            sx={{
              mr: "10px",
              color: "#F2F2F2",
              textAlign: "left",
              fontFamily: "Poppins",
              fontSize: { xs: "13px", sm: "25px" },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            Quick Start
          </Typography>
        </Grid>
        <div className="quickStartSection">
          <div className="scrollQuickStart">
            <div className="quickStartSectionOuter">
              <div
                className="eachQuickStart"
                onClick={() => {
                  navigate("/inputeditor");
                }}
              >
                <Card
                  imageProp={createQuickStart}
                  imageText="Blank Document"
                  textSize="15px"
                />
              </div>
              {/* for placeholder */}
              {Array.from({ length: 8 }).map((_, i) => (
                <Card
                  key={i}
                  imageProp={existingQuickStart}
                  imageText="T Shaped"
                  textSize="13px"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ imageProp, imageText, textSize }: templateProps) {
  return (
    <>
      <div className="eachQuickStart">
        <Box
          sx={{
            height: "139px",
            width: "100%",
          }}
        >
          <img src={imageProp} height="100%" width="100%" alt="" />
        </Box>
        <Typography
          sx={{
            color: "#F2F2F2",
            textAlign: "left",
            fontFamily: "Poppins",
            fontSize: textSize,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            marginTop: "10px",
          }}
        >
          {imageText}
        </Typography>
      </div>
    </>
  );
}
