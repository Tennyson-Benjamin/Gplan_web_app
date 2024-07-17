import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface AuthState {
  user: any;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

// Async thunk to refresh the token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/refresh-token", {
        //data
      });
      const newToken = response.data.accessToken;
      return newToken;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      console.log(accessToken);
      localStorage.setItem("access_token", accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload;
      localStorage.setItem("access_token", action.payload);
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.token = null;
      localStorage.removeItem("access_token");
    });
  },
});

export const  {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;   

export const seleceCurrentUser = (state: RootState) => state.auth.user;
export const seleceCurrentToken = (state:RootState) => state.auth.token;
