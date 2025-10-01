import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password, apiUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/accounts/register/`, { username, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, apiUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/accounts/token/`, { username, password });
      return response.data.access;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, status: "idle", error: null },
  reducers: {
    logout: (state) => { state.token = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.status = "loading"; })
      .addCase(registerUser.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(registerUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.fulfilled, (state, action) => { state.status = "succeeded"; state.token = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
