import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// تعریف نوع داده برای وضعیت Auth
interface AuthState {
    token: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

// تعریف نوع داده برای پارامترهای login/register
interface AuthPayload {
    username: string
    password: string
    apiUrl: string
}

// مقدار اولیه state
const initialState: AuthState = {
    token: null,
    status: 'idle',
    error: null,
}

// Thunks
export const registerUser = createAsyncThunk<
    any, // پاسخ سرور
    AuthPayload,
    { rejectValue: string }
>('auth/registerUser', async ({ username, password, apiUrl }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiUrl}/accounts/register/`, {
            username,
            password,
        })
        return response.data
    } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message)
    }
})

export const loginUser = createAsyncThunk<
    string, // توکن
    AuthPayload,
    { rejectValue: string }
>('auth/loginUser', async ({ username, password, apiUrl }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiUrl}/accounts/token/`, {
            username,
            password,
        })
        return response.data.access
    } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message)
    }
})

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded'
                state.token = action.payload
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
