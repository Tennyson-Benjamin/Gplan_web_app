import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import yourDocumentPlaceholder from "../../../assets/homepage/yourDocumentPlaceholder.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  setRooms,
} from "../../../redux/features/appState";

interface DocCardProps {
  id: number;
  title: string;
  date: string;
  imageSrc: string;
}

interface Document {
  id: number;
  name: string;
  date_created: string;
  date_modified: string;
}

interface ApiResponse {
  documents: Document[];
}

function formatISODate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}



function DocCard({ id, title, date, imageSrc }: DocCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const onClickDoc = (id: number) => {
    // Retrieve the token from wherever you store it
    const token = localStorage.getItem("access_token");
  
    // Define the URL you want to make a GET request to
    const url = `https://api.gplan.in/api/document/${id}`;
  
    // Make a GET request using Axios with authorization
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        // Handle successful response
        let temp = response.data;
        console.log(temp);
        //dispatch(setRooms(response.data.floorplans[0].rooms));
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <Grid item xs={2.4}>
      <Box
        width="100%"
        onClick={()=>{onClickDoc(id)}}
        sx={{ overflow: "", "&:hover": { cursor: "pointer" } }}
      >
        <img src={imageSrc} height="100%" width="100%" alt={title} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "-10px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              mr: "16px",
              color: "#1C4C82",
              textAlign: "left",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              mb: "3px",
              mt: "16px",
            }}
          >
            {title}
          </Typography>
          <MoreHorizIcon htmlColor="#1C4C82" fontSize="small" />
        </Box>
        <Typography
          sx={{
            mr: "10px",
            color: "#7794B4",
            textAlign: "left",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "15px",
          }}
        >
          {date}
        </Typography>
      </Box>
    </Grid>
  );
}

export default function YourDocuments() {
  const [floorplanDetails, setfloorplanDetails] = useState<ApiResponse | null>(
    null,
  );

  useEffect(() => {
    // Retrieve the token from wherever you store it
    const token = localStorage.getItem("access_token");

    // Define the URL you want to make a GET request to
    const url = "https://api.gplan.in/api/document/";

    // Make a GET request using Axios with authorization
    axios
      .get<ApiResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        // Handle successful response
        setfloorplanDetails(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  }, []);

  return (
    <Grid
      sx={{
        backgroundColor: "#fff",
        pl: "7%",
        pr: "7%",
        pb: "32px",
        mb: "36px",
        mt: "16px",
      }}
    >
      <Box>
        <Grid container spacing={6}>
          {floorplanDetails &&
            floorplanDetails.documents.map((doc) => (
              <DocCard
                key={doc.id}
                id={doc.id}
                title={doc.name}
                date={formatISODate(doc.date_modified)}
                imageSrc={yourDocumentPlaceholder} //replace this with actual image src
              />
            ))}
        </Grid>
      </Box>
    </Grid>
  );
}
