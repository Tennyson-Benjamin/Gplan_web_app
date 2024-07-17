import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function LeftCurvedArrowIcon(props: { color: String }) {
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V13H9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 17C21 14.6131 20.0518 12.3239 18.364 10.636C16.6761 8.94821 14.3869 8 12 8C9.78512 8.00226 7.64885 8.82116 6 10.3L3 13"
        />
      </svg>
    </SvgIcon>
  );
}

export default LeftCurvedArrowIcon;
