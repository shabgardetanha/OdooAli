import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface PurchaseOrder {
    id: number
    product_name: string
    quantity: number
    status: 'pending' | 'approved' | 'shipped'
    company: number
}

interface PurchaseState {
    items: PurchaseOrder[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error?: string | null
}

const initialState: PurchaseState = {
    items: [],
    status: 'idle',
    error: null,
}

export const fetchPurchaseOrders = createAsyncThunk(
    'purchase/fetchPurchaseOrders',
    async () => {
        const response = await axios.get<PurchaseOrder[]>('/api/purchase_orders/')
        return response.data
    }
)

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        updatePurchaseOrder: (state, action: PayloadAction<PurchaseOrder>) => {
            const index = state.items.findIndex((p) => p.id === action.payload.id)
            if (index >= 0) state.items[index] = action.payload
            else state.items.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchaseOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchPurchaseOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Failed to fetch'
            })
    },
})

export const { updatePurchaseOrder } = purchaseSlice.actions
export default purchaseSlice.reducer
