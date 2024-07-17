import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";
import { Button, Buttons } from "../../../common-components/Button";
import { BASE_ADDR } from "../../../config";
import { NameContext } from "./DashBoard";
import axiosInstance from "../../../axiosInstance";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import help from "./../../../assets/inputGraphEditor/help.svg";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
// import LocalStorageService from './services/storage/localstorageservice'
import BottomNav from "./BottomNav";
import { Box } from "@mui/material";

import TopNav from "./TopNav";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchGraphData } from "../../../redux/api/api.graph";
import { AppDispatch, RootState } from "../../../redux/store";
import Node from "./Node";
import Sidebar from "./Sidebar";
import { updateAdd } from "../../../redux/features/room/room.slice";
import {
  updateAddLinks,
  updateAddNodes,
  updateLinks,
  updateNodeLabel,
} from "../../../redux/features/nodes";
import { useSelector } from "react-redux";
import NodeEditor from "./NodeEditor";
import {
  updateNodeEditorClickedNode,
  updateNodeEditorPosition,
  updateShowComponent,
} from "../../../redux/features/nodeEditor/nodeEditor.slice";
import { doLinesIntersect } from "../../../utils/doLinesIntersect";
import { showToast } from "../../../redux/features/toast/toast.slice";
import zIndex from "@mui/material/styles/zIndex";

