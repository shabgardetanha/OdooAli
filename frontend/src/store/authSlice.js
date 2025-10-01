import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

// Async thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/accounts/register/`, { username, password, email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/accounts/token/`, { username, password });
      localStorage.setItem("jwt_token", res.data.access);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("jwt_token");
});

const initialState = {
  token: localStorage.getItem("jwt_token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.status = "loading"; })
      .addCase(registerUser.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(registerUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })

      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.fulfilled, (state, action) => { state.status = "succeeded"; state.token = action.payload.access; })
      .addCase(loginUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })

      .addCase(logout.fulfilled, (state) => { state.token = null; state.status = "idle"; state.error = null; });
  },
});

export default authSlice.reducer;
