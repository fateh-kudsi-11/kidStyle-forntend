import { ORDER_URL } from "@/utils/constants";
import { apiSlice } from "@/redux/apiSlice";
import OrderItem, { CreateOrderReq } from "@/types/OrderItem";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderItem, CreateOrderReq>({
      query: (payload) => ({
        url: `${ORDER_URL}/create`,
        method: "POST",
        body: payload,
      }),
    }),
    getOrderItems: builder.query<OrderItem[], void>({
      query: () => ({
        url: `${ORDER_URL}/`,
        method: "GET",
      }),
    }),
    updateQty: builder.mutation<OrderItem, { orderId: string; qty: number }>({
      query: ({ orderId, qty }) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: "PUT",
        body: {
          qty,
        },
      }),
    }),
    deleteOrderItem: builder.mutation<string, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${ORDER_URL}/delete/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderItemsQuery,
  useUpdateQtyMutation,
  useDeleteOrderItemMutation,
} = orderApi;
