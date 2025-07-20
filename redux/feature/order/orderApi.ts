import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ restaurantId }) => ({
        url: `api/billing/v1/order/merchant/`,
        method: "GET",
        params: {
          restaurant: restaurantId,
        },
      }),
      providesTags: ["ORDER"],
      // Keep cache for 30 seconds
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
