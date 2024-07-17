import { Box, Divider } from "@mui/material";
import React, { useEffect } from "react";
import Room from "./Room";
import { CustomDiv } from "./Sidebar";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

function CorridorSection() {
  const dispatch = useDispatch<AppDispatch>();
  const addedRooms = useSelector((state: RootState) => state.roomState.isAdded);
  const notAddedRooms = useSelector(
    (state: RootState) => state.roomState.notAdded,
    ); 
    
  const nodes = useSelector((state: RootState) => state.nodesState.nodes)

  return (
    <CustomDiv>
      <Box className="container corridor">
        <Dropdown />
        <Divider />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "0 16px",
          }}
        >
          {/* Corridor Header */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <div className="head">Corridor</div>
            <p className="para">
              Add a central corridor connecting these different rooms
            </p>
          </Box>
          {/* Corridor InputBox */}
          <Box
            sx={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1.5px solid #E0E0E0",
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              flexWrap: "wrap",
              height: "11vh",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#BDBDBD",
                borderRadius: "20px",
              },
            }}
          >
            {addedRooms.map((item) => (
              <Room
                key={item.id}
                id={item.id}
                name={item.name}
                isAdded={true}
              />
            ))}
          </Box>
          {/* Corridor Options */}
          <Box
            sx={{
              width: "100%",
              padding: "0 12px",
              borderRadius: "16px",
              gap: "8px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              height: "8vh",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#BDBDBD",
                borderRadius: "20px",
              },
            }}
          >
            {notAddedRooms.map((item) => (
              <Room
                key={item.id}
                id={item.id}
                name={item.name}
                isAdded={false}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </CustomDiv>
  );
}

export default CorridorSection;
