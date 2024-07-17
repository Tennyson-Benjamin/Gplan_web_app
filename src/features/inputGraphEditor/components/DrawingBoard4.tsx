import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { FloorPlanItem, setIndex } from "../../../redux/features/graph";
import { Box, Typography } from "@mui/material";
import svgUrl from "../../../assets/inputGraphEditor/eye.svg";
import svgUrl2 from "../../../assets/inputGraphEditor/close.svg";

const DrawingBoard4: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const popUpRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [listRFP, setListRFP] = useState<FloorPlanItem[][]>([]);
  const indexRFP = useSelector((state: RootState) => state.graph.index);
  const [gridIsOn, setGridIsOn] = useState<boolean>(true);
  const { floorPlans } = useSelector((state: RootState) => state.graph);
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const loadRFP = () => {
    if (!listRFP.length) return;
    resetDrawBoard();

    var objs: any = []; // This will hold both rectangles and their corresponding text objects
    const rects = listRFP[indexRFP];
    console.log("rectangles", rects);

    rects.forEach((rdata: FloorPlanItem) => {
      // Define the rectangle
      const rect = new fabric.Rect({
        left: Number(Number(rdata["left"] * 1.5) + Number(40 * 3)),
        top: Number(rdata["top"] * 1.5) + Number(40 * 3),
        width: Number(rdata["width"] * 1.5),
        height: Number(rdata["height"] * 1.5),
        fill: "#fff",
        selectable: false,
        stroke: "black",
        strokeWidth: 1.5,
      });
      // Calculate the centered position for the text
      const rectCenter = {
        x: rect.left! + rect.width! / 2,
        y: rect.top! + rect.height! / 2,
      };

      // Define the label text
      const reLabel = (data: string) => {
        const match = data.match(/^\d+/); // Match digits at the beginning of the string
        return match ? match[0] : ''; // Return the matched digits or an empty string
      };
      const text = new fabric.Text(reLabel(rdata["label"]), {
        fontSize: 16,
        originX: "center",
        originY: "center",
        fill: "black", // White color for the text
        selectable: false,
      });

      text.set({
        left: rectCenter.x,
        top: rectCenter.y,
      });

      // Group the rectangle and text to keep them together
      const group = new fabric.Group([rect, text], {
        left: rect.left,
        top: rect.top,
        selectable: false,
      });

      objs.push(group); // Add the group to the array
    });

    // Add all objects to the canvas
    if (canvasRef.current !== null) {
      objs.forEach((obj: any) => {
        canvasRef?.current?.add(obj);
      });

      // Adjust the view as needed, for example centering the group of objects
      const group = new fabric.Group(objs, {
        originX: "center",
        originY: "top",
        selectable: false,
      });

      const canvasCenter = canvasRef.current.getCenter();
      group.set({
        left: canvasCenter.left,
        top: 0,
      });

      canvasRef.current.add(group);
      group.setCoords();

      // Calculate the scale factor to fit three groups within the canvas
      const scaleFactor =
        (canvasRef.current.getHeight() / (group.height! * 3)) * 0.9;
      // You might need to adjust scaling here to fit everything within the canvas view
      group.scale(scaleFactor);
      group.scaleX = (canvasRef.current.getWidth() / group.width!) * 0.5;

      let topY: number;

      if (group.originY === "top") {
        topY = group.top!;
      } else if (group.originY === "center") {
        topY = group.top! - (group.height! * group.scaleY!) / 2;
      } else if (group.originY === "bottom") {
        topY = group.top! - group.height! * group.scaleY!;
      }
      fabric.Image.fromURL(
        svgUrl,
        (img) => {
          // Set position of the SVG image to top-left corner
          img.set({
            left: canvasRef.current!.getWidth() - img.width!,
            top: topY,
            selectable: false,
          });

          // Add the SVG image to the canvas
          canvasRef.current!.add(img);

          // Attach onclick handler to the SVG image
          img.on("mousedown", (event) => {
            setIsVisible(true);
            setCurrentIndex(indexRFP);
          });
        },
        {
          crossOrigin: "anonymous", // Allow cross-origin requests if necessary
        },
      );
    }

    if (indexRFP + 1 <= listRFP.length - 1) {
      var objs2: any = []; // This will hold both rectangles and their corresponding text objects
      const rects2 = listRFP[indexRFP + 1];

      rects2.forEach((rdata: FloorPlanItem) => {
        // Define the rectangle
        const rect = new fabric.Rect({
          left: Number(Number(rdata["left"] * 1.5) + Number(40 * 3)),
          top: Number(rdata["top"] * 1.5) + Number(40 * 3),
          width: Number(rdata["width"] * 1.5),
          height: Number(rdata["height"] * 1.5),
          fill: "#fff",
          selectable: false,
          stroke: "black",
          strokeWidth: 1.5,
        });
        // Calculate the centered position for the text
        const rectCenter = {
          x: rect.left! + rect.width! / 2,
          y: rect.top! + rect.height! / 2,
        };

        // Define the label text
        const text = new fabric.Text(rdata["label"][0], {
          fontSize: 16,
          originX: "center",
          originY: "center",
          fill: "black", // White color for the text
          selectable: false,
        });

        text.set({
          left: rectCenter.x,
          top: rectCenter.y,
        });

        // Group the rectangle and text to keep them together
        const group = new fabric.Group([rect, text], {
          left: rect.left,
          top: rect.top,
          selectable: false,
        });

        objs2.push(group); // Add the group to the array
      });

      // Add all objects to the canvas
      if (canvasRef.current !== null) {
        objs2.forEach((obj: any) => {
          canvasRef?.current?.add(obj);
        });

        // Adjust the view as needed, for example centering the group of objects
        const group = new fabric.Group(objs2, {
          originX: "center",
          originY: "center",
          selectable: false,
        });

        const canvasCenter = canvasRef.current.getCenter();
        group.set({
          left: canvasCenter.left,
          top: canvasCenter.top,
        });

        canvasRef.current.add(group);
        group.setCoords();

        // Calculate the scale factor to fit three groups within the canvas
        const scaleFactor =
          (canvasRef.current.getHeight() / (group.height! * 3)) * 0.9;
        // You might need to adjust scaling here to fit everything within the canvas view
        group.scale(scaleFactor);
        group.scaleX = (canvasRef.current.getWidth() / group.width!) * 0.5;
        let topY: number;

        if (group.originY === "top") {
          topY = group.top!;
        } else if (group.originY === "center") {
          topY = group.top! - (group.height! * group.scaleY!) / 2;
        } else if (group.originY === "bottom") {
          topY = group.top! - group.height! * group.scaleY!;
        }
        fabric.Image.fromURL(
          svgUrl,
          (img) => {
            // Set position of the SVG image to top-left corner
            img.set({
              left: canvasRef.current!.getWidth() - img.width!,
              top: topY,
              selectable: false,
            });

            // Add the SVG image to the canvas
            canvasRef.current!.add(img);

            // Attach onclick handler to the SVG image
            img.on("mousedown", (event) => {
              setIsVisible(true);
              setCurrentIndex(indexRFP + 1);
            });
          },
          {
            crossOrigin: "anonymous", // Allow cross-origin requests if necessary
          },
        );
      }
    }
    if (indexRFP + 2 <= listRFP.length - 1) {
      var objs3: any = []; // This will hold both rectangles and their corresponding text objects
      const rects3 = listRFP[indexRFP + 2];

      rects3.forEach((rdata: FloorPlanItem) => {
        // Define the rectangle
        const rect = new fabric.Rect({
          left: Number(Number(rdata["left"] * 1.5) + Number(40 * 3)),
          top: Number(rdata["top"] * 1.5) + Number(40 * 3),
          width: Number(rdata["width"] * 1.5),
          height: Number(rdata["height"] * 1.5),
          fill: "#fff",
          selectable: false,
          stroke: "black",
          strokeWidth: 1.5,
        });
        // Calculate the centered position for the text
        const rectCenter = {
          x: rect.left! + rect.width! / 2,
          y: rect.top! + rect.height! / 2,
        };

        // Define the label text
        const text = new fabric.Text(rdata["label"][0], {
          fontSize: 16,
          originX: "center",
          originY: "center",
          fill: "black", // White color for the text
          selectable: false,
        });

        text.set({
          left: rectCenter.x,
          top: rectCenter.y,
        });

        // Group the rectangle and text to keep them together
        const group = new fabric.Group([rect, text], {
          left: rect.left,
          top: rect.top,
          selectable: false,
        });

        objs3.push(group); // Add the group to the array
      });

      // Add all objects to the canvas
      if (canvasRef.current !== null) {
        objs3.forEach((obj: any) => {
          canvasRef?.current?.add(obj);
        });

        // Adjust the view as needed, for example centering the group of objects
        const group = new fabric.Group(objs3, {
          originX: "center",
          originY: "top",
          selectable: false,
        });

        // Calculate the scale factor to fit three groups within the canvas
        const scaleFactor =
          (canvasRef.current.getHeight() / (group.height! * 3)) * 0.9;
        // You might need to adjust scaling here to fit everything within the canvas view
        group.scale(scaleFactor);
        group.scaleX = (canvasRef.current.getWidth() / group.width!) * 0.5;
        const canvasCenter = canvasRef.current.getCenter();
        group.set({
          left: canvasCenter.left,
          top: canvasRef.current.getHeight() - group.height! * scaleFactor,
        });

        canvasRef.current.add(group);
        group.setCoords();

        let topY: number;

        if (group.originY === "top") {
          topY = group.top!;
        } else if (group.originY === "center") {
          topY = group.top! - (group.height! * group.scaleY!) / 2;
        } else if (group.originY === "bottom") {
          topY = group.top! - group.height! * group.scaleY!;
        }
        fabric.Image.fromURL(
          svgUrl,
          (img) => {
            // Set position of the SVG image to top-left corner
            img.set({
              left: canvasRef.current!.getWidth() - img.width!,
              top: topY,
              selectable: false,
            });

            // Add the SVG image to the canvas
            canvasRef.current!.add(img);

            // Attach onclick handler to the SVG image
            img.on("mousedown", (event) => {
              setIsVisible(true);
              setCurrentIndex(indexRFP + 2);
            });
          },
          {
            crossOrigin: "anonymous", // Allow cross-origin requests if necessary
          },
        );
      }
    }
  };

  const resetDrawBoard = () => {
    // Check: https://stackoverflow.com/questions/11829786/delete-multiple-objects-at-once-on-a-fabric-js-canvas-in-html5
    const rects = canvasRef.current
      ?.getObjects()
      .filter((obj: any) => obj["type"] === "group" || "image");
    rects?.forEach((rect: any) => {
      canvasRef.current?.remove(rect);
    });
  };

  const prevRFP = () => {
    if (!listRFP.length) return;
    // dispatch(setIndexRFP((indexRFP - 1 + listRFP.length) % listRFP.length));
    dispatch(setIndex((indexRFP - 3 + listRFP.length) % listRFP.length));
  };

  const nextRFP = () => {
    if (!listRFP.length) return;
    dispatch(
      setIndex(
        (indexRFP + 3 >= listRFP.length ? 0 : indexRFP + 3) % listRFP.length,
      ),
    );
  };

  //inititalize fabric canvas object and handleResize functionality upon initial load
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "#fff",
      selection: false,
    });
    canvasRef.current = canvas;

    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      canvas.setDimensions({ width: containerWidth, height: containerHeight });
    };

    handleResize(); // Set initial canvas dimensions

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  //initialize and listen forfloorplans and store in listrfp
  useEffect(() => {
    if (!floorPlans) return;

    try {
      setListRFP(floorPlans);
      dispatch(setIndex(0));
    } catch (err) {
      console.log(err);
    }
    // });
  }, [floorPlans, dispatch]);

  // Render loadRFP on every time indexRFP or listRFP changes
  useEffect(() => {
    loadRFP();
  }, [indexRFP, listRFP]);

  useEffect(() => {
    if (currentIndex != -1) {
      const canvas = new fabric.Canvas("pop-up-canvas", {
        backgroundColor: "#fff",
        selection: false,
      });
      canvas.setWidth(window.innerWidth * 0.6);
      canvas.setHeight(window.innerHeight * 0.75);
      popUpRef.current = canvas;
      var objs: any = []; // This will hold both rectangles and their corresponding text objects
      const rects = listRFP[currentIndex];

      fabric.Image.fromURL(
        svgUrl2,
        (img) => {
          // Set position of the SVG image to top-left corner
          img.set({
            left: popUpRef.current!.getWidth() - img.width! * 1.2,
            top: 10,
            selectable: false,
          });

          // Add the SVG image to the canvas
          popUpRef.current!.add(img);

          // Attach onclick handler to the SVG image
          img.on("mousedown", (event) => {
            setIsVisible(false);
          });
        },
        {
          crossOrigin: "anonymous", // Allow cross-origin requests if necessary
        },
      );

      rects.forEach((rdata: FloorPlanItem) => {
        // Define the rectangle
        const rect = new fabric.Rect({
          left: Number(Number(rdata["left"] * 1.5) + Number(40 * 3)),
          top: Number(rdata["top"] * 1.5) + Number(40 * 3),
          width: Number(rdata["width"] * 1.5),
          height: Number(rdata["height"] * 1.5),
          fill: "#fff",
          selectable: false,
          stroke: "black",
          strokeWidth: 1.5,
        });
        // Calculate the centered position for the text
        const rectCenter = {
          x: rect.left! + rect.width! / 2,
          y: rect.top! + rect.height! / 2,
        };

        // Define the label text
        const text = new fabric.Text(rdata["label"][0], {
          fontSize: 8,
          originX: "center",
          originY: "center",
          fill: "black", // White color for the text
          selectable: false,
        });

        text.set({
          left: rectCenter.x,
          top: rectCenter.y,
        });

        // Group the rectangle and text to keep them together
        const group = new fabric.Group([rect, text], {
          left: rect.left,
          top: rect.top,
          selectable: false,
        });

        objs.push(group); // Add the group to the array
      });

      // Add all objects to the canvas
      if (popUpRef.current !== null) {
        objs.forEach((obj: any) => {
          popUpRef?.current?.add(obj);
        });

        // Adjust the view as needed, for example centering the group of objects
        const group = new fabric.Group(objs, {
          originX: "center",
          originY: "center",
          selectable: false,
        });

        const canvasCenter = popUpRef.current.getCenter();
        group.set({
          left: canvasCenter.left,
          top: canvasCenter.top,
        });

        popUpRef.current.add(group);
        group.setCoords();

        /*  // Calculate the scale factor to fit three groups within the canvas
      const scaleFactor =
        (popUpRef.current.getHeight() / (group.height! * 3)) * 0.9;
      // You might need to adjust scaling here to fit everything within the canvas view
      group.scale(1); */
        group.scaleX = (popUpRef.current.getWidth() / group.width!) * 0.8;
        group.scaleY = (popUpRef.current.getHeight() / group.height!) * 0.8;
      }
    }
  }, [currentIndex, isVisible]);

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
        <canvas id="canvas" style={{ width: "100%", height: "100%" }} />
      </div>
      {floorPlans !== null && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "8px",
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
            {listRFP.length > 0 && indexRFP + 3 < listRFP.length
              ? `${indexRFP + 1}-${indexRFP + 3}`
              : `${indexRFP + 1}-${listRFP.length}`}{" "}
            / {listRFP.length}{" "}
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

      {isVisible && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="popup-inner">
            <canvas id="pop-up-canvas" />
          </div>
        </div>
      )}
    </>
  );
};

export default DrawingBoard4;
