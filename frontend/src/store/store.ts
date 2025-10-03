import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'

// تعریف store
export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
})

// انواع RootState و AppDispatch برای استفاده در کامپوننت‌ها و thunk ها
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
