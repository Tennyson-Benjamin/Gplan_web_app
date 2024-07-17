import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FloorPlanItem, GraphState } from "./graph.model";
import { fetchGraphData } from "../../api/api.graph";

// Define a type for the slice state

// Initial state
const initialState: GraphState = {
  floorPlans: [],
  lastFetch: "",
  loading: false,
  error: null,
  index: 0
};

// Define a thunk for the API request

// Slice
export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setFloorPlans: (state, action: PayloadAction<FloorPlanItem[][]>) => {
      state.floorPlans = action.payload;
    },
    setLastFetch: (state, action: PayloadAction<string>) => {
      state.lastFetch = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.floorPlans = action.payload;
        state.loading = false;
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch graph data";
      });
  },
});

// Export actions
export const { setFloorPlans, setLastFetch, setLoading, setError, setIndex } =
  graphSlice.actions;

// Export reducer
export default graphSlice.reducer;
