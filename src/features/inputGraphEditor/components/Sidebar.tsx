import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import regen from "../../../assets/inputGraphEditor/regenerate.svg";
import cont from "../../../assets/inputGraphEditor/continue.svg";
import CorridorSection from "./CorridorSection";
import ExportSection from "./ExportSection";
import FloorPlanSection from "./FloorPlanSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphData } from "../../../redux/api/api.graph";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { setCleanUpRequired } from "../../../redux/features/appState";
import Dropdown from "./Dropdown";
import { showToast } from "../../../redux/features/toast/toast.slice";

const MainDiv = styled.div`
  .sidebar {
    width: 28vw;
    display: flex;
    justify-content: space-between;
    height: 100vh;
  }

  .btn {
    padding: 16px 8px;
    font-weight: 600;
    align-items: center;
    border-radius: 8px;
    text-transform: capitalize;
    gap: 4px;
  }

  .btn-text {
    font-family: Poppins !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 500 !important;
    line-height: 26.4px;
  }
`;

const CustomDiv = styled.div`
  .container {
    width: 100%;
    padding: 16px;
    display: flex;
    background: #ffffff;
    font-family: Poppins;
    gap: 16px;
    border-radius: 8px;
  }

  .container2 {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    background: #ffffff;
    font-family: Poppins;
    gap: 16px;
    border-radius: 8px;
  }

  .corridor,
  .plan {
    flex-direction: column;
  }

  .export,
  .btns {
    flex-direction: row;
  }

  .btns {
    padding: 0;
    background: none;
  }

  .plan,
  .export {
    padding: 16px 32px;
  }

  .btns {
    gap: 8px;
  }

  .icon {
    width: 36px;
  }

  .header {
    font-size: 14px !important;
    color: #1c4c82;
    font-weight: 500;
    &:hover {
      cursor: pointer;
    }
  }

  p {
    font-size: 12px;
    margin: 0;
    color: #879fba;
  }

  .setting {
    text-decoration: underline;
  }

  .arrow {
    width: 24px;
  }

  .line {
    width: 100%;
    height: 1px;
    background: #f2f7fc;
  }

  .head {
    font-size: 18px;
    line-height: 20px;
    font-weight: 500 !important;
    color: #828282;
  }

  .para {
    font-size: 12px;
    line-height: 12px;
    color: #bdbdbd;
  }

  .MuiInputBase-root {
    padding: 0;
  }

  .MuiSelect-select {
    padding: 8px;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const nodes = useSelector((state: RootState) => state.nodesState.nodes);
  const links = useSelector((state: RootState) => state.nodesState.links);

  const shape = useSelector((state: RootState) => state.shapeState.shape);
  const dispatch = useDispatch<AppDispatch>();
  const [isDimensioned, setIsDimensioned] = useState(false);

  const handleToggle = (check: boolean) => {
    if (check) {
      setIsDimensioned(true);
      return;
    }
    setIsDimensioned(false);
  };

  const handleClick = () => {
    switch (shape) {
      case "irregular":
        emitDataIrregular();
        break;
      case "rectangular":
        emitDataRectangular();
        break;
      case "lshape":
        emitDataLshape();
        break;
      case "ushape":
        emitDataUshape();
        break;
      case "tshape":
        emitDataTshape();
        break;
      case "zshape":
        emitDataZshape();
        break;
      case "staircase":
        emitDataStaircase();
        break;

      default:
        break;
    }
    dispatch(setCleanUpRequired(true));
  };

  let emitDataIrregular = () => {
    // No JSON Stringify needed when using emit
    let graphData = {
      multiple: true,
      rectangular: false,
      nodes: nodes,
      edges: links,
    };
    // axios.post(BASE_ADDR + "/irregular", graphData).then((response) => {
    //   let resp = response.data.floorplans;
    //   console.log(resp);
    //   setResp(resp);
    // });

    dispatch(fetchGraphData({ graphData, type: "irregular" }));
  };

  let emitDataRectangular = () => {
    // No JSON Stringify needed when using emit
    let graphData = {
      multiple: true,
      rectangular: false,
      nodes: nodes,
      edges: links,
    };
    // axios.post(BASE_ADDR + "/rectangular", graphData).then((response) => {
    //   let resp = response.data.floorplans;
    //   console.log(resp);
    //   setResp(resp);
    // });
    dispatch(fetchGraphData({ graphData, type: "rectangular" }));
  };

  let emitDataLshape = () => {
    // No JSON Stringify needed when using emit
    let graphData = {
      multiple: false,
      rectangular: false,
      nodes: nodes,
      edges: links,
    };
    // axios.post(BASE_ADDR + "/lshape", graphData).then((response) => {
    //   let resp = response.data.floorplans;
    //   console.log(resp);
    //   setResp(resp);
    // });
    dispatch(fetchGraphData({ graphData, type: "lshape" }));
  };

  let emitDataUshape = () => {
    // No JSON Stringify needed when using emit
    // let graphData = {
    //   multiple: false,
    //   rectangular: false,
    //   nodes: nodes,
    //   edges: links,
    // };
    console.log("emit u called");
    dispatch(
      showToast({
        message: "Coming Soon!",
        type: "error",
      }),
    );
    // dispatch(fetchGraphData({ graphData, type: "ushape" }));
  };

  let emitDataTshape = () => {
    // No JSON Stringify needed when using emit
    let graphData = {
      multiple: false,
      rectangular: false,
      nodes: nodes,
      edges: links,
    };
    // axios.post(BASE_ADDR + "/tshape", graphData).then((response) => {
    //   let resp = response.data.floorplans;
    //   console.log(resp);
    //   setResp(resp);
    // });
    dispatch(fetchGraphData({ graphData, type: "tshape" }));
  };

  let emitDataZshape = () => {
    let graphData = {
      multiple: false,
      rectangular: false,
      nodes: nodes,
      edges: links,
    };
    // axios.post(BASE_ADDR + "/zshape", graphData).then((response) => {
    //   let resp = response.data.floorplans;
    //   // console.log(resp);
    //   setResp(resp);
    // });
    dispatch(fetchGraphData({ graphData, type: "zshape" }));
  };

  // let resetBoard = () => {
  //   setLinks([]);
  //   setNodes([]);
  //   setDragging(false);
  //   setDragStartNode(null);
  // };
  let emitDataStaircase = () => {
    // No JSON Stringify needed when using emit
    let graphData = {
      multiple: false,
      rectangular: false,
      nodes: nodes,
      edges: links,
    };
    // axios.post(BASE_ADDR + "/staircaseshape", graphData).then((response) => {
    //   let resp = response.data.floorplans;
    //   console.log(resp);
    //   setResp(resp);
    // });
    dispatch(fetchGraphData({ graphData, type: "staircaseshape" }));
  };
  useEffect(() => {
    /* console.log(nodes);
    console.log(links); */
  }, [nodes, links]);
  return (
    <>
      <Box
        sx={{
          width: "30vw",
          display: "flex",
          /* justifyContent: "space-between", */
          flexDirection: "column",
          gap: "8px",
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "11px",
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        }}
      >
        <Box
          sx={{
            flex: 1.3,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#FFF",
            alignItems: "center",
            border: "none",
            borderRadius: "8px",
          }}
        >
          <button
            onClick={() => handleToggle(true)}
            style={{
              width: "45%",
              height: "75%",
              marginLeft: "12px",
              fontFamily: "Poppins",
              fontSize: "14.5px",
              fontWeight: "500",
              lineHeight: "20px",
              backgroundColor: isDimensioned ? "#1C4C82" : "#FFF",
              outline: "none",
              border: "none",
              borderRadius: "4px",
              color: isDimensioned ? "#FFF" : "#111111",
            }}
          >
            Dimensioned Floorplans
          </button>
          <button
            onClick={() => handleToggle(false)}
            style={{
              width: "45%",
              height: "auto",
              marginRight: "12px",
              fontFamily: "Poppins",
              fontSize: "15px",
              fontWeight: "500",
              lineHeight: "24px",
              backgroundColor: !isDimensioned ? "#1C4C82" : "#FFF",
              outline: "none",
              border: "none",
              paddingTop:"2px",
              borderRadius: "4px",
              color: !isDimensioned ? "#FFF" : "#111111",
              
            }}
          >
            Dimensionless Floorplans
          </button>
        </Box>
        {/* <CorridorSection /> */}
        <FloorPlanSection isDimensioned={isDimensioned} />

        {/* Buttons */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <ExportSection />

          <CustomDiv>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "53%" }}>
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#1C4C82",
                    border: "2px solid #1C4C82",
                    borderRadius: "8px",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                    width: "100%",
                    padding: "12px 8px",
                  }}
                  onClick={handleClick}
                >
                  Generate Floorplans
                  <img src={regen} alt="" />
                </button>
              </div>
              <div style={{ width: "45%" }}>
                <button
                  style={{
                    backgroundColor: "#1C4C82",
                    color: "#FFF",
                    fontFamily: "Poppins",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    padding: "12px 8px",
                    width: "100%",
                    boxShadow: "none",
                  }}
                  onClick={() => {
                    navigate("/outputeditor");
                  }}
                >
                  Edit Floorplan
                  <img src={cont} alt="" />
                </button>
              </div>
            </div>
          </CustomDiv>
        </Box>
      </Box>
    </>
  );
};

export { CustomDiv };
export default Sidebar;
