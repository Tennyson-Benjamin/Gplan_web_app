import { Box, Fade, Slide, Typography, Zoom } from "@mui/material";
import React from "react";
import { useInView } from "react-intersection-observer";

function Section3() {
  const { ref: imageRef, inView: imageIsVisible } = useInView({
    triggerOnce: true,
  });

  return (
    <Box
      sx={{
        backgroundColor: "#B30277",
        height: `${window.innerHeight - 92}px`,
        display: "flex",
        alignItems: "center",
        margin: "0px",
      }}
    >
      <Zoom in={imageIsVisible} timeout={500} easing="ease-in-out">
        <Box
          ref={imageRef}
          sx={{
            backgroundColor: "#DDD",
            height: `${(window.innerHeight - 92) / 1.5}px`,
            flex: "1",
            marginLeft: "64px",
          }}
        ></Box>
      </Zoom>

      <Box
        sx={{
          height: `${(window.innerHeight - 92) / 1.5}px`,
          flex: "1",
          marginRight: "64px",
          overflow: "hidden",
        }}
      >
        <Slide
          in={imageIsVisible}
          direction="left"
          timeout={450}
          easing="ease-in-out"
        >
          <Box>
            <Typography
              marginLeft="32px"
              fontWeight="550"
              variant="h3"
              gutterBottom
            >
              About
            </Typography>
            <Typography
              marginLeft="32px"
              color="white"
              variant="subtitle1"
              gutterBottom
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
              sint, hic velit excepturi rem eum explicabo quidem alias?
              Perferendis esse maxime rerum molestiae at ex deleniti provident
              porro eligendi cupiditate!
            </Typography>
            <Typography
              marginLeft="32px"
              color="white"
              variant="subtitle1"
              gutterBottom
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
              sint, hic velit excepturi rem eum explicabo quidem alias?
              Perferendis esse maxime rerum molestiae at ex deleniti provident
              porro eligendi cupiditate!
            </Typography>
            <Typography
              marginLeft="32px"
              color="white"
              variant="subtitle1"
              gutterBottom
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
              sint, hic velit excepturi rem eum explicabo quidem alias?
              Perferendis esse maxime rerum molestiae at ex deleniti provident
              porro eligendi cupiditate!
            </Typography>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}

export default Section3;
