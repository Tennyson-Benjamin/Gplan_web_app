import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeEditorState, Position } from "./nodeEditor.model";
import { deleteNode } from "../nodes/nodes.slice";

const initialState: NodeEditorState = {
  nodePosition: { top: 0, left: 0 },
  clickedNodeID: "none",
  showComponent: false 
};

export const nodeEditorSlice = createSlice({
  name: "nodeEditorState",
  initialState,
  reducers: {
    updateNodeEditorPosition: (state, action: PayloadAction<Position>) => {
      state.nodePosition = action.payload;
    },
    updateNodeEditorClickedNode: (state, action: PayloadAction<number>) => {
      state.clickedNodeID = action.payload;
    },
    updateShowComponent: (state, action:PayloadAction<boolean>) => {
      state.showComponent = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteNode, (state) => {
      state.clickedNodeID = "none";
    });
  },
});

export const { updateNodeEditorPosition, updateNodeEditorClickedNode, updateShowComponent } =
  nodeEditorSlice.actions;

// Export reducer
export default nodeEditorSlice.reducer;
