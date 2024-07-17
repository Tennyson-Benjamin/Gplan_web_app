//@ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Box, Typography } from "@mui/material";
import { dispatch } from "d3";
import { setIndex } from "../../../redux/features/graph";

// Please enter the height and with of your parent container in the size prop in terms
//of viewport values (vh and vw) scale to a factor of 1. FOR RESPONSIVENESS
interface DrawingBoardProps {
  size?: { height: number; width: number };
  snap: number;
}

export default function DrawingBoard({
  size = { height: 600, width: 400 },
  snap,
}: DrawingBoardProps) {
  const [fpDim, setfpDim] = useState({
    width: size.width * window.innerHeight,
    height: size.height * window.innerHeight,
  });
  const canRef = useRef<fabric.Canvas | null>(null);
  const [listRFP, setListRFP] = useState<any[]>([]);
  const indexRFP = useSelector((state: RootState) => state.graph.index);
  const [gridIsOn, setGridIsOn] = useState<boolean>(true);
  const { floorPlans } = useSelector((state: RootState) => state.graph);
  const dispatch = useDispatch<AppDispatch>();

  const loadRFP = () => {
    if (!listRFP.length) return;
    resetDrawBoard();

    var objs = []; // This will hold both rectangles and their corresponding text objects
    const rects = listRFP[indexRFP];

    rects.forEach((rdata) => {
      // Define the rectangle
      const rect = new fabric.Rect({
        left: Number(rdata["left"] * 1.5) + Number(snap * 3),
        top: Number(rdata["top"] * 1.5) + Number(snap * 3),
        width: Number(rdata["width"] * 1.5),
        height: Number(rdata["height"] * 1.5),
        fill: "#fff",
        selectable: false,
        stroke: "black",
        strokeWidth: 1.5,
      });
     
     
      
      // Define the label text
      const text = new fabric.Text((rdata["label"]), {
        fontSize: 14,
        originX: "center",
        originY: "center",
        fill: "black", // White color for the text
        selectable: false,
      });

      // Calculate the centered position for the text
      const rectCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      text.set({
        left: rectCenter.x,
        top: rectCenter.y,
      });

      // Group the rectangle and text to keep them together
      const group = new fabric.Group([rect, text], {
        left: rect.left,
        top: rect.top,
      });

      objs.push(group); // Add the group to the array
    });

    // Add all objects to the canvas
    if (canRef.current !== null) {
      objs.forEach((obj) => {
        canRef.current.add(obj);
      });

      // Adjust the view as needed, for example centering the group of objects
      const group = new fabric.Group(objs, {
        originX: "center",
        originY: "center",
      });

      const canvasCenter = canRef.current.getCenter();
      group.set({
        left: canvasCenter.left,
        top: canvasCenter.top,
      });

      canRef.current.add(group);
      group.setCoords();

      // You might need to adjust scaling here to fit everything within the canvas view
    }
  };

  const resetDrawBoard = () => {
    // Check: https://stackoverflow.com/questions/11829786/delete-multiple-objects-at-once-on-a-fabric-js-canvas-in-html5
    const rects = canRef.current
      ?.getObjects()
      .filter((obj: any) => obj["type"] === "group");
    rects?.forEach((rect: any) => {
      canRef.current?.remove(rect);
    });
  };

  const prevRFP = () => {
    if (!listRFP.length) return;
    // dispatch(setIndexRFP((indexRFP - 1 + listRFP.length) % listRFP.length));
    dispatch(setIndex((indexRFP - 1 + listRFP.length) % listRFP.length));
  };

  const nextRFP = () => {
    if (!listRFP.length) return;
    dispatch(setIndex((indexRFP + 1) % listRFP.length));
  };

  useEffect(() => {
    if (canRef.current) {
      canRef.current.dispose();
    }

    // Create a new fabric.Canvas instance
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "black",
      width: fpDim.width,
      height: fpDim.height,
      selection: false,
    });
    canRef.current = canvas;
  }, [fpDim.width, fpDim.height]);

  useEffect(() => {
    if (floorPlans) {
      setListRFP(floorPlans);
      dispatch(setIndex(0));
    }
  }, [floorPlans, dispatch]);
  useEffect(() => {
    loadRFP();
  }, [indexRFP, listRFP]);

  useEffect(() => {
    const handleResize = () => {
      setfpDim({
        width: size.width * window.innerWidth,
        height: size.height * window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size.width, size.height]);
  // Setup the entire canvas grid once application starts
  useEffect(() => {
    if (canRef.current) {
      canRef.current.dispose();
    }

    // Create a new fabric.Canvas instance
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "#fff",
      width: fpDim.width,
      height: fpDim.height,
      selection: false,
    });
    canRef.current = canvas;
    // drawGrid(canvas);
  }, []);

  // Automatically, receive RFPs if socket emits message on event 'load'
  useEffect(() => {
    if (!floorPlans) return;

    // socket.on('load', (recv: any) => {
    try {
      setListRFP(floorPlans);
      dispatch(setIndex(0));
    } catch (err) {
      console.log(err);
    }
    // });
  }, [floorPlans]);

  // Render loadRFP on every time indexRFP or listRFP changes
  useEffect(() => {
    loadRFP();
  }, [indexRFP, listRFP]);

  useEffect(() => {
    const handleResize = () => {
      setfpDim({
        width: size.width * window.innerWidth,
        height: size.height * window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canRef.current != undefined) {
      canRef.current.setDimensions(fpDim);
      const canvCenter = canRef.current.getCenter();
      canRef.current.getObjects()[0]?.set("left", canvCenter.left);
      canRef.current.getObjects()[0]?.set("top", canvCenter.top);
      canRef.current.getObjects()[0]?.scaleToHeight(
        // @ts-ignore: Object is possibly 'null'.
        canRef.current.getObjects()[0].height > fpDim.height ||
          // @ts-ignore: Object is possibly 'null'.
          canRef.current.getObjects()[0].width > fpDim.width
          ? fpDim.height
          : canRef.current.getObjects()[0].height,
      );
    }

    if (
      // @ts-ignore: Object is possibly 'null'.
      canRef.current.getObjects()[0]?.width *
        // @ts-ignore: Object is possibly 'null'.
        (fpDim.height / canRef.current?.getObjects()[0]?.height) >
      fpDim.width
    ) {
      // @ts-ignore: Object is possibly 'null'.
      canRef.current.getObjects()[0]?.scaleToWidth(fpDim.width);
    }
  }, [fpDim]);

  return (
    <div>
      <div id="canvas-parent-div" style={{ height: `${size.height * 100}vh` }}>
        <canvas id="canvas"></canvas>
      </div>
      {floorPlans !== null && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={prevRFP}
            >
              <path
                d="M19 12.6323H5"
                stroke="#1C4C82"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5.63232L5 12.6323L12 19.6323"
                stroke="#1C4C82"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {listRFP.length > 0 ? indexRFP + 1 : 0} / {listRFP.length}{" "}
          </Typography>
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={nextRFP}
            >
              <path
                d="M5 12.6323H19"
                stroke="#1C4C82"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5.63232L19 12.6323L12 19.6323"
                stroke="#1C4C82"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>
      )}
    </div>
  );
}
  
