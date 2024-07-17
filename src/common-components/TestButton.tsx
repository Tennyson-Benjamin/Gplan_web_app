import React, { useEffect } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import MagnetIcon from "./icons/MagnetIcon";
import { Button } from "@mui/material";

function TestButton(props: {
  children: ReactNode;
  func: (msg: String) => void;
}) {
  const [iconColor, setIconColor] = useState("black");
  const [bgColor, setbgColor] = useState("white");
  const [click, setClick] = useState("off");
  const [didMount, setDidMount] = useState(false);

  const child = React.cloneElement(props.children as React.ReactElement<any>, {
    color: iconColor,
  });

  useEffect(() => {
    if (didMount === false) {
      setDidMount(true);
    } else {
      click === "on" &&
        props.func(
          "First Click => ON : function/feature from backend executes such as tool for editing floorplan",
        );
      click === "off" &&
        props.func(
          "Second Click => OFF : function/feature from backend stops executing",
        );
      console.log(click);
      iconColor === "white" ? setIconColor("white") : setIconColor("black");
      bgColor === "white" ? setbgColor("#1C4C82") : setbgColor("white");
    }
  }, [click]);

  const handleonClick = async () => {
    click === "off" ? setClick("on") : setClick("off");
  };

  const handleMouseEnter = () => {
    setIconColor("white");
  };
  const handleMouseLeave = () => {
    if (click === "off") {
      setIconColor("black");
    }
  };
  return (
    <>
      <Button
        onClick={handleonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          boxShadow: `${click === "on" && "2px 2px 4px rgba(0, 0, 0, 0.2)"}`,
          margin: "10px",
          transition: "0.3s",
          borderRadius: "5px",
          maxWidth: "35px",
          maxHeight: "35px",
          minWidth: "35px",
          minHeight: "35px",
          backgroundColor: bgColor,
          "&:hover": {
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            background: "#1C4C82",
          },
        }}
      >
        {child}
      </Button>
    </>
  );
}

export default TestButton;
