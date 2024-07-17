import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Links, Nodes, NodesState } from "./nodes.model";

const initialState: NodesState = {
  nodes: [],
  links: [],
};

export const nodesSlice = createSlice({
  name: "nodesState",
  initialState,
  reducers: {
    updateAddNodes: (state, action: PayloadAction<Nodes>) => {
      state.nodes.push(action.payload);
    },
    updateAddLinks: (state, action: PayloadAction<Links>) => {
      state.links.push(action.payload);
    },
    updateResetBoard: (state, action: PayloadAction) => {
      state.nodes = [];
      state.links = [];
    },
    updateNodeLabel: (
      state,
      action: PayloadAction<{ id: number; label: string }>,
    ) => {
      state.nodes[action.payload.id].label = action.payload.label;
    },
    updateNodeWidth: (
      state,
      action: PayloadAction<{ id: number; max: number; min: number }>,
    ) => {
      const index = state.nodes.findIndex((node) => {
        return node.id === action.payload.id;
      });

      state.nodes[index].width.max = action.payload.max;
      state.nodes[index].width.min = action.payload.min;
    },
    updateNodeHeight: (
      state,
      action: PayloadAction<{ id: number; max: number; min: number }>,
    ) => {
      const index = state.nodes.findIndex((node) => {
        return node.id === action.payload.id;
      });

      console.log(index);
      console.log(state.nodes[index]);

      state.nodes[index].height.max = action.payload.max;
      state.nodes[index].height.min = action.payload.min;
    },
    updateNodeRatio: (
      state,
      action: PayloadAction<{ id: number; max: number; min: number }>,
    ) => {
      const index = state.nodes.findIndex((node) => {
        return node.id === action.payload.id;
      });

      state.nodes[index].ratio.max = action.payload.max;
      state.nodes[index].ratio.min = action.payload.min;
    },
    deleteNode: (state, action: PayloadAction<number>) => {
      let newNodes = <any>[];
      let newLinks = <any>[];

      state.links.forEach((link) => {
        if (link.source !== action.payload && link.target !== action.payload) {
          let indexedLink = {};
          if (link.source > action.payload) {
            indexedLink = { ...link, source: link.source - 1 };
          } else {
            indexedLink = { ...link };
          }

          if (link.target > action.payload) {
            indexedLink = { ...indexedLink, target: link.target - 1 };
          } else {
            indexedLink = { ...indexedLink };
          }

          newLinks.push(indexedLink);
        }
      });

      let count = 0;
      state.nodes.forEach((node) => {
        if (node.id < action.payload) {
          newNodes.push(node);
        }

        if (node.id > action.payload) {
          count = count + 1;
          newNodes.push({
            ...node,
            id: node.id - 1,
            label:
              node.label === `${node.id + 1}`
                ? `${parseInt(node.label) - 1}`
                : node.label,
          });
        }
      });

      state.links = newLinks;
      state.nodes = newNodes;
    },
    updateLinks: (state, action: PayloadAction<Links[]>) => {
      state.links = action.payload;
    },
    resetNodesState: (state) => {
      state.nodes = [];
      state.links = [];
    },
  },
});

export const {
  updateAddNodes,
  updateAddLinks,
  updateResetBoard,
  updateNodeHeight,
  updateNodeRatio,
  updateNodeWidth,
  deleteNode,
  updateNodeLabel,
  resetNodesState,
  updateLinks,
} = nodesSlice.actions;

// Export reducer
export default nodesSlice.reducer;
