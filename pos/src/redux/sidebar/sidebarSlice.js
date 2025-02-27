import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  cartScreen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value
    },
    toggleCartScreen: (state) => {
      state.cartScreen = !state.cartScreen
    }
  },
})

export const { toggleSidebar, toggleCartScreen } = sidebarSlice.actions

export default sidebarSlice.reducer