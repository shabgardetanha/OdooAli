// frontend/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import stockReducer from './stockSlice'
import salesReducer from './salesSlice'
import purchaseReducer from './purchaseSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        stock: stockReducer,
        sales: salesReducer,
        purchase: purchaseReducer,
    },
})

// نوع RootState برای استفاده در useSelector
export type RootState = ReturnType<typeof store.getState>
// نوع AppDispatch برای استفاده در useDispatch
export type AppDispatch = typeof store.dispatch
