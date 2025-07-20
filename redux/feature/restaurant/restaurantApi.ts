import { apiSlice } from "../api/apiSlice";

export const restaurantApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRestaurant: builder.query({
      query: () => ({
        url: `api/food/v1/restaurant/`,
        method: "GET",
      }),
      providesTags: ["RESTAURANT"],
    }),
    // hideBooking: builder.mutation({
    //   query: (bookingId) => ({
    //     url: `api/hotel/v1/bookings/${bookingId}/mark-no-show/`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["ACCOUNT"],
    // }),
    // takePayment: builder.mutation({
    //   query: ({ bookingId, amount, payment_method, payment_type }) => ({
    //     url: `api/hotel/v1/booking-pay/${bookingId}/pay/`,
    //     method: "POST",
    //     body: {
    //       amount,
    //       payment_method,
    //       payment_type,
    //     },
    //   }),
    //   invalidatesTags: ["ACCOUNT"],
    // }),
  }),
});

export const { useGetRestaurantQuery } = restaurantApi;
