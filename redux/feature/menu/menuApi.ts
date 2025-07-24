import { apiSlice } from "../api/apiSlice";

export const menuApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `api/food/v1/category/?page=1&page_size=20`,
        method: "GET",
      }),
      providesTags: ["MENU"],
    }),
    getItems: builder.query({
      query: ({ restaurantId }) => ({
        url: `api/food/v2/menu-item/?restaurant=${restaurantId}`,
        method: "GET",
      }),
      providesTags: ["MENU"],
    }),
    getItemsV1: builder.query({
      query: ({ menuId }) => ({
        url: `api/food/v1/menu/item/?id=${menuId}`,
        method: "GET",
      }),
      providesTags: ["MENU"],
    }),
    getMenuId: builder.query({
      query: () => ({
        url: `api/food/v1/menu`,
        method: "GET",
      }),
      providesTags: ["MENU"],
    }),

    availableUnavailableItem: builder.mutation({
      query: ({ itemId, today, indefinite }) => ({
        url: `api/food/v1/menu-item/availability/`,
        method: "PATCH",
        body: {
          itemId: itemId,
          indefinite: indefinite,
          today: today,
        },
      }),
      invalidatesTags: ["MENU"],
    }),
    updateItem: builder.mutation({
      query: ({ itemId, name, description, base_price, category }) => ({
        url: `api/food/v1/menu-item/item/?id=${itemId}`,
        method: "PATCH",
        body: {
          name,
          description,
          base_price,
          category,
        },
      }),
      invalidatesTags: ["MENU"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetItemsQuery,
  useGetMenuIdQuery,
  useGetItemsV1Query,
  useAvailableUnavailableItemMutation,
  useUpdateItemMutation,
} = menuApi;
