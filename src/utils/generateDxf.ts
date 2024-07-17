import { DxfWriter, point3d } from "@tarikjabiri/dxf";
import { roomsFromJson } from "./conversion";
import { plotRoom, plotLines, plotWalls } from "./dxf_handler";
import { CustomDataStructure, addLines, arrangeLines } from "./line_split";
import { convertToDxfFormat } from "./helpers";
import { ApiRoom, RoomData } from "../types";

const dxf = new DxfWriter();

// Function to handle DXF file creation and download
export const handleCreateAndDownloadDXF = (floorPlan: ApiRoom[]) => {
  const myJson = convertToDxfFormat(floorPlan);
  const rooms = roomsFromJson(myJson);

  const horizontalLines = new CustomDataStructure();
  const verticalLines = new CustomDataStructure();
  const lines: number[][] = [];

  rooms.forEach((room) => {
    const points = room.corners.map((corner) => point3d(corner[0], corner[1]));
    plotRoom(room, dxf);
    addLines(room, horizontalLines, verticalLines);
  });

  arrangeLines(lines, horizontalLines, verticalLines);
  plotLines(dxf, lines);
  plotWalls(dxf, lines);
  const dxfContent = dxf.stringify();
  const blob = new Blob([dxfContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "floorplan.dxf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Example usage in a React component
