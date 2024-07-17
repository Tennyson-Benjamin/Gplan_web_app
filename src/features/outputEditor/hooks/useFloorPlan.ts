import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Room, Wall, WallWithoutId } from "../components/Floorplan";
import { drawGrid, getLimits, getRandomColor } from "../utils/helpers";
import { LINEWIDTH } from "../utils/constants";
import {
  setAssetType,
  setCleanUpDone,
  setCleanUpRequired,
  setRooms,
  setWalls,
} from "../../../redux/features/appState";
import { v4 as uuidv4 } from "uuid";
import door from "../../../assets/inputGraphEditor/door.svg";
import { useRoomCleanUp } from "./useRoomCleanup";
import { formatLabel } from "../../../utils/helpers";

export const useFloorPlan = (
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
  contentGroupRef: React.MutableRefObject<SVGGElement | null>,
  zoomTransform: React.MutableRefObject<d3.ZoomTransform>,
) => {
  const [selectedLineId, setSelectedLineId] = useState<string>();
  const floorPlans = useSelector((state: RootState) => state.graph.floorPlans);
  const index = useSelector((state: RootState) => state.graph.index);
  const floorPlan = floorPlans[index];
  const draw = useSelector(
    (state: RootState) => state.outputEditorButtonState.drawLine,
  );
  const cleanUpDone = useSelector(
    (state: RootState) => state.outputEditorButtonState.cleanUpDone,
  );
  const newAsset = useSelector(
    (state: RootState) => state.outputEditorButtonState.addAsset,
  );
  let dragging: boolean = false;
  let dragStartNode: { id: number; x: number; y: number } | null = null;
  let contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  const rooms = useSelector(
    (state: RootState) => state.outputEditorButtonState.rooms,
  );
  const walls = useSelector(
    (state: RootState) => state.outputEditorButtonState.walls,
  );
  const labels = useSelector(
    (state: RootState) => state.outputEditorButtonState.labels,
  );

  const dispatch = useDispatch<AppDispatch>();
  const drawnWallsRef: React.MutableRefObject<WallWithoutId[]> = useRef([]);
  const tempRoomsRef: React.MutableRefObject<Room[]> = useRef([]);

  useEffect(() => {
    if (!cleanUpDone) return;
    if (!svgRef.current) return;
    drawnWallsRef.current = [];

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%");

    // Calculate scale factor based on the window size
    const scaleX = window.innerWidth / svgRef.current.viewBox.baseVal.width;
    const scaleY = window.innerHeight / svgRef.current.viewBox.baseVal.height;
    const scale = Math.min(scaleX, scaleY);

    // Create a group that will contain everything
    const mainGroup = svg
      .append("g")
      .attr("class", "main-group")
      .attr("transform", `scale(${scale})`);

    // Grid group
    const gridGroup = mainGroup.append("g").attr("class", "grid-group");
    drawGrid(gridGroup, svgRef);

    // Content group
    contentGroupRef.current = mainGroup
      .append("g")
      .attr("class", "content-group")
      .node();

    // Define and apply zoom behavior
    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .translateExtent([
        [0, 0],
        [window.innerWidth, window.innerHeight],
      ])
      .on("zoom", (event) => {
        zoomTransform.current = event.transform;
        mainGroup.attr("transform", event.transform);
      });

    svg.call(zoomBehavior).on("dblclick.zoom", null).on("mousedown.zoom", null);

    const drag = d3
      .drag<SVGSVGElement, unknown>()
      .on("start", () => {
        svg.on(".zoom", null);
      })
      .on("drag", (event) => {
        zoomTransform.current = d3.zoomTransform(
          svgRef.current as SVGSVGElement,
        );
        mainGroup.attr("transform", () => {
          return `translate(${zoomTransform.current.x + event.dx},${
            zoomTransform.current.y + event.dy
          }) scale(${zoomTransform.current.k})`;
        });
      })
      .on("end", () => {
        svg.call(zoomBehavior);
      });

    svg.call(drag);
    console.log(drawnWallsRef.current);
    walls?.forEach((wall) => {
      drawLine(
        wall.x1,
        wall.y1,
        wall.x2,
        wall.y2,
        false,
        contentGroup,
        wall.id,
      );
    });
    labels?.forEach((label) => {
      addRoomLabel(label.x, label.y, label.text);
    });
    dispatch(setCleanUpDone(false));
    dispatch(setCleanUpRequired(false));
  }, [cleanUpDone]);

  useEffect(() => {
    console.log("walls", walls);
  }, [walls]);
  useEffect(() => {
    console.log("rooms", rooms);
  }, [rooms]);
  //@ts-ignore
  const lineDrag: d3.DragBehavior<Element, unknown, unknown> = d3
    .drag<SVGLineElement, unknown>()
    .on("start", function (event) {
      d3.select(this).raise();
    })
    .on("drag", function (event) {
      const line = d3.select(this);
      const wall = walls?.find((wall) => wall.id === line.attr("id"));
      let minX: number = 0,
        maxX: number = 0,
        minY: number = 0,
        maxY: number = 0;

      if (wall && rooms) {
        const a = getLimits(wall, rooms);
        minX = a.minX;
        minY = a.minY;
        maxX = a.maxX;
        maxY = a.maxY;
      }
      const dx = event.dx,
        dy = event.dy;
      // vertical line constrained to move horizontally
      if (line.attr("x1") === line.attr("x2")) {
        line
          .attr("x1", Math.min(parseFloat(line.attr("x1")) + dx, maxX))
          .attr("x1", Math.max(parseFloat(line.attr("x1")) + dx, minX))
          .attr("x2", Math.min(parseFloat(line.attr("x2")) + dx, maxX))
          .attr("x2", Math.max(parseFloat(line.attr("x2")) + dx, minX));
      }
      // horizontal line constrained to move vertically
      else {
        line
          .attr("y1", Math.min(parseFloat(line.attr("y1")) + dy, maxY))
          .attr("y1", Math.max(parseFloat(line.attr("y1")) + dy, minY))
          .attr("y2", Math.min(parseFloat(line.attr("y2")) + dy, maxY))
          .attr("y2", Math.max(parseFloat(line.attr("y2")) + dy, minY));
      }
    })
    .on("end", function (event, d) {
      const line = d3.select(this);
      const newPositions = {
        id: line.attr("id"),
        x1: line.attr("x1"),
        y1: line.attr("y1"),
        x2: line.attr("x2"),
        y2: line.attr("y2"),
      };

      const wall = walls?.find((w) => w.id === line.attr("id"));
      if (wall) {
        const updatedWall: Wall = {
          ...wall,
          x1: parseFloat(newPositions.x1),
          x2: parseFloat(newPositions.x2),
          y1: parseFloat(newPositions.y1),
          y2: parseFloat(newPositions.y2),
        };
        let obj = { updatedWalls: walls, updatedRooms: rooms };
        updateWall(wall, updatedWall, obj);
        updateWalls(wall, updatedWall, obj);
      }
    });

  useEffect(() => {
    console.log(walls);
  }, [walls]);

  const updateRoom = (
    oldWall: Wall,
    newWall: Wall,
    obj: any,
    remove: boolean,
  ) => {
    const room = obj.updatedRooms.find((r: any) => r.id === oldWall.roomId);
    if (room) {
      const updatedRoomWalls: Wall[] = room.walls.filter(
        (w: any) => w.id !== oldWall.id,
      );
      updatedRoomWalls.push(newWall);
      if (!remove) {
        updatedRoomWalls.push(oldWall);
      }
      const updatedRoom: Room = { ...room, walls: updatedRoomWalls };
      obj.updatedRooms = obj.updatedRooms.filter((r: any) => r.id !== room.id);
      obj.updatedRooms.push(updatedRoom);
    }
  };

  const updateWall = (oldWall: Wall, newWall: Wall, obj: any) => {
    obj.updatedWalls = obj.updatedWalls.filter((w: any) => w.id !== oldWall.id);
    obj.updatedWalls.push(newWall);
    updateRoom(oldWall, newWall, obj, true);
  };

  const updateWalls = (oldWall: Wall, newWall: Wall, obj: any) => {
    walls?.forEach((wall) => {
      // check for perpendicular walls
      if (
        (oldWall.x1 === oldWall.x2 && wall.y1 === wall.y2) ||
        (oldWall.y1 === oldWall.y2 && wall.x1 === wall.x2)
      ) {
        if (wall.x1 === oldWall.x1 && wall.y1 === oldWall.y1) {
          const updatedWall: Wall = {
            ...wall,
            x1: newWall.x1,
            y1: newWall.y1,
          };
          updateWall(wall, updatedWall, obj);
        } else if (wall.x2 === oldWall.x1 && wall.y2 === oldWall.y1) {
          const updatedWall: Wall = {
            ...wall,
            x2: newWall.x1,
            y2: newWall.y1,
          };
          updateWall(wall, updatedWall, obj);
        } else if (wall.x1 === oldWall.x2 && wall.y1 === oldWall.y2) {
          const updatedWall: Wall = {
            ...wall,
            x1: newWall.x2,
            y1: newWall.y2,
          };
          updateWall(wall, updatedWall, obj);
        } else if (wall.x2 === oldWall.x2 && wall.y2 === oldWall.y2) {
          const updatedWall: Wall = {
            ...wall,
            x2: newWall.x2,
            y2: newWall.y2,
          };
          updateWall(wall, updatedWall, obj);
        }
      }
      // parallel
      else {
        if (
          (wall.x1 === oldWall.x1 && wall.y1 === oldWall.y1) ||
          (wall.x2 === oldWall.x1 && wall.y2 === oldWall.y1)
        ) {
          const wallToAdd: Wall = {
            id: obj.updatedWalls.length + 1,
            x1: oldWall.x1,
            y1: oldWall.y1,
            x2: newWall.x1,
            y2: newWall.y1,
            roomId: wall.roomId,
          };
          obj.updatedWalls.push(wallToAdd);
          updateRoom(wall, wallToAdd, obj, false);
        } else if (
          (wall.x1 === oldWall.x2 && wall.y1 === oldWall.y2) ||
          (wall.x2 === oldWall.x2 && wall.y2 === oldWall.y2)
        ) {
          const wallToAdd: Wall = {
            id: obj.updatedWalls.length + 1,
            x1: oldWall.x2,
            y1: oldWall.y2,
            x2: newWall.x2,
            y2: newWall.y2,
            roomId: wall.roomId,
          };
          obj.updatedWalls.push(wallToAdd);
          updateRoom(wall, wallToAdd, obj, false);
        }
      }
    });
    dispatch(setWalls(obj.updatedWalls));
    dispatch(setRooms(obj.updatedRooms));
    dispatch(setCleanUpDone(true));
  };

  const drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    drag: boolean,
    contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
    id: string,
  ) => {
    if (contentGroupRef.current)
      contentGroup = d3.select(contentGroupRef.current);
    if (drag) removeDragLine(contentGroup);

    const line = contentGroup
      .append("line")
      .attr("id", id)
      .attr("class", drag ? "drag-line" : "edge")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      //@ts-ignore
      .call(lineDrag);

    line.on("click", () => handleLineClick(id));
  };

  const removeDragLine = (
    contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  ) => {
    contentGroup?.select(".drag-line").attr("class", "drag-line").remove();
  };

  const addRoomLabel = (x: number, y: number, text: string) => {
    if (contentGroupRef.current)
      contentGroup = d3.select(contentGroupRef.current);

    let roomGroup = d3.select(contentGroupRef.current).append("g"); // Create a group for the room label
    roomGroup.attr("class", "room-label");
    let roomLabelRect = roomGroup
      .append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", 50)
      .attr("height", 15)
      .attr("fill", "#fff");

    let roomLabel = roomGroup
      .append("text")
      .attr("x", x)
      .attr("y", y)
      .text(formatLabel(text))
      .attr("class", "text");

    roomLabel.attr(
      "transform",
      `translate(${
        ((roomLabelRect?.node()?.getBBox().width || 0) -
          (roomLabel?.node()?.getBBox().width || 0)) /
        2
      }, ${roomLabel?.node()?.getBBox().height || 0})`,
    );

    roomGroup.attr(
      "transform",
      `translate(-${(roomGroup?.node()?.getBBox().width || 0) / 2}, -${
        ((roomGroup?.node()?.getBBox().height || 0) - LINEWIDTH) / 2
      })`,
    );
  };

  const addAsset = (
    width: number,
    height: number,
    contentGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
    lineId: string, // Add lineId parameter
  ) => {
    console.log("addasset called");
    if (contentGroupRef.current)
      contentGroup = d3.select(contentGroupRef.current);
    const lineSelector = `#${lineId}`;
    const line = d3.select(lineSelector);
    console.log(line);
    const x1 = parseFloat(line.attr("x1"));
    const y1 = parseFloat(line.attr("y1"));
    const x2 = parseFloat(line.attr("x2"));
    const y2 = parseFloat(line.attr("y2"));
    const centerX = x1 + width / 2;
    const centerY = y1 + height / 2;

    let rotationAngle = 0;

    // Determine if the line is vertical
    if (x1 === x2) {
      rotationAngle = 360;
    }

    console.log("addAsset");
    const asset = contentGroup
      .append("image")
      .attr("x", x1)
      .attr("y", y1)
      .attr("line-id", lineId)
      .attr("width", width)
      .attr("height", height)
      .attr("href", door)
      .attr("transform", `rotate(${rotationAngle} ${centerX} ${centerY})`);
    dispatch(setAssetType(null));
    setupAssetDrag(asset, lineId);
  };

  const setupAssetDrag = (asset: any, lineId: string) => {
    const lineSelector = `#${lineId}`;
    const line = d3.select(lineSelector);
    console.log(line);
    const x1 = parseFloat(line.attr("x1"));
    const y1 = parseFloat(line.attr("y1"));
    const x2 = parseFloat(line.attr("x2"));
    const y2 = parseFloat(line.attr("y2"));

    const drag = d3
      .drag()
      .on("start", function (event) {
        d3.select(this).raise().classed("active", true);
      })
      .on("drag", function (event) {
        // Calculate new position within line constraints
        let newX = event.x;
        let newY = event.y;

        // // Keep the asset within the bounds of the line
        if (newX < Math.min(x1, x2)) newX = Math.min(x1, x2);
        if (newX > Math.max(x1, x2)) newX = Math.max(x1, x2);
        if (newY < Math.min(y1, y2)) newY = Math.min(y1, y2);
        if (newY > Math.max(y1, y2)) newY = Math.max(y1, y2);

        // Update asset position
        d3.select(this)
          .attr("x", newX) // Adjust if you want the drag to be centered
          .attr("y", newY);
      })
      .on("end", function (event) {
        d3.select(this).classed("active", false);
      });

    asset.call(drag);
  };

  function handleLineClick(lineId: string) {
    d3.selectAll(".edge").classed("highlighted", false);
    console.log(lineId);
    const wall = walls?.find((wall) => wall.id === lineId);

    if (wall) {
      d3.select(`#${lineId}`).classed("highlighted", true);
      console.log(wall);
      // addAsset(20, 20, contentGroup, lineId);
      setSelectedLineId(lineId);
    } else {
      console.log("Line not found.");
    }
  }

  useEffect(() => {
    console.log(walls);
  }, [walls]);
  useEffect(() => {
    if (selectedLineId) addAsset(20, 20, contentGroup, selectedLineId);
    else console.log("line not selected");
  }, [newAsset]);
};
