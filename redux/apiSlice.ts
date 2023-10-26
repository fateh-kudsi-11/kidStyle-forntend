import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/utils/constants";
import { retrieveTokenFromStorage } from "@/utils/storageHelpers";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await retrieveTokenFromStorage();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "WishList"],
  endpoints: (builder) => ({}),
});
