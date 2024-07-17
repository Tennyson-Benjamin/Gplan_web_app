import React, { useState } from "react";
import { Box, Typography, Tooltip, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetNodesState } from "../../../redux/features/nodes";
import { resetRoomState } from "../../../redux/features/room/room.slice";
import help from "./../../../assets/inputGraphEditor/help.svg";

interface BottomNavProps {
  sidebarOpen: boolean;
}

export default function BottomNav({ sidebarOpen }: BottomNavProps) {
  const dispatch = useDispatch();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleReload = () => {
    console.log("refresh triggered");
    dispatch(resetNodesState());
    dispatch(resetRoomState());
    setButtonClicked(!buttonClicked); // Toggle button click state
  };

  const tooltipContent = (
    <Box
      sx={{
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: "#FFFFFF",
        boxShadow: 3,
        minWidth: "250px",
      }}
    >
      <Typography
        sx={{
          color: "#111111",
          textAlign: "left",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "20px",
          marginBottom: ".75rem",
          whiteSpace: "nowrap",
        }}
      >
        Tooltip Content
      </Typography>
      {/* Add more tooltip content as needed */}
    </Box>
  );

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        right: sidebarOpen ? "15px" : "calc(50vw - 205px)", // Adjust right position based on sidebarOpen
        bottom: "15px",
        transition: "right 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip title={tooltipContent} arrow placement="top">
          <div style={{ zIndex: 100, cursor: "pointer", position: "relative" }}>
            <img src={help} height="40px" width="40px" alt="Help icon" />
            <Typography
              sx={{
                pr: "15px",
                color: "#1C4C82",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Help
            </Typography>
          </div>
        </Tooltip>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#ED4337",
            color: "#ED4337",
            padding: "12px 20px",
            textTransform: "capitalize",
            backgroundColor: "#FDEDEC",
            fontWeight: 500,
            "&:hover": {
              borderColor: "#ED4337",
              backgroundColor: "#F9CACA",
            },
          }}
          onClick={handleReload}
        >
          Reset & Clear All Nodes
        </Button>
      </Box>
    </div>
  );
}
