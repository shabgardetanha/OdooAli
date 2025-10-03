// frontend/src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// نوع State
interface AuthState {
    user: { id: number; username: string } | null
    token: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

// نوع payload برای registerUser
interface RegisterPayload {
    username: string
    password: string
}

// نوع پاسخ API
interface RegisterResponse {
    user: { id: number; username: string }
    token: string
}

// Async Thunk
export const registerUser = createAsyncThunk<
    RegisterResponse,
    RegisterPayload,
    { rejectValue: string }
>('auth/registerUser', async ({ username, password }, { rejectWithValue }) => {
    try {
        const res = await fetch('/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        if (!res.ok) throw new Error('Registration failed')
        const data: RegisterResponse = await res.json()
        return data
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

// State اولیه
const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
}

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<RegisterResponse>) => {
                    state.user = action.payload.user
                    state.token = action.payload.token
                    state.status = 'succeeded'
                }
            )
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || action.error.message || null
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
    },
})

export default authSlice.reducer
