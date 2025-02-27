import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
  openingShift: {},
  customer: "",
  invoiceName: "",
};

export const posdetailSlice = createSlice({
  name: "posprofile",
  initialState,
  reducers: {
    setPosProfile: (state, action) => {
      state.value = action.payload;
    },
    setOpeningShift: (state, action) => {
      state.openingShift = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setInvoiceName: (state, action) => {
      state.invoiceName = action.payload;
    },
  },
});

export const { setPosProfile, setOpeningShift, setCustomer, setInvoiceName } =
  posdetailSlice.actions;

export default posdetailSlice.reducer;
