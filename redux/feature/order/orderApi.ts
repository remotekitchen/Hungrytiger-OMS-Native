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

    acceptOrder: builder.mutation({
      query: ({ orderId, status, prep_time }) => ({
        url: `api/billing/v2/order/item/?id=${orderId}`,
        method: "PATCH",
        body: {
          status: status,
          prep_time: prep_time,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),

    rejectOrder: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `api/billing/v2/order/item/?id=${orderId}`,
        method: "PATCH",
        body: {
          status: status,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),
    readyForPickup: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `api/billing/v2/order/item/?id=${orderId}`,
        method: "PATCH",
        body: {
          status: status,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),
    receivedPayment: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `api/billing/v2/order/item/?id=${orderId}`,
        method: "PATCH",
        body: {
          status: status,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),

    // order list

    orderHistory: builder.query({
      query: ({ start_date, end_date }) => ({
        url: `api/billing/v1/order/merchant/?history=true&page_size=300&start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      providesTags: ["ORDER"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAcceptOrderMutation,
  useRejectOrderMutation,
  useReadyForPickupMutation,
  useReceivedPaymentMutation,
  useOrderHistoryQuery,
} = ordersApi;
