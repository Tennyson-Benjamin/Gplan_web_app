import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import TopNav from "./TopNav";
import { useFloorPlan } from "../hooks/useFloorPlan";
import { useRoomCleanUp } from "../hooks/useRoomCleanup";

const CustomDiv = styled.div`
  .svgDualGraph {
    cursor: move;
    display: block;
    background: #eeeeee;
    width: 100vw;
    height: 100vh;
    background-color: #f2f7fc;
  }
  .edge {
    stroke: #000;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: default;
  }
  .drag-line {
    stroke: #000;
    stroke-width: 3px; // Fixed typo here, it should be stroke-width not strokewidth
    stroke-linecap: round; // Fixed typo, it should be stroke-linecap not strokelinecap
    stroke-linejoin: round; // Fixed typo, it should be stroke-linejoin not strokelinejoin
    cursor: default;
  }
  .highlighted {
    stroke: red; /* Highlight color */
    stroke-width: 4px; /* Increase stroke width for visibility */
  }
  .text {
    font-family: sans-serif;
    font-size: 10px;
    z-index: 1000;
  }
  .vertex {
    cursor: pointer;
  }
  .vertex:hover {
    stroke: #333;
    opacity: 0.8;
  }
  .label {
    text-anchor: middle;
    pointer-events: none;
    font-size: 14px;
    stroke: none;
  }
`;

const Graph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const contentGroupRef = useRef<SVGGElement | null>(null);
  const zoomTransform = useRef<d3.ZoomTransform>(d3.zoomIdentity);
  useRoomCleanUp();
  useFloorPlan(svgRef, contentGroupRef, zoomTransform);

  return (
    <div style={{ position: "relative" }}>
      <CustomDiv>
        {
          <svg
            ref={svgRef}
            className="svgDualGraph"
            width={visualViewport?.width}
            height={visualViewport?.height}
            // onClick={drawDragLine}
            // onMouseMoveCapture={extendDragLine}
          ></svg>
        }
        <div
          style={{ position: "fixed", zIndex: 1000, right: "8px", top: "2px" }}
        ></div>
      </CustomDiv>
      <TopNav />
    </div>
  );
};

export default Graph;
