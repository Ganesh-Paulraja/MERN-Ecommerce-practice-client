import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'

// ------------------------
export const Store = configureStore({
    reducer: {
        user: userSliceReducer,
    },
})