// features/yourSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface YourState {
  value: number;
}

const initialState: YourState = {
  value: 0,
};

export const yourSlice = createSlice({
  name: "yourSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = yourSlice.actions;

// export const selectYourValue = (state: RootState) => state.yourSlice.value;

export default yourSlice.reducer;
