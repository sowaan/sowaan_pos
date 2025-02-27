import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebar/sidebarSlice'
import posdetailReducer from './posdetails/posdetailSlice'
import itemsReducer from './Items/items'

export const store = configureStore({
    reducer: {
        // Define a top-level state field named `sidebar`, handled by `sidebarSlice`
        sidebar: sidebarReducer,
        posprofile: posdetailReducer,
        items: itemsReducer,
    },
})