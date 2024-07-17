// features/toast/toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  isVisible: boolean;
  message: string;
  type: "success" | "error" | "warning";
}

const initialState: ToastState = {
  isVisible: false,
  message: "",
  type: "success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; type: ToastState["type"] }>,
    ) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
      state.isVisible = false;
      state.message = "";
      state.type = "success"; // Default type
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
