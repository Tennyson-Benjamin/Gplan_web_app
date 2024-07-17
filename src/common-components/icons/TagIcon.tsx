import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function TagIcon(props: { color: String }) {
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
          d="M10.48 6.01312H2.92V13.5731L9.7132 20.3663C10.7284 21.3815 12.3916 21.3815 13.4068 20.3663L17.2732 16.4999C18.2884 15.4847 18.2884 13.8215 17.2732 12.8063L10.48 6.01312Z"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.24 10.3439V10.3331"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.96 6.01312L23.764 12.8171C24.0056 13.0579 24.1974 13.3441 24.3282 13.6591C24.459 13.9742 24.5264 14.312 24.5264 14.6531C24.5264 14.9943 24.459 15.3321 24.3282 15.6471C24.1974 15.9622 24.0056 16.2483 23.764 16.4891L19.12 21.1331"
          strokeWidth="2.16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default TagIcon;