const CustomDiv = styled.div`
  .svgDualGraph {
    cursor: crosshair;
    display: block;
    background: #eeeeee;
    width: 100vw;
    height: 100vh;
    background-color: #f2f7fc;
  }
  .edge {
    stroke: #1c4c82;
    strokewidth: 3px;
    strokelinecap: round;
    strokelinejoin: round;
    cursor: default;
  }
  .drag-line {
    stroke: #1c4c82;
    strokewidth: 3px;
    strokelinecap: round;
    strokelinejoin: round;
    cursor: default;
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
    font-size: 16px;
    fill: #ffffff;
    stroke: #ffffff;
  }
`;
const GRID_SIZE = 20;
const Graph = () => {
  const RADIUS = 65;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const contentGroupRef = useRef<SVGGElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const showComponent = useSelector(
    (store: RootState) => store.nodeEditorState.showComponent,
  );
  const nodes = useSelector((store: RootState) => store?.nodesState?.nodes);
  const links = useSelector((store: RootState) => store.nodesState?.links);

  const closeNodeEditor = () => {
    dispatch(updateShowComponent(false));
  };

  const [dragging, setDragging] = useState(false);
  const [dragStartNode, setDragStartNode] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);
  const { setResp } = useContext(NameContext);

  function isNodePossible(
    x: number,
    y: number,
    nodes: { id: number; x: number; y: number; label: string; color: string }[],
  ) {
    for (let i = 0; i < nodes?.length; i++) {
      let calc = (nodes[i].x - x) ** 2 + (nodes[i].y - y) ** 2;
      if (calc < (RADIUS * 2) ** 2) return false;
    }
    return true;
  }
  const currentZoom = useRef(d3.zoomIdentity);
  const svg = d3.select(svgRef.current);
  const snapToGrid = (x: number, y: number) => {
    const transformedPoint = currentZoom.current.invert([x, y]);
    return [
      Math.round(transformedPoint[0] / GRID_SIZE) * GRID_SIZE,
      Math.round(transformedPoint[1] / GRID_SIZE) * GRID_SIZE,
    ];
  };

  const zoomBehavior = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 2]) // Example scale extent
    .on("zoom", (event) => {
      console.log("event transform", event.transform);
      currentZoom.current = event.transform;
      console.log(currentZoom.current);
      d3.select(svgRef.current)
        .select(".main-group")
        .attr("transform", event.transform.toString());
      drawGrid(
        d3.select(svgRef.current).select(".grid-group"),
        event.transform,
      ); // Pass the current zoom transform to drawGrid
    });
  useEffect(() => {
    console.log("currentZoom", currentZoom);
  }, [currentZoom.current]);

  useEffect(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current).selectAll("*").remove();

    const svgElement: SVGSVGElement = svgRef.current;
    const svg = d3.select(svgElement);

    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;

    const mainGroup = svg.append("g").attr("class", "main-group");

    // Grid group
    const gridGroup = mainGroup.append("g").attr("class", "grid-group");
    drawGrid(gridGroup, d3.zoomIdentity);

    // Content group
    const contentGroup = mainGroup.append("g").attr("class", "content-group");
    update(contentGroup);
    // svg.call("zoom",currentZoom.current)
    contentGroupRef.current = contentGroup.node();

    // Define and apply zoom behavior

    svg.call(zoomBehavior as any).on("dblclick.zoom", null);
    svg.call(zoomBehavior).on("dblclick.zoom", null).on("mousedown.zoom", null);
    svg.on("dblclick", (event: MouseEvent) => {
      event.preventDefault();
      const [x, y] = d3.pointer(event);
      const [snappedX, snappedY] = snapToGrid(x, y);
      const [nodeX, nodeY] = d3.pointer(event, svgRef.current);
      const clickedNode = findNode(nodeX, nodeY);
      let check = isNodePossible(snappedX, snappedY, nodes);
      if (check && nodes.length<16) {




        const id = nodes?.length;
        const label = `${nodes?.length + 1}`;
        const color = "#1C4C82";

        dispatch(
          updateAddNodes({
            id: id,
            x: snappedX,
            y: snappedY,
            label: label,
            color: color,
            width: { max: "none", min: "none" },
            height: { max: "none", min: "none" },
            ratio: { max: "none", min: "none" },
          }),
        );
      }
     
      
      if (clickedNode) {
        nodes.forEach((node, index) => {
          if (node.label?.length === 0) {
            dispatch(
              updateNodeLabel({
                id: index,
                label: `${index + 1}`,
              }),
            );
          }
          
        });
        dispatch(updateNodeEditorClickedNode(clickedNode.id));
        console.log(clickedNode.id);
        dispatch(
          updateNodeEditorPosition({
            top: clickedNode?.y,
            left: clickedNode?.x,
          }),
        );
        dispatch(updateShowComponent(true));
      }
    });
    let dragTimeout: any;

    svg.on("mousedown", (event: MouseEvent) => {
      event.preventDefault();
      const [x, y] = d3.pointer(event, svgRef.current);
      const clickedNode = findNode(x, y);

      if (clickedNode) {
        // Delay setting the dragging state
        dragTimeout = setTimeout(() => {
          setDragging(true);
          setDragStartNode(clickedNode);

          if (contentGroupRef.current) {
            drawDragLine(
              clickedNode.x,
              clickedNode.y,
              clickedNode.x,
              clickedNode.y,
              d3.select(contentGroupRef.current),
            );
          }
        }, 200); // 200ms delay, adjust as needed
      }
    });

    svg.on("mousemove", (event: MouseEvent) => {
      event.preventDefault();
      if (dragging && dragStartNode) {
        const [x, y] = d3.pointer(event, svg.node());
        const [snappedX, snappedY] = snapToGrid(x, y);
        if (contentGroupRef.current) {
          drawDragLine(
            dragStartNode.x,
            dragStartNode.y,
            snappedX,
            snappedY,
            d3.select(contentGroupRef.current),
          );
        }
      }
    });

    svg.on("click", (event: MouseEvent) => {
      event.preventDefault();
      const [nodeX, nodeY] = d3.pointer(event, svgRef.current);
      const clickedNode = findNode(nodeX, nodeY);

      if (clickedNode === undefined) {
        dispatch(updateShowComponent(false));
      }
    });

    svg.on("mouseup", (event: MouseEvent) => {
      clearTimeout(dragTimeout);
      if (dragging && dragStartNode) {
        const [x, y] = d3.pointer(event, svg.node());
        const endNode = findNode(x, y);
        let intersects = false;
        if (endNode && dragStartNode.id !== endNode.id) {
          for (let link of links) {
            const sourceNode = nodes.find((node) => node.id === link.source);
            const targetNode = nodes.find((node) => node.id === link.target);

            if (sourceNode && targetNode) {
              if (
                doLinesIntersect(
                  { x: dragStartNode.x, y: dragStartNode.y },
                  { x: endNode.x, y: endNode.y },
                  { x: sourceNode.x, y: sourceNode.y },
                  { x: targetNode.x, y: targetNode.y },
                )
              ) {
                intersects = true;
                // alert("intersects");
                break;
              }
            }
          }
        }
        console.log("intersects", intersects);
        if (!intersects && endNode && dragStartNode.id !== endNode.id) {
          // Proceed to add the link
          dispatch(
            updateAddLinks({ source: dragStartNode.id, target: endNode.id }),
          );
          console.log(
            "Link added between nodes:",
            dragStartNode.id,
            endNode.id,
          );
        } else {
          console.log("Intersecting links are not allowed.");
          dispatch(
            showToast({
              message: "Intersecting edges are not allowed.",
              type: "error",
            }),
          );
        }

        removeDragLine(contentGroup);
        setDragging(false);
        setDragStartNode(null);
      }
    });
  }, [nodes, links, dragging, dragStartNode]);

  function findNode(x: number, y: number) {
    return nodes?.find((node) => {
      const dx = x - node.x;
      const dy = y - node.y;
      return Math.sqrt(dx * dx + dy * dy) < RADIUS;
    });
  }

  function drawDragLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  ) {
    removeDragLine(contentGroup);
    contentGroup
      .append("line")
      .attr("class", "drag-line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", "#888") // Set the stroke color
      .attr("strokeWidth", 3) // Set the stroke width
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");
  }

  function removeDragLine(
    contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  ) {
    contentGroup.select(".drag-line").remove();
  }

  const drawGrid = (
    gridGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
    zoomTransform: d3.ZoomTransform,
  ) => {
    if (!svgRef.current) return;
    const width = +svgRef.current.clientWidth;
    const height = +svgRef.current.clientHeight;
    const GRID_SIZE = 20;

    // Clear the previous grid
    gridGroup.selectAll("*").remove();

    // Calculate the visible area in the original coordinate system
    const visibleWidth = width / zoomTransform.k;
    const visibleHeight = height / zoomTransform.k;

    // Calculate the top-left corner of the visible area
    const startX = -zoomTransform.x / zoomTransform.k;
    const startY = -zoomTransform.y / zoomTransform.k;

    // Draw the grid lines
    for (
      let x = Math.floor(startX / GRID_SIZE) * GRID_SIZE;
      x <= startX + visibleWidth;
      x += GRID_SIZE
    ) {
      for (
        let y = Math.floor(startY / GRID_SIZE) * GRID_SIZE;
        y <= startY + visibleHeight;
        y += GRID_SIZE
      ) {
        gridGroup
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 1) // Radius of dots
          .attr("fill", "#ccc");
      }
    }
  };
  const deleteEdge = (sourceId: any, targetId: any) => {
    const updatedLinks = links.filter(
      (link) => link.source !== sourceId || link.target !== targetId,
    );

    dispatch(updateLinks(updatedLinks));
    if (contentGroupRef.current) {
      update(d3.select(contentGroupRef.current));
    }
  };

  function update(
    contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  ) {
    const linkSelection = contentGroup
      .selectAll<SVGLineElement, any>(".edge")
      .data(links);
    linkSelection
      .enter()
      .append("line")
      .attr("class", "edge")
      .merge(linkSelection)
      .attr("x1", (d) => {
        const sourceNode = nodes?.find((node) => node.id === d.source)!;
        return sourceNode.x;
      })
      .attr("y1", (d) => {
        const sourceNode = nodes?.find((node) => node.id === d.source)!;
        return sourceNode.y;
      })
      .attr("x2", (d) => {
        const targetNode = nodes?.find((node) => node.id === d.target)!;
        return targetNode.x;
      })
      .attr("y2", (d) => {
        const targetNode = nodes?.find((node) => node.id === d.target)!;
        return targetNode.y;
      })
      .attr("strokeWidth", 3) // Set the stroke width
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .on("click", (event, d) => {
        // Prevent triggering click events on other elements
        event.stopPropagation();

        // Call deleteEdge with the source and target ids
        deleteEdge(d.source, d.target);
      });

    linkSelection.exit().remove();

    const nodeSelection = contentGroup
      .selectAll<SVGCircleElement, any>(".vertex")
      .data(nodes, (d: any) => d.id);

    nodeSelection
      .enter()
      .append("circle")
      .attr("class", "vertex")
      .attr("r", RADIUS)
      .merge(nodeSelection)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .style("fill", (d) => d.color)
      .on("dblclick", (event, d) => {
        /* console.log("Node double-clicked", d); */
      });

    nodeSelection.exit().remove();

    const labelSelection = contentGroup
      .selectAll<SVGTextElement, any>(".label")
      .data(nodes, (d: any) => d.id);
    labelSelection
      .enter()
      .append("text")
      .attr("class", "label")
      .merge(labelSelection)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .attr("text-anchor", "middle")
      .style("font-size", (d) => {
        // Check if label length exceeds 20 characters
        if (d.label?.length < 16) {
          return "10px"; // Add a line break
        } else {
          alert("hoho");
          return "16px";
        }
      })
      .text((d) => d.label);

    labelSelection.exit().remove();
  }

  useEffect(() => {
    nodes.forEach((node, index) => {
      if (node.label?.length === 0) {
        dispatch(
          updateNodeLabel({
            id: index,
            label: `${index + 1}`,
          }),
        );
      }
    });
  }, [showComponent]);

  return (
    <div style={{ position: "relative" }}>
      {showComponent === true && (
        <div style={{ zIndex: 2000, position: "fixed" }}>
          <NodeEditor onClose={closeNodeEditor} />
        </div>
      )}

      <CustomDiv style={{ zIndex: 100 }}>
        <svg
          ref={svgRef}
          className="svgDualGraph"
          width={visualViewport?.width}
          height={visualViewport?.height}
        />
      </CustomDiv>
      <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <BottomNav sidebarOpen={sidebarOpen} />
      <div
        style={sidebarOpen ? {
          position: "fixed",
          zIndex: 1000,
          right: "8px",
          top: "2px",
          transition: 'all .25s linear'
        } : {
          position: "fixed",
          zIndex: 1000,
          right: '-30%',
          top: "2px",
          transition: 'all .25s linear'
        }}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default Graph;
