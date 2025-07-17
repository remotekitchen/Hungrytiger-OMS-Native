import { apiSlice } from "../api/apiSlice";

export const hotelApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    bookings: builder.query({
      query: () => ({
        url: `api/hotel/v1/oms/bookings/`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    hotels: builder.query({
      query: () => ({
        url: `api/hotel/v1/manage-hotels/`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    bookingHistory: builder.query({
      query: () => ({
        url: `api/hotel/v1/oms/bookings/`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    availableRooms: builder.query({
      query: ({ hotelId, start_date, end_date }) => ({
        url: `api/hotel/v1/oms/room-types/${hotelId}/room-availability/?start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: `api/hotel/v1/bookings/create/`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["ACCOUNT"],
    }),
    hideBooking: builder.mutation({
      query: (bookingId) => ({
        url: `api/hotel/v1/bookings/${bookingId}/mark-no-show/`,
        method: "POST",
      }),
      invalidatesTags: ["ACCOUNT"],
    }),
    takePayment: builder.mutation({
      query: ({ bookingId, amount, payment_method, payment_type }) => ({
        url: `api/hotel/v1/booking-pay/${bookingId}/pay/`,
        method: "POST",
        body: {
          amount,
          payment_method,
          payment_type,
        },
      }),
      invalidatesTags: ["ACCOUNT"],
    }),
    addRoom: builder.mutation({
      query: (bookingData) => ({
        url: `api/hotel/v1/oms/room-types/`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["ACCOUNT"],
    }),
    getRooms: builder.query({
      query: () => ({
        url: `api/hotel/v1/oms/room-types/`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    checkAvailability: builder.query({
      query: ({ roomId, start_date, end_date }) => ({
        url: `api/hotel/v1/oms/room-types/${roomId}/availability-summary/?start=${start_date}&end=${end_date}`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    makeAvailable: builder.mutation({
      query: (roomData) => ({
        url: `api/hotel/v1/oms/availability/`,
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: ["ACCOUNT"],
    }),
  }),
});

export const {
  useBookingsQuery,
  useHotelsQuery,
  useAvailableRoomsQuery,
  useCreateBookingMutation,
  useHideBookingMutation,
  useTakePaymentMutation,
  useBookingHistoryQuery,
  useAddRoomMutation,
  useGetRoomsQuery,
  useCheckAvailabilityQuery,
  useMakeAvailableMutation,
} = hotelApi;
