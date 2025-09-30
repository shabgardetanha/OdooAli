import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    const res = await fetch('/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'succeeded';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
