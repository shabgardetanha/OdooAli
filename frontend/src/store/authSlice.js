import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register/`, userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, userData);
      localStorage.setItem("token", response.data.access);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem("token") || null, status: null, error: null },
  reducers: { logout: (state) => { state.user = null; state.token = null; localStorage.removeItem("token"); } },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.status = "loading"; })
      .addCase(registerUser.fulfilled, (state, action) => { state.status = "succeeded"; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.fulfilled, (state, action) => { state.status = "succeeded"; state.token = action.payload.access; })
      .addCase(loginUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
