import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Label, Room, Wall, WallWithoutId } from "../components/Floorplan";
import { useEffect, useRef, useState } from "react";
import { LINEWIDTH } from "../utils/constants";
import { getRandomColor } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addLabels,
  addRooms,
  addWalls,
  resetLabels,
  resetRooms,
  resetStates,
  resetWalls,
  setCleanUpDone,
  setRooms,
} from "../../../redux/features/appState";

export const useRoomCleanUp = () => {
  const [drawNow, setDrawNow] = useState<boolean>(false);
  const [roomsNow, setRoomsNow] = useState<boolean>(false);
  const index = useSelector((state: RootState) => state.graph.index);
  const floorPlans = useSelector((state: RootState) => state.graph.floorPlans);
  const walls = useSelector(
    (state: RootState) => state.outputEditorButtonState.walls,
  );
  const labels = useSelector(
    (state: RootState) => state.outputEditorButtonState.labels,
  );

  const dispatch = useDispatch<AppDispatch>();
  const floorPlan = floorPlans[index];
  const tempWalls: Wall[] = [];
  const drawnWallsRef: React.MutableRefObject<WallWithoutId[]> = useRef([]);
  const labelRef: React.MutableRefObject<Label[]> = useRef([]);
  const tempRoomsRef: React.MutableRefObject<Room[]> = useRef([]);
  const rooms = useSelector(
    (state: RootState) => state.outputEditorButtonState.rooms,
  );
  const doRoomCleanUp = useSelector(
    (state: RootState) => state.outputEditorButtonState.doRoomCleanUp,
  );
  useEffect(() => {
    if (!doRoomCleanUp) return;
    if (rooms) {
      dispatch(resetStates());
      for (let i = 0; i < floorPlan.length; i++) {
        let x1 = floorPlan[i].left * 2 + (visualViewport?.width || 0) * 0.4;
        let y1 = floorPlan[i].top * 2 + (visualViewport?.height || 0) * 0.4;
        let x2 = x1 + floorPlan[i].width * 2;
        let y2 = y1 + floorPlan[i].height * 2;
        const color = getRandomColor();

        let room: Room = {
          id: i + 1,
          name: floorPlan[i]?.label,
          walls: [],
          color,
        };
        const wallPoints = [
          { x1, y1, x2: x2, y2: y1 },
          { x1: x2, y1, x2, y2 },
          { x1, y1: y2, x2, y2 },
          { x1, y1, x2: x1, y2 },
        ];

        wallPoints.forEach((wall) => {
          let existingIndex = -1;
          drawnWallsRef.current.forEach((drawnWall, i) => {
            const isCurrentWallHorizontal = wall.y1 === wall.y2;
            const isDrawnWallHorizontal = drawnWall.y1 === drawnWall.y2;

            if (isCurrentWallHorizontal === isDrawnWallHorizontal) {
              if (wall.x1 === drawnWall.x1 && wall.y1 === drawnWall.y1) {
                if (isCurrentWallHorizontal) {
                  if (wall.x2 > drawnWall.x2) {
                    wall.x1 = drawnWall.x2;
                  } else if (wall.x2 < drawnWall.x2) {
                    drawnWallsRef.current[i].x2 = wall.x1;
                  }
                } else {
                  if (wall.y2 > drawnWall.y2) {
                    wall.y1 = drawnWall.y2;
                  } else if (wall.y2 < drawnWall.y2) {
                    drawnWallsRef.current[i].y2 = wall.y1;
                  }
                }
              }
              existingIndex = drawnWallsRef.current.findIndex(
                (dw) =>
                  (dw.x1 === wall.x1 &&
                    dw.y1 === wall.y1 &&
                    dw.x2 === wall.x2 &&
                    dw.y2 === wall.y2) ||
                  (dw.x2 === wall.x1 &&
                    dw.y2 === wall.y1 &&
                    dw.x1 === wall.x2 &&
                    dw.y1 === wall.y2),
              );
            }
          });

          if (existingIndex === -1) {
            drawnWallsRef.current.push({
              x1: wall.x1,
              y1: wall.y1,
              x2: wall.x2,
              y2: wall.y2,
              roomId: room.id,
            });
          }
        });

        tempRoomsRef.current.push(room);
        labelRef.current.push({
          x: (x1 + x2) / 2,
          y: (y1 + y2) / 2,
          text: floorPlan[i]?.label,
        });

        if (i === floorPlan.length - 1) {
          setDrawNow(true);
        }
      }
    } else {
      for (let i = 0; i < floorPlan.length; i++) {
        let x1 = floorPlan[i].left * 2 + (visualViewport?.width || 0) * 0.4;
        let y1 = floorPlan[i].top * 2 + (visualViewport?.height || 0) * 0.4;
        let x2 = x1 + floorPlan[i].width * 2;
        let y2 = y1 + floorPlan[i].height * 2;
        const color = getRandomColor();

        let room: Room = {
          id: i + 1,
          name: floorPlan[i]?.label,
          walls: [],
          color,
        };
        const wallPoints = [
          { x1, y1, x2: x2, y2: y1 },
          { x1: x2, y1, x2, y2 },
          { x1, y1: y2, x2, y2 },
          { x1, y1, x2: x1, y2 },
        ];

        wallPoints.forEach((wall) => {
          let existingIndex = -1;
          drawnWallsRef.current.forEach((drawnWall, i) => {
            const isCurrentWallHorizontal = wall.y1 === wall.y2;
            const isDrawnWallHorizontal = drawnWall.y1 === drawnWall.y2;

            if (isCurrentWallHorizontal === isDrawnWallHorizontal) {
              if (wall.x1 === drawnWall.x1 && wall.y1 === drawnWall.y1) {
                if (isCurrentWallHorizontal) {
                  if (wall.x2 > drawnWall.x2) {
                    wall.x1 = drawnWall.x2;
                  } else if (wall.x2 < drawnWall.x2) {
                    drawnWallsRef.current[i].x2 = wall.x1;
                  }
                } else {
                  if (wall.y2 > drawnWall.y2) {
                    wall.y1 = drawnWall.y2;
                  } else if (wall.y2 < drawnWall.y2) {
                    drawnWallsRef.current[i].y2 = wall.y1;
                  }
                }
              }
              existingIndex = drawnWallsRef.current.findIndex(
                (dw) =>
                  (dw.x1 === wall.x1 &&
                    dw.y1 === wall.y1 &&
                    dw.x2 === wall.x2 &&
                    dw.y2 === wall.y2) ||
                  (dw.x2 === wall.x1 &&
                    dw.y2 === wall.y1 &&
                    dw.x1 === wall.x2 &&
                    dw.y1 === wall.y2),
              );
            }
          });

          if (existingIndex === -1) {
            drawnWallsRef.current.push({
              x1: wall.x1,
              y1: wall.y1,
              x2: wall.x2,
              y2: wall.y2,
              roomId: room.id,
            });
          }
        });

        if (!tempRoomsRef.current.some((r) => r.id === room.id)) {
          tempRoomsRef.current.push(room);
          labelRef.current.push({
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2,
            text: floorPlan[i]?.label,
          });
        }

        if (i === floorPlan.length - 1) {
          setDrawNow(true);
        }
      }
    }
  }, [doRoomCleanUp]);
  useEffect(() => {
    if (drawNow) {
      drawnWallsRef.current.forEach((wall) => {
        const lineId = `line-${uuidv4()}`;
        dispatch(addWalls({ ...wall, id: lineId }));
      });
      labelRef.current.forEach((label) => {
        dispatch(addLabels(label));
      });
    }
    setRoomsNow(true);
  }, [drawNow]);
  useEffect(() => {
    if (roomsNow) {
      tempRoomsRef.current.forEach((room, index) => {
        const roomWalls = walls?.filter((wall) => wall.roomId === room.id);
        const updatedRoom = { ...room, walls: roomWalls };
        dispatch(addRooms(updatedRoom));
        tempRoomsRef.current[index] = updatedRoom;
      });
    }
    setRoomsNow(false);
    dispatch(setCleanUpDone(true));
  }, [roomsNow]);
};
