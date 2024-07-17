import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { ReactEventHandler, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchGraphData } from "../../../redux/api/api.graph";
import { updateResetBoard } from "../../../redux/features/nodes";
import { Button } from "react-bootstrap";
import DropdownItem from "./DropdownItem";
import { updateShape } from "../../../redux/features/shape/shape.slice";
import { showToast } from "../../../redux/features/toast/toast.slice";

let menuitems = [
  {
    id: 0,
    title: "Floorplan",
    value: "irregular",
    desc: "Construct a floor plan for any graph",
  },
  {
    id: 1,
    title: "Rectangular Floorplan",
    value: "rectangular",
    desc: "Construct floorplans with rectangular boundary, if exist",
  },
  {
    id: 2,
    title: "L Shape",
    value: "lshape",
    desc: "Construct floorplans with L-shaped boundary, if exist",
  },
  // {
  //   id: 3,
  //   title: "U Shape",
  //   value: "ushape",
  //   desc: "Construct a floor plan of any U shape",
  // },
  // {
  //   id: 4,
  //   title: "T Shape",
  //   value: "tshape",
  //   desc: "Construct a floor plan of any T shape",
  // },
  // {
  //   id: 5,
  //   title: "Z Shape",
  //   value: "zshape",
  //   desc: "Construct a floor plan of any Z shape",
  // },
  // {
  //   id: 6,
  //   title: "Staircase Shape",
  //   value: "staircase",
  //   desc: "Construct a floor plan of any staircase shape",
  // },
];

function Dropdown() {
  const dispatch = useDispatch<AppDispatch>();

  const handleItemClick = (event: SelectChangeEvent<number>) => {
    console.log(event.target?.value);
    const shapeClick = menuitems.find((item) => {
      if (
        item.id === event.target?.value &&
        (item?.value === "irregular" ||
          item?.value === "rectangular" ||
          item?.value === "lshape")
      ) {
        return item;
      }
    });
    console.log("shapeclick", shapeClick);
    if (shapeClick) {
      console.log("this block called");

      dispatch(updateShape(shapeClick.value));
    } else {
      console.log("this block called 2");

      dispatch(
        showToast({
          message: "Coming Soon!",
          type: "warning",
        }),
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-end",
      }}
    >
      <Select
        sx={{
          width: "100%",
          background: "#f2f2f2",
          borderRadius: "8px",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
        defaultValue={0}
        onChange={handleItemClick}
      >
        {menuitems.map((item) => (
          <MenuItem key={item.title} value={item.id}>
            <DropdownItem title={item.title} desc={item.desc} />
          </MenuItem>
        ))}
      </Select>

      <div className="setting header">Selection Setting</div>
    </Box>
  );
}

export default Dropdown;
