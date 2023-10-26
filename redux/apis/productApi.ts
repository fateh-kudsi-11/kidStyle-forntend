import { PRODUCTS_URL } from "@/utils/constants";
import { apiSlice } from "@/redux/apiSlice";
import Product from "@/types/Product";
import { FilteringState } from "@/redux/slices/filteringSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrducts: builder.query<Product[], { filtering: FilteringState }>({
      query: ({ filtering }) => {
        const { sort, gender, directory } = filtering;
        return {
          url: PRODUCTS_URL,
          params: {
            sort,
            gender,
            category: directory,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => {
        return {
          url: `${PRODUCTS_URL}/${id}`,
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLazyGetPrductsQuery, useGetProductQuery } = productApi;
