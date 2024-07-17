import { PayloadAction } from "@reduxjs/toolkit";
// features/yourSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { deleteNode, Nodes, updateAddNodes, updateNodeLabel } from "../nodes";

interface Room {
  name: string;
  id: number;
}

interface RoomState {
  notAdded: Room[];
  isAdded: Room[];
}

const initialState: RoomState = {
  notAdded: [],
  isAdded: [],
};

export const roomSlice = createSlice({
  name: "roomState",
  initialState,
  reducers: {
    updateDelete: (state, action: PayloadAction<number>) => {
      const roomIndex = state.isAdded.findIndex(
        (room) => room.id === action.payload,
      );

      if (roomIndex !== -1) {
        const [room] = state.isAdded.splice(roomIndex, 1);
        console.log(room);
        state.notAdded.push(room);
      }
    },
    updateAdd: (state, action: PayloadAction<number>) => {
      const roomIndex = state.notAdded.findIndex(
        (room) => room.id === action.payload,
      );

      if (roomIndex !== -1) {
        const [room] = state.notAdded.splice(roomIndex, 1);
        console.log(room);
        state.isAdded.push(room);
      }
    },
    resetRoomState: (state) => {
      state.isAdded = [];
      state.notAdded = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteNode, (state, { payload }) => {
      let roomIndex = -1;
      state.isAdded.forEach((room, index) => {
        if (room.id === payload) {
          roomIndex = index;
        } else if (room.id > payload) {
          state.isAdded[index].id--;
        }
        if (
          state.isAdded[index].id ===
          parseInt(state.isAdded[index].name) - 2
        ) {
          state.isAdded[index].name = `${state.isAdded[index].id + 1}`;
        }
      });
      if (roomIndex !== -1) {
        state.isAdded.splice(roomIndex, 1);
      }
      roomIndex = -1;
      state.notAdded.forEach((room, index) => {
        if (room.id === payload) {
          roomIndex = index;
        } else if (room.id > payload) {
          state.notAdded[index].id--;
        }
        if (
          state.notAdded[index].id ===
          parseInt(state.notAdded[index].name) - 2
        ) {
          state.notAdded[index].name = `${state.notAdded[index].id + 1}`;
        }
      });
      if (roomIndex !== -1) {
        state.notAdded.splice(roomIndex, 1);
      }
    });
    builder.addCase(updateAddNodes, (state, { payload }) => {
      state.notAdded.push({ id: payload.id, name: payload.label });
    });
    builder.addCase(updateNodeLabel, (state, { payload }) => {
      state.isAdded.forEach((room, index) => {
        if (room.id === payload.id) {
          state.isAdded[index].name = payload.label;
        }
      });
      state.notAdded.forEach((room, index) => {
        if (room.id === payload.id) {
          state.notAdded[index].name = payload.label;
        }
      });
    });
  },
});

export const { updateDelete, updateAdd, resetRoomState } = roomSlice.actions;

export default roomSlice.reducer;
