import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface graphDataInterface {
  multiple: boolean;
  rectangular: boolean;
  nodes: { id: number; x: number; y: number; label: string; color: string }[];
  edges: { source: number; target: number }[];
}

export const fetchGraphData = createAsyncThunk(
  "graph/fetchGraphData",
  async ({
    graphData,
    type,
  }: {
    graphData: graphDataInterface;
    type: string;
  }) => {
    console.log(graphData);
    const response = await axios.post(
      `https://api.gplan.in/api/generate/${type}`,
      graphData,
    );
    return response.data.floorplans;
  },
);
