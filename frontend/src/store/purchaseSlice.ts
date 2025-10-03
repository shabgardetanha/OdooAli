import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../services/api'

// نوع داده سفارش خرید
interface Purchase {
    id: number
    productId: number
    quantity: number
    total: number
    status: 'pending' | 'completed' | 'canceled'
    // بقیه فیلدها...
}

// نوع state
interface PurchasesState {
    items: Purchase[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: PurchasesState = {
    items: [],
    status: 'idle',
}

// Thunk برای گرفتن لیست سفارش‌ها
export const fetchPurchases = createAsyncThunk<Purchase[]>(
    'purchases/fetchPurchases',
    async () => {
        const response = await api.get('/purchases/')
        return response.data
    }
)

// Slice
const purchaseSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchases.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                fetchPurchases.fulfilled,
                (state, action: PayloadAction<Purchase[]>) => {
                    state.status = 'succeeded'
                    state.items = action.payload
                }
            )
            .addCase(fetchPurchases.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export default purchaseSlice.reducer
