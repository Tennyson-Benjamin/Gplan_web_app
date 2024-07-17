import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function UpLeftCursorIcon(props: { color: String }) {
  return (
    <SvgIcon sx={{ color: `${props.color}`}} fontSize="large">
      {/* credit: plus icon from https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        color="black"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 4.32,4.93
      C 4.32,4.93 11.96,23.29 11.96,23.29
        11.96,23.29 14.67,15.31 14.67,15.31
        14.67,15.31 22.68,12.57 22.68,12.57
        22.68,12.57 4.32,4.93 4.32,4.93 Z"
        />
      </svg>
    </SvgIcon>
  );
}

export default UpLeftCursorIcon;
