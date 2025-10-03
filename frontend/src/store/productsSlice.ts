import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../services/api'

// نوع داده برای Product
export interface Product {
    id: number
    name: string
    price: number
    description?: string
    imageUrl?: string
}

// وضعیت ممکن برای status
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

// حالت اولیه
interface ProductsState {
    items: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
}

// thunk برای گرفتن محصولات از API
export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async () => {
        const response = await api.get<Product[]>('/products/')
        return response.data
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.status = 'succeeded'
                    state.items = action.payload
                }
            )
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export default productsSlice.reducer
