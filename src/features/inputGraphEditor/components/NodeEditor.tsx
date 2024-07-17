import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  updateNodeHeight,
  updateNodeRatio,
  updateNodeWidth,
  deleteNode,
  updateNodeLabel,
} from "../../../redux/features/nodes";
import { updateShowComponent } from "../../../redux/features/nodeEditor";

interface NodeEditorProps {
  onClose: () => void;
  nodePosition?: { top: number; left: number };
}

const NodeEditor: React.FC<NodeEditorProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const maxWidthRef = useRef<HTMLInputElement>();
  const minWidthRef = useRef<HTMLInputElement>();
  const maxHeightRef = useRef<HTMLInputElement>();
  const minHeightRef = useRef<HTMLInputElement>();
  const maxRatioRef = useRef<HTMLInputElement>();
  const minRatioRef = useRef<HTMLInputElement>();
  const textRef = useRef<HTMLInputElement>();

  const nodePosition = useSelector(
    (store: RootState) => store?.nodeEditorState?.nodePosition,
  );

  const nodes = useSelector((store: RootState) => store?.nodesState?.nodes);

  const clickedNodeID = useSelector(
    (store: RootState) => store?.nodeEditorState?.clickedNodeID,
  );
  const showComponent = useSelector(
    (store: RootState) => store?.nodeEditorState?.showComponent,
  );

  let nodeLabel = "";

  const onSave = () => {
    if (clickedNodeID !== "none") {
      dispatch(
        updateNodeHeight({
          id: clickedNodeID,
          max: parseInt(
            maxHeightRef.current === undefined
              ? "none"
              : maxHeightRef.current.value,
          ),
          min: parseInt(
            minHeightRef.current === undefined
              ? "none"
              : minHeightRef.current.value,
          ),
        }),
      );
      dispatch(
        updateNodeWidth({
          id: clickedNodeID,
          max: parseInt(
            maxWidthRef.current === undefined
              ? "none"
              : maxWidthRef.current.value,
          ),
          min: parseInt(
            minWidthRef.current === undefined
              ? "none"
              : minWidthRef.current.value,
          ),
        }),
      );
      dispatch(
        updateNodeRatio({
          id: clickedNodeID,
          max: parseInt(
            minRatioRef.current === undefined
              ? "none"
              : minRatioRef.current.value,
          ),
          min: parseInt(
            minRatioRef.current === undefined
              ? "none"
              : minRatioRef.current.value,
          ),
        }),
      );
    }
  };

  const onDelete = () => {
    console.log(clickedNodeID);
    if (clickedNodeID !== "none") {
      dispatch(deleteNode(clickedNodeID));
      dispatch(updateShowComponent(false));
    }
  };

  let timeout: any;
  const handleTextFieldValue = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (clickedNodeID !== "none") {
        const label = nodes.find((node) => node.id === clickedNodeID)?.label;

        if (label && textRef.current) {
          let newLabel = textRef.current.value;

     

          // Ensure that the first character is always the original label
          const fixedInitialLabel = (data: string) => {
            const match = data.match(/^\d+/); // Match digits at the beginning of the string
            return match ? match[0] : ''; // Return the matched digits or an empty string
          };                                          // Retain the original first character (the number)
        
          // Create a new label that always starts with the initial character and has the rest in parentheses
          const checkNewLabel = ((data:string) => {
            return fixedInitialLabel(newLabel).length > 1 ? `(${data.slice(2)})` : `(${data.slice(1)})`
          });
          const modifiedLabel = fixedInitialLabel(newLabel) + `${checkNewLabel(newLabel)}`;

          dispatch(
            updateNodeLabel({
              id: clickedNodeID,
              label: modifiedLabel,
            }),
          );
        }
      }
    }, 200);
  };

  useEffect(() => {
    nodes.forEach((node, index) => {
      if (node?.label?.length === 0) {
        dispatch(
          updateNodeLabel({
            id: index,
            label: `${index + 1}`,
          }),
        );
      }
    });
  }, [showComponent]);
  console.log(nodePosition.top, nodePosition.left);
  console.log(window.visualViewport?.height, window.visualViewport?.width);

  return (
    <Box
      sx={{
        position: "fixed",
        top:
          window.visualViewport &&
          nodePosition.top + 100 > window.visualViewport?.height
            ? nodePosition.top - 250
            : nodePosition.top - 155 < 0
              ? nodePosition.top - 50
              : nodePosition.top - 155,
        left: nodePosition.left + 85,
        padding: 0.75,
        // backgroundColor: "red",
        backgroundColor: "#1C4C82",
        border: "0.01px solid white",
        borderRadius: 2,
        // display: showSettings ? 'block' : 'none',
        fontFamily: "Poppins",
        zIndex: 1000,
        // scale: '.85'
      }}
    >
      <TextField
        variant="standard"
        margin="dense"
        inputRef={textRef}
        defaultValue={
          clickedNodeID !== "none" ? nodes[clickedNodeID]?.label : nodeLabel
        }
        onChange={handleTextFieldValue}
        InputProps={{
          disableUnderline: true,
          style: {
            backgroundColor: "transparent",
            color: "white",
            fontSize: "1rem",
            borderRadius: "4px",
            textAlign: "center",
            justifyContent: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          },
        }}
      />
      <Typography
        variant="h6"
        sx={{
          marginBottom: 1,
          marginX: 1,
          color: "#879FBA",
          fontSize: ".5rem",
          fontWeight: "400",
          fontFamily: "Poppins",
          fontStyle: "normal",
          lineHeight: "normal",
          marginTop: "-4px",
        }}
      >
        Double Click to Rename
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 1,
          zIndex: 10,
          nodePosition: "relative",
          borderRadius: 0.5,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            marginTop: 1,
            marginBottom: -0.5,
            color: "#7794B4",
            fontSize: "0.75rem",
            fontWeight: "500",
            fontFamily: "Poppins",
            fontStyle: "normal",
            lineHieght: "normal",
          }}
        >
          Min-Width
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            margin="dense"
            inputRef={maxWidthRef}
            InputProps={{
              disableUnderline: true,
              // inputProps: {
              //     pattern: '^\\d*\\.?\\d*$',
              // },
              // endAdornment: <span>ft</span>,
              style: {
                backgroundColor: "#f2f2f2",
                fontSize: "0.75rem",
                width: "100%",
                height: "28px",
                borderRadius: "4px",
                textAlign: "center",
                justifyContent: "center",
                paddingLeft: "5px",
                paddingRight: "5px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              },
            }}
          />
        </Box>
        <Typography
          variant="h2"
          sx={{
            marginTop: 1,
            marginBottom: -0.5,
            color: "#7794B4",
            fontSize: "0.75rem",
            fontWeight: "500",
            fontFamily: "Poppins",
            fontStyle: "normal",
            lineHieght: "normal",
          }}
        >
          Min-Length
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            margin="dense"
            inputRef={maxHeightRef}
            InputProps={{
              disableUnderline: true,
              // inputProps: {
              //     pattern: '^\\d*\\.?\\d*$',
              // },
              // endAdornment: <span>ft</span>,
              style: {
                backgroundColor: "#f2f2f2",
                fontSize: "0.75rem",
                width: "100%",
                height: "28px",
                borderRadius: "4px",
                textAlign: "center",
                justifyContent: "center",
                paddingLeft: "5px",
                paddingRight: "5px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onSave}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#1C4C82",
              fontFamily: "Poppins",
              fontSize: "0.75rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              marginLeft: "-5px",
              marginBottom: "-5px",
            }}
          >
            Save Dimensions
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ED4337",
              fontFamily: "Poppins",
              fontSize: "0.75rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              marginRight: "-5px",
              marginBottom: "-5px",
            }}
            onClick={onDelete}
          >
            Delete Node
          </button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "33px",
          height: "33px",
          position: "absolute",
          rotate: "45deg",
          nodePosition: "absolute",
          backgroundColor: "#1C4C82",
          borderRadius: "5px",
          top: "50%",
          left: "-6%",
          zIndex: -1,
          // transform: 'translate(235%, 35%)',
        }}
      />
    </Box>
  );
};

export default NodeEditor;
