import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonStates } from "./appState.model";
import {
  Label,
  Room,
  Wall,
} from "../../../features/outputEditor/components/Floorplan";

const initialState: ButtonStates = {
  drawLine: false,
  rooms: undefined,
  walls: undefined,
  labels: undefined,
  addAsset: {
    assetType: null,
  },
  cleanUpDone: false,
  doRoomCleanUp: true,
};

export const outputEditorSlice = createSlice({
  name: "ouputEditorButtonState",
  initialState,
  reducers: {
    updateDrawLine: (state) => {
      state.drawLine = !state.drawLine;
    },
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      // console.log(state.rooms)
    },
    addRooms: (state, action: PayloadAction<Room>) => {
      if (state.rooms === undefined) state.rooms = [];
      state?.rooms?.push(action.payload); // Directly append the new room
    },
    setWalls: (state, action: PayloadAction<Wall[]>) => {
      state.walls = action.payload;
      console.log("setwalls");
      console.log(state.walls);
    },
    addWalls: (state, action: PayloadAction<Wall>) => {
      if (state.walls === undefined) {
        state.walls = [];
      }
      state.walls.push(action.payload);
    },
    addLabels: (state, action: PayloadAction<Label>) => {
      if (state.labels === undefined) {
        state.labels = [];
      }
      state.labels.push(action.payload); // Directly append the new wall
    },

    setAssetType: (state, action: PayloadAction<"window" | "door" | null>) => {
      state.addAsset.assetType = action.payload;
    },
    resetRooms: (state, action: PayloadAction) => {
      state.rooms = [];
    },
    resetStates: (state, action: PayloadAction) => {
      console.log(
        "reset states called",
        state.rooms,
        state.walls,
        state.labels,
      );
      state.rooms = undefined;
      state.walls = undefined;
      state.labels = undefined;
      console.log(
        "after reset states called",
        state.rooms,
        state.walls,
        state.labels,
      );
    },
    resetLabels: (state, action: PayloadAction) => {
      state.labels = [];
    },
    resetWalls: (state, action: PayloadAction) => {
      state.walls = [];
    },
    setCleanUpDone: (state, action: PayloadAction<boolean>) => {
      state.cleanUpDone = action.payload;
    },
    setCleanUpRequired: (state, action: PayloadAction<boolean>) => {
      state.doRoomCleanUp = action.payload;
    },
  },
});

export const {
  updateDrawLine,
  setRooms,
  addRooms,
  setWalls,
  addWalls,
  setAssetType,
  resetRooms,
  resetLabels,
  resetWalls,
  setCleanUpDone,
  setCleanUpRequired,
  addLabels,
  resetStates,
} = outputEditorSlice.actions;
export default outputEditorSlice.reducer;
