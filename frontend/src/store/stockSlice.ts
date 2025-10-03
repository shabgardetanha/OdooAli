import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../services/api'

interface StockItem {
    id: number
    productId: number
    quantity: number
    location: string
    // بقیه فیلدهای موجودی...
}

interface StockState {
    items: StockItem[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: StockState = {
    items: [],
    status: 'idle',
}

export const fetchStock = createAsyncThunk<StockItem[]>(
    'stock/fetchStock',
    async () => {
        const response = await api.get('/stock/')
        return response.data
    }
)

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStock.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                fetchStock.fulfilled,
                (state, action: PayloadAction<StockItem[]>) => {
                    state.status = 'succeeded'
                    state.items = action.payload
                }
            )
            .addCase(fetchStock.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export default stockSlice.reducer
