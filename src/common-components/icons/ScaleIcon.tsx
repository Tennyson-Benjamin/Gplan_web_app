import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

function ScaleIcon(props: { color: String }) {
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
          d="M21.3 15.3C21.5237 15.523 21.7013 15.7879 21.8224 16.0796C21.9435 16.3713 22.0059 16.6841 22.0059 17C22.0059 17.3159 21.9435 17.6286 21.8224 17.9203C21.7013 18.2121 21.5237 18.477 21.3 18.7L18.7 21.3C18.477 21.5237 18.2121 21.7013 17.9204 21.8224C17.6286 21.9435 17.3159 22.0059 17 22.0059C16.6841 22.0059 16.3714 21.9435 16.0796 21.8224C15.7879 21.7013 15.523 21.5237 15.3 21.3L2.7 8.69999C2.25056 8.24836 1.99825 7.63714 1.99825 6.99999C1.99825 6.36283 2.25056 5.75161 2.7 5.29999L5.3 2.69999C5.75162 2.25054 6.36285 1.99823 7 1.99823C7.63715 1.99823 8.24838 2.25054 8.7 2.69999L21.3 15.3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.5 12.5L16.5 10.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.5 9.5L13.5 7.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 6.5L10.5 4.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.5 15.5L19.5 13.5"
        />
      </svg>
    </SvgIcon>
  );
}

export default ScaleIcon;
