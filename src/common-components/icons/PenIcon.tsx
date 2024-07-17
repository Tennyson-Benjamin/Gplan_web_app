import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function PenIcon(props: { color: String }) {
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
          d="M13.8 21.1331L21.36 13.5731L24.6 16.8131L17.04 24.3731L13.8 21.1331Z"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.28 14.6531L18.66 6.55312L3 2.77312L6.78 18.4331L14.88 20.0531L20.28 14.6531Z"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 2.77312L11.1929 10.966"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.72 14.6531C13.9129 14.6531 14.88 13.6861 14.88 12.4931C14.88 11.3002 13.9129 10.3331 12.72 10.3331C11.5271 10.3331 10.56 11.3002 10.56 12.4931C10.56 13.6861 11.5271 14.6531 12.72 14.6531Z"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default PenIcon;
