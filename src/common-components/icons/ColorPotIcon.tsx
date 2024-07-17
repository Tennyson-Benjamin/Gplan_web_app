import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function ColorPotIcon(props: { color: String }) {
  return (
    <SvgIcon sx={{ color: `${props.color}` }} fontSize="large">
      {/* credit: plus icon from https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        color="black"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M6.07999 12.4931L14.72 3.85312L24.008 13.1411C24.4038 13.5449 24.6254 14.0877 24.6254 14.6531C24.6254 15.2185 24.4038 15.7614 24.008 16.1651L18.392 21.7811C17.528 22.6451 16.232 22.6451 15.368 21.7811L6.07999 12.4931Z"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.2 2.77312L15.8 8.17312"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.44 14.6531H8.23999"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.83999 22.2131C2.83999 22.786 3.06756 23.3354 3.47264 23.7405C3.87772 24.1455 4.42712 24.3731 4.99999 24.3731C5.57286 24.3731 6.12226 24.1455 6.52734 23.7405C6.93242 23.3354 7.15999 22.786 7.15999 22.2131C7.15999 20.4851 5.32399 19.6211 4.99999 17.8931C4.67599 19.6211 2.83999 20.4851 2.83999 22.2131Z"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default ColorPotIcon;
