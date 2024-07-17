import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function LeftArrowIcon(props: { color: String }) {
  return (
    <SvgIcon sx={{ color: `${props.color}` }} fontSize="large">
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
          d="M15 18L9 12L15 6"
        />
      </svg>
    </SvgIcon>
  );
}

export default LeftArrowIcon;
