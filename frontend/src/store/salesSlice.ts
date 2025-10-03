import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../services/api'

export interface Sale {
    id: number
    productId: number
    quantity: number
    totalPrice: number
    // بقیه فیلدهای فروش را اضافه کنید
}

interface SalesState {
    items: Sale[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: SalesState = {
    items: [],
    status: 'idle',
}

export const fetchSales = createAsyncThunk<Sale[]>('sales/fetchSales', async () => {
    const response = await api.get('/sales/')
    return response.data
})

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSales.fulfilled, (state, action: PayloadAction<Sale[]>) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchSales.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export default salesSlice.reducer
