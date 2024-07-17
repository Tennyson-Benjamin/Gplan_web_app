// features/yourSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface shapeState {
  shape: string
}

const initialState: shapeState = {
  shape: "irregular"
};

export const shapeSlice = createSlice({
  name: "shapeState",
  initialState,
  reducers: {
    updateShape: (state, action: PayloadAction<string>) => {
      state.shape = action.payload;
    }
  },
});

export const  { updateShape } = shapeSlice.actions;

export default shapeSlice.reducer;
