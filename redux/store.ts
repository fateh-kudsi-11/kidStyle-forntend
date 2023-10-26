import { configureStore } from "@reduxjs/toolkit";
import filteringSlice from "./slices/filteringSlice";
import authSlice from "./slices/authSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    filtering: filteringSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
