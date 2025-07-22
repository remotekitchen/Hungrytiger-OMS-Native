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
    storePauseUnpause: builder.mutation({
      query: ({ locationId, status }) => ({
        url: `api/food/v1/location/item/?id=${locationId}`,
        method: "PATCH",
        body: {
          is_location_closed: status,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});

export const { useGetRestaurantQuery, useStorePauseUnpauseMutation } =
  restaurantApi;
