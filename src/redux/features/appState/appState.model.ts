import {
  Label,
  Room,
  Wall,
} from "../../../features/outputEditor/components/Floorplan";

export interface ButtonStates {
  drawLine: boolean;
  rooms: Room[] | undefined;
  walls: Wall[] | undefined;
  labels: Label[] | undefined;
  addAsset: {
    assetType: "window" | "door" | null;
  };
  cleanUpDone: boolean;
  doRoomCleanUp: boolean;
}
