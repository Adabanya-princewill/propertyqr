import { createSlice } from "@reduxjs/toolkit";

const realtorSlice = createSlice({
  name: "realtor",
  initialState: { savedListings: [] },
  reducers: {
    saveListing(state, action) {
      state.savedListings.push(action.payload);
    },
  },
});

export const { saveListing } = realtorSlice.actions;
export default realtorSlice.reducer;
