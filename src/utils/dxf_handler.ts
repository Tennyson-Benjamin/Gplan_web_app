import {
  point3d,
  point2d,
  LWPolylineFlags,
  HatchPolylineBoundary,
  vertex,
  HatchBoundaryPaths,
  pattern,
  HatchPredefinedPatterns,
  DxfWriter,
} from "@tarikjabiri/dxf";

const DECREMENT_WIDTH = 0.01;
const WALL_HEIGHT = 5;

interface Room {
  corners: number[][];
  index: number;
  label: string; // Added label field
}

interface Line {
  startPoint: number[];
  endPoint: number[];
}

export function plotLines(dxf: DxfWriter, lines: number[][]) {
  for (let i = 0; i < lines.length - 2; i = i + 2) {
    const startPoint = lines[i];
    const endPoint = lines[i + 1];
    dxf.addLine(
      point3d(startPoint[0], startPoint[1]),
      point3d(endPoint[0], endPoint[1]),
    );
  }
}

export function plotRoom(room: Room, dxf: DxfWriter) {
  const corners = room.corners.map((corner) => [...corner]);

  let xMid = 0;
  let yMid = 0;

  corners.forEach((corner) => {
    xMid += corner[0];
    yMid += corner[1];
  });

  xMid /= 4;
  yMid /= 4;

  corners.forEach((corner) => {
    if (corner[0] < xMid) {
      corner[0] += DECREMENT_WIDTH;
    } else {
      corner[0] -= DECREMENT_WIDTH;
    }
    if (corner[1] < yMid) {
      corner[1] += DECREMENT_WIDTH;
    } else {
      corner[1] -= DECREMENT_WIDTH;
    }
  });

  const vertices = corners.map((corner) => ({
    point: point2d(corner[0], corner[1]),
  }));

  dxf.addLWPolyline(vertices, {
    flags: LWPolylineFlags.Closed,
  });

  addHatch(dxf, room);

  // Add room label
  dxf.addText(point3d(xMid, yMid, 0), 10, room.label);
}

function addHatch(dxf: DxfWriter, room: Room) {
  const polyline = new HatchPolylineBoundary();
  room.corners.forEach((corner) => {
    polyline.add(vertex(corner[0], corner[1]));
  });

  const boundary = new HatchBoundaryPaths();
  boundary.addPolylineBoundary(polyline);

  const mypattern = pattern({
    name: HatchPredefinedPatterns.SOLID,
  });

  const hatch = dxf.addHatch(boundary, mypattern);
  hatch.colorNumber = room.index + 1;
}

export function plotWalls(dxf: DxfWriter, lines: number[][]) {
  for (let i = 0; i < lines.length - 2; i = i + 2) {
    const startPoint = lines[i];
    const endPoint = lines[i + 1];

    if (startPoint[0] === endPoint[0]) {
      const polyline = new HatchPolylineBoundary();
      polyline.add(vertex(startPoint[0], startPoint[1]));
      polyline.add(vertex(endPoint[0], endPoint[1]));
      polyline.add(vertex(endPoint[0] + WALL_HEIGHT, endPoint[1]));
      polyline.add(vertex(startPoint[0] + WALL_HEIGHT, startPoint[1]));

      const boundary = new HatchBoundaryPaths();
      boundary.addPolylineBoundary(polyline);

      const mypattern = pattern({
        name: HatchPredefinedPatterns.SOLID,
      });

      const hatch = dxf.addHatch(boundary, mypattern);
      hatch.colorNumber = 9;
      hatch.elevation = 0;
    }
  }
}
