import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import no_img from "../resources/no-img.jpg";

function Section2() {
  let height = window.innerHeight;
  height = height + 92;

  const CardContentNoPadding = styled(CardContent)({
    padding: 16,
    "&:last-child": {
      paddingBottom: 16,
    },
  });

  return (
    <Grid
      container
      rowSpacing={8}
      columnSpacing={16}
      sx={{
        padding: "50px 64px",
      }}
    >
      <Grid item sm={4} xs={12}>
        <Card
          sx={{ boxShadow: "0", backgroundColor: "#DDD", borderRadius: "0px" }}
        >
          <CardContentNoPadding>
            <CardMedia
              component="img"
              height="150px"
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
      </Grid>
      <Grid item sm={4} xs={12}>
        <Card
          sx={{ boxShadow: "0", backgroundColor: "#DDD", borderRadius: "0px" }}
        >
          <CardContentNoPadding>
            <CardMedia
              component="img"
              height="150px"
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
      </Grid>
      <Grid item sm={4} xs={12}>
        <Card
          sx={{ boxShadow: "0", backgroundColor: "#DDD", borderRadius: "0px" }}
        >
          <CardContentNoPadding>
            <CardMedia
              component="img"
              height="150px"
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
      </Grid>
      <Grid item sm={4} xs={12}>
        <Card
          sx={{ boxShadow: "0", backgroundColor: "#DDD", borderRadius: "0px" }}
        >
          <CardContentNoPadding>
            <CardMedia
              component="img"
              height="150px"
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
      </Grid>
      <Grid item sm={4} xs={12}>
        <Card
          sx={{ boxShadow: "0", backgroundColor: "#DDD", borderRadius: "0px" }}
        >
          <CardContentNoPadding>
            <CardMedia
              component="img"
              height="150px"
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
      </Grid>
      <Grid item sm={4} xs={12}>
        <Card
          sx={{ boxShadow: "0", backgroundColor: "#DDD", borderRadius: "0px" }}
        >
          <CardContentNoPadding>
            <CardMedia
              component="img"
              height="150px"
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
      </Grid>
    </Grid>
  );
}

export default Section2;
