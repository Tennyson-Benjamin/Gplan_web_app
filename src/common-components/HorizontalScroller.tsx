import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardActions,
  Button,
  CardContent,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import no_img from "../resources/no-img.jpg";

function HorizontalScroller() {
  const CardContentNoPadding = styled(CardContent)({
    padding: 16,
    "&:last-child": {
      paddingBottom: 16,
    },
  });
  return (
    <>
      <Box
        sx={{
          marginLeft: "64px",
          display: "flex",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box sx={{ minWidth: "25%", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 1
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
        <Box sx={{ minWidth: "25%", marginLeft: "25px", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 2
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
        <Box sx={{ minWidth: "25%", marginLeft: "25px", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 3
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
        <Box sx={{ minWidth: "25%", marginLeft: "25px", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 4
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
        <Box sx={{ minWidth: "25%", marginLeft: "25px", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 5
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
        <Box sx={{ minWidth: "25%", marginLeft: "25px", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 6
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
        <Box sx={{ minWidth: "25%", marginLeft: "25px", marginBottom: "50px" }}>
          <Card
            sx={{
              boxShadow: "0",
              backgroundColor: "#DDD",
              borderRadius: "0px",
            }}
          >
            <CardContentNoPadding>
              <CardMedia
                component="img"
                height="100px"
                image={no_img}
                sx={{ borderRadius: "2px" }}
              />
              <Typography variant="h5" marginTop="8px">
                Feature 7
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <Button size="small" sx={{ marginLeft: "-3px" }}>
                  Learn More
                </Button>
              </CardActions>
            </CardContentNoPadding>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default HorizontalScroller;
