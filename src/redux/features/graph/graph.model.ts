export interface FloorPlanItem {
  id: number;
  label: string;
  color: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface GraphState {
  floorPlans: FloorPlanItem[][]; // Array of arrays of floor plan items
  lastFetch: string; // Timestamp of the last fetch
  loading: boolean;
  error: string | null;
  index: number;
}
