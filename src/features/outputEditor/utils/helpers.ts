import roomSlice from "../../../redux/features/room/room.slice";
import { Room, Wall } from "../components/Floorplan";

const colors: string[] = [
  "#FFE1E1",
  "#E1EFFF",
  "#F2F7FC",
  "#d1e7dd",
  "#33F9FF",
];
export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const drawGrid = (
  gridGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
) => {
  if (!svgRef.current) return;
  const width = +svgRef.current.clientWidth;
  const height = +svgRef.current.clientHeight;
  const GRID_SIZE = 20;

  for (let x = 0; x <= width; x += GRID_SIZE) {
    for (let y = 0; y <= height; y += GRID_SIZE) {
      gridGroup
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 1)
        .attr("fill", "#ccc");
    }
  }
};

export const getFloorplanLimits = (rooms: Room[]) => {
  let minFPX: number = Number.MAX_VALUE,
    maxFPX: number = Number.MIN_VALUE,
    minFPY: number = Number.MAX_VALUE,
    maxFPY: number = Number.MIN_VALUE;

  rooms.forEach((room) => {
    room?.walls?.forEach((wall) => {
      minFPX = Math.min(minFPX, wall.x1, wall.x2);
      maxFPX = Math.max(maxFPX, wall.x1, wall.x2);
      minFPY = Math.min(minFPY, wall.y1, wall.y2);
      maxFPY = Math.max(maxFPY, wall.y1, wall.y2);
    });
  });

  return { minFPX, maxFPX, minFPY, maxFPY };
};

export const getRoomLimits = (wall: Wall, rooms: Room[]) => {
  let minX: number = Number.MIN_VALUE,
    maxX: number = Number.MAX_VALUE,
    minY: number = Number.MIN_VALUE,
    maxY: number = Number.MAX_VALUE;
  let room = rooms.find((r) => r.id === wall.roomId);
  if (room) {
    // min/max of room
    let mnX: number = wall.x1,
      mxX: number = wall.x1,
      mnY: number = wall.y1,
      mxY: number = wall.y1;
    room?.walls?.forEach((w) => {
      if (w !== wall) {
        mnX = Math.min(mnX, w.x1, w.x2);
        mxX = Math.max(mxX, w.x1, w.x2);
        mnY = Math.min(mnY, w.y1, w.y2);
        mxY = Math.max(mxY, w.y1, w.y2);
      }
    });
    // vertical wall
    if (wall.x1 === wall.x2) {
      // left wall
      if (wall.x1 === mnX) {
        maxX = mxX;
      }
      // right wall
      else {
        minX = mnX;
      }
    } else {
      if (wall.y1 === mnY) {
        maxY = mxY;
      } else {
        minY = mnY;
      }
    }
  }
  return { minX, maxX, minY, maxY };
};

export const getLimits = (wall: Wall, rooms: Room[]) => {
  let x1: number, x2: number, y1: number, y2: number;
  x1 = wall.x1;
  x2 = wall.x2;
  y1 = wall.y1;
  y2 = wall.y2;

  // min/max coords of floorplan
  let { minFPX, maxFPX, minFPY, maxFPY } = getFloorplanLimits(rooms);

  // don't move external wall
  if (
    (x1 === x2 && (minFPX === x1 || maxFPX === x1)) ||
    (y1 === y2 && (minFPY === y1 || maxFPY === y2))
  ) {
    return {
      minX: Math.min(x1, x2),
      maxX: Math.max(x1, x2),
      minY: Math.min(y1, y2),
      maxY: Math.max(y1, y2),
    };
  }

  let { minX, minY, maxX, maxY } = getRoomLimits(wall, rooms);

  rooms.forEach((room) => {
    if (room.id !== wall.roomId) {
      room?.walls?.forEach((w) => {
        let mnX: number = minX,
          mxX: number = maxX,
          mnY: number = minY,
          mxY: number = maxY;
        if (w !== wall) {
          // for vertical wall, horizontal w
          if (x1 === x2 && w.y1 === w.y2) {
            // x1 or x2 lies on w
            if (
              (w.x1 === x1 || w.x2 === x1) &&
              Math.abs(y1 - w.y1) + Math.abs(y2 - w.y1) === Math.abs(y1 - y2)
            ) {
              // w is in the left
              if (w.x1 <= x1 && w.x2 <= x1) mnX = Math.min(w.x1, w.x2);
              else mxX = Math.max(w.x1, w.x2);
            }
          }

          // for horizontal wall, vertical w
          if (y1 === y2 && w.x1 === w.x2) {
            // y1 or y2 lies on w
            if (
              (w.y1 === y1 || w.y2 === y1) &&
              Math.abs(x1 - w.x1) + Math.abs(x2 - w.x2) === Math.abs(x1 - x2)
            ) {
              // w in the upper side
              if (w.y1 <= y1 && w.y2 <= y1) mnY = Math.min(w.y1, w.y2);
              else mxY = Math.max(w.y1, w.y2);
            }
          }
          minX = Math.max(mnX, minX);
          maxX = Math.min(mxX, maxX);
          minY = Math.max(mnY, minY);
          maxY = Math.min(mxY, maxY);
        }
      });
    }
  });

  // if(x1 === x2 && min)

  return { minX, maxX, minY, maxY };
};
