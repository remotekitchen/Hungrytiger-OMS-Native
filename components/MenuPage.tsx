import {
  useGetCategoryQuery,
  useGetItemsV1Query,
  useGetMenuIdQuery,
} from "@/redux/feature/menu/menuApi";
import { useGetRestaurantQuery } from "@/redux/feature/restaurant/restaurantApi";
import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";
import MenuCategoryList from "./MenuPage/MenuCategoryList";

export default function MenuPage() {
  // Placeholder/mock data
  const unavailableCount = 11;

  const { data: restaurantData } = useGetRestaurantQuery({});
  const restaurantId = restaurantData?.results[0]?.id;

  // Fetch categories from API
  const { data: categoryData, isLoading, isError } = useGetCategoryQuery({});

  const { data: getMenuId } = useGetMenuIdQuery({});
  // console.log(JSON.stringify(getItemV1?.results[0]?.id, null, 2), "getItemV1");
  const menuId = getMenuId?.results[0]?.id;
  console.log(JSON.stringify(menuId, null, 2), "getMenuId");

  const {
    data: getItemsV1,
    isLoading: isItemsV1Loading,
    isError: isItemsV1Error,
  } = useGetItemsV1Query({ menuId: menuId });
  // console.log(JSON.stringify(getItemsV1, null, 2), "getItemsV1");

  // Prepare categories from API
  const categories = categoryData?.results || [];

  return (
    <View className="flex-1 bg-white px-3 pt-6">
      {/* <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <UnavailableProductsBanner count={unavailableCount} />
      </MotiView> */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 200 }}
      >
        <MenuCategoryList
          categories={categories}
          items={getItemsV1?.menuitem_set}
          isLoading={isLoading}
          isError={isError}
        />
      </MotiView>
    </View>
  );
}
