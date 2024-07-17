import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function ScalePencilIcon(props: { color: String }) {
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5L19 9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 6.99999L8.7 2.69999C8.24838 2.25054 7.63715 1.99823 7 1.99823C6.36285 1.99823 5.75162 2.25054 5.3 2.69999L2.7 5.29999C2.25056 5.75161 1.99825 6.36283 1.99825 6.99999C1.99825 7.63714 2.25056 8.24836 2.7 8.69999L7 13"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6L10 4" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 22L7.5 20.5L21.17 6.83001C21.7004 6.29958 21.9984 5.58016 21.9984 4.83001C21.9984 4.07987 21.7004 3.36045 21.17 2.83001C20.6396 2.29958 19.9201 2.00159 19.17 2.00159C18.4199 2.00159 17.7004 2.29958 17.17 2.83001L3.5 16.5L2 22Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 16L20 14" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 11L21.3 15.3C22.24 16.24 22.24 17.76 21.3 18.7L18.7 21.3C17.76 22.24 16.24 22.24 15.3 21.3L11 17"
        />
      </svg>
    </SvgIcon>
  );
}

export default ScalePencilIcon;
