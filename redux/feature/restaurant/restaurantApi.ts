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
    getMenuOpeningHours: builder.query({
      query: ({ restaurantId, locationId }) => ({
        url: `api/food/v1/menu/?restaurant=${restaurantId}&location=${locationId}&page_size=20&page=1`,
        method: "GET",
      }),
      providesTags: ["RESTAURANT"],
    }),
    storePauseUnpause: builder.mutation({
      query: ({ locationId, status }) => ({
        url: `api/food/v1/location/item/?id=${locationId}`,
        method: "PATCH",
        body: {
          is_location_closed: status,
        },
      }),
      invalidatesTags: ["RESTAURANT"],
    }),
    updateMenuOpeningHours: builder.mutation({
      query: ({ menuId, opening_hours }) => ({
        url: `api/food/v1/menu/item/?id=${menuId}`,
        method: "PATCH",
        body: {
          opening_hours: opening_hours,
        },
      }),
      invalidatesTags: ["RESTAURANT"],
    }),
  }),
});

export const {
  useGetRestaurantQuery,
  useStorePauseUnpauseMutation,
  useGetMenuOpeningHoursQuery,
  useUpdateMenuOpeningHoursMutation,
} = restaurantApi;
