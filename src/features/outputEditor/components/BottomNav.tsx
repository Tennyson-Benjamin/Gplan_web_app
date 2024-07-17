import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import RightArrowIcon from "../../../common-components/icons/RightArrowIcon";
import SelectBoxIcon from "../../../common-components/icons/SelectBoxIcon";
import TagIcon from "../../../common-components/icons/TagIcon";
import TextBoxIcon from "../../../common-components/icons/TextBoxIcon";
import UpLeftCursorIcon from "../../../common-components/icons/UpLeftCursorIcon";
import PenIcon from "../../../common-components/icons/PenIcon";
import ColorPotIcon from "../../../common-components/icons/ColorPotIcon";
import RightCurvedArrowIcon from "../../../common-components/icons/RightCurvedArrowIcon";
import LeftCurvedArrowIcon from "../../../common-components/icons/LeftCurvedArrowIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { updateDrawLine } from "../../../redux/features/appState";

export default function BottomNav() {
  const dispatch = useDispatch<AppDispatch>();

  // All Tools : arrow, box, pen, tag, pot,text
  const [tool, setTool] = useState("arrow");
  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          left: "40px",
          bottom: "15px",
          right: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: "0px 10px",
              borderRadius: "8px",
              // boxShadow:'2px 2px 2px 1px',
              border: "1px solid #E0E0E0",
            }}
          >
            <Typography
              sx={{
                pl: "10px",
                pr: "10px",
                color: "#333333",
                textAlign: "left",
                fontFamily: "Inter",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            >
              28%
            </Typography>
            <Box
              sx={{
                margin: "5px",
              }}
            >
              <RightArrowIcon color="#333333" />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: "5px",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
            }}
          >
            <Box
              sx={{
                backgroundColor: tool === "arrow" ? "#1C4C82" : "#ffffff",
                mr: "15px",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
              onClick={() => {
                dispatch(updateDrawLine());
              }}
            >
              <UpLeftCursorIcon
                color={tool === "arrow" ? "#ffffff" : "#333333"}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: tool === "select" ? "#1C4C82" : "#ffffff",
                mr: "15px",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
              onClick={() => setTool("select")}
            >
              <SelectBoxIcon
                color={tool === "select" ? "#ffffff" : "#333333"}
              />
            </Box>
            <Box
              sx={{
                mr: "15px",
              }}
            >
              <svg
                width="2"
                height="40"
                viewBox="0 0 2 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.839844" width="1" height="40" fill="#E0E0E0" />
              </svg>
            </Box>
            <Box
              sx={{
                backgroundColor: tool === "pen" ? "#1C4C82" : "#ffffff",
                mr: "15px",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
              onClick={() => setTool("pen")}
            >
              <PenIcon color={tool === "pen" ? "#ffffff" : "#333333"} />
            </Box>
            <Box
              sx={{
                backgroundColor: tool === "tag" ? "#1C4C82" : "#ffffff",
                mr: "15px",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
              onClick={() => setTool("tag")}
            >
              <TagIcon color={tool === "tag" ? "#ffffff" : "#333333"} />
            </Box>
            <Box
              sx={{
                backgroundColor: tool === "pot" ? "#1C4C82" : "#ffffff",
                mr: "15px",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
              onClick={() => setTool("pot")}
            >
              <ColorPotIcon color={tool === "pot" ? "#ffffff" : "#333333"} />
            </Box>
            <Box
              sx={{
                backgroundColor: tool === "text" ? "#1C4C82" : "#ffffff",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
              onClick={() => setTool("text")}
            >
              <TextBoxIcon color={tool === "text" ? "#ffffff" : "#333333"} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: "0px 10px",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
            }}
          >
            <Box
              sx={{
                padding: "10px",
              }}
            >
              <LeftCurvedArrowIcon color="#333333" />
            </Box>
            <Box
              sx={{
                padding: "10px",
              }}
            >
              <RightCurvedArrowIcon color="#333333" />
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
