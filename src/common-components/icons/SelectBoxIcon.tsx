import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function SelectBoxIcon(props: { color: String }) {
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
          d="M6.31999 3.85312C5.74712 3.85312 5.19772 4.08069 4.79264 4.48577C4.38756 4.89084 4.15999 5.44025 4.15999 6.01312"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.44 3.85312C22.0129 3.85312 22.5623 4.08069 22.9674 4.48577C23.3724 4.89084 23.6 5.44025 23.6 6.01312"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.6 21.1331C23.6 21.706 23.3724 22.2554 22.9674 22.6605C22.5623 23.0655 22.0129 23.2931 21.44 23.2931"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.31999 23.2931C5.74712 23.2931 5.19772 23.0655 4.79264 22.6605C4.38756 22.2554 4.15999 21.706 4.15999 21.1331"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.64 3.85312H11.72"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.64 23.2931H11.72"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.04 3.85312H17.12"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.04 23.2931H17.12"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.15999 10.3331V11.4131"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.6 10.3331V11.4131"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.15999 15.7331V16.8131"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.6 15.7331V16.8131"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default SelectBoxIcon;
