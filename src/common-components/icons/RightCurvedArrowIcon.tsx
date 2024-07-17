import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function RightCurvedArrowIcon(props: { color: String }) {
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7V13H15" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17C3 14.6131 3.94821 12.3239 5.63604 10.636C7.32387 8.94821 9.61305 8 12 8C14.2149 8.00226 16.3511 8.82116 18 10.3L21 13"
        />
      </svg>
    </SvgIcon>
  );
}

export default RightCurvedArrowIcon;
