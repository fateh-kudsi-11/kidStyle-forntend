import { WISHLIST_URL } from "@/utils/constants";
import { apiSlice } from "@/redux/apiSlice";
import WishList from "@/types/WishList";

export const wishListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWishList: builder.mutation<WishList, string>({
      query: (product) => {
        return {
          url: `${WISHLIST_URL}/create`,
          method: "POST",
          body: {
            product,
          },
        };
      },
    }),
    getWishListProductIDS: builder.query<string[], void>({
      query: () => ({
        url: `${WISHLIST_URL}/`,
      }),
    }),
    deleteWishList: builder.mutation<string, string>({
      query: (product) => ({
        url: `${WISHLIST_URL}/delete`,
        body: { product },
        method: "DELETE",
      }),
    }),
    getWishListProduct: builder.query<WishList[], void>({
      query: () => ({
        url: `${WISHLIST_URL}/products`,
      }),
    }),
  }),
});

export const {
  useCreateWishListMutation,
  useLazyGetWishListProductIDSQuery,
  useDeleteWishListMutation,
  useLazyGetWishListProductQuery,
} = wishListApi;
