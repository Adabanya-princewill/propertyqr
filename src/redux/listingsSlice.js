import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: JSON.parse(localStorage.getItem("listings")) || [],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    addListing: (state, action) => {
      state.listings.push(action.payload);
      localStorage.setItem("listings", JSON.stringify(state.listings));
    },
    editListing: (state, action) => {
      const index = state.listings.findIndex(
        (listing) => listing.id === action.payload.id
      );
      if (index !== -1) {
        state.listings[index] = action.payload;
        localStorage.setItem("listings", JSON.stringify(state.listings));
      }
    },
    deleteListing: (state, action) => {
      state.listings = state.listings.filter(
        (listing) => listing.id !== action.payload
      );
      localStorage.setItem("listings", JSON.stringify(state.listings));
    },
  },
});

export const { addListing, editListing, deleteListing } = listingsSlice.actions;
export default listingsSlice.reducer;
