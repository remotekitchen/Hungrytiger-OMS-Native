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
  }),
});

export const { useGetRestaurantQuery } = restaurantApi;
