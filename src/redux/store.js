import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import listingsReducer from "./listingsSlice";
import realtorReducer from "./realtorSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    realtor: realtorReducer,
  },
});
