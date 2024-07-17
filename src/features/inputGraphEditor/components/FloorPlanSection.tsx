import React, { useEffect } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import plan1 from "../../../assets/inputGraphEditor/plan1.svg";
import plan2 from "../../../assets/inputGraphEditor/plan2.svg";
import { CustomDiv } from "./Sidebar";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { GRID_SNAP } from "../../../config";
import Dropdown from "./Dropdown";
import DrawingBoard3 from "./DrawingBoard3";
import DrawingBoard4 from "./DrawingBoard4";
// import DrawingBoard from "./DrawingBoard";
interface componentProps {
  isDimensioned: boolean;
}
const FloorPlanSection: React.FC<componentProps> = (props) => {
  const { floorPlans, loading, error } = useSelector(
    (state: RootState) => state.graph,
  );

  return (
    <Box id="test" sx={{ flex: 15, position: "relative" }}>
      <CustomDiv>
        <Box
          className="container2 plan"
          sx={{ position: "absolute", top: "0", bottom: 0, left: 0, right: 0 }}
        >
          {!props.isDimensioned && <Dropdown />}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              flex: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
               
                
              }}
            >
              <div
                className="head" /* style={{ position: "relative", zIndex: 1 }} */
                
              >
                Select a Floor Plan
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
               
              </Box>
            </Box>
          </Box>

          {/* Plan */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 15,
            }}
          >
            {!props.isDimensioned && <DrawingBoard3 />}
            {props.isDimensioned && <DrawingBoard4 />}
          </Box>
        </Box>
      </CustomDiv>
    </Box>
  );
};

export default FloorPlanSection;
