import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";
import MenuCategoryList from "./MenuPage/MenuCategoryList";
import UnavailableProductsBanner from "./MenuPage/UnavailableProductsBanner";

export default function MenuPage() {
  // Placeholder/mock data
  const unavailableCount = 11;
  const categories = [
    { name: "Rice", count: 4 },
    { name: "Snacks", count: 2 },
    { name: "Combo", count: 1 },
    { name: "Curry", count: 1 },
    { name: "Drinks", count: 2 },
    { name: "Set Meal", count: 1 },
  ];

  return (
    <View className="flex-1 bg-white px-3 pt-6">
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <UnavailableProductsBanner count={unavailableCount} />
      </MotiView>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 200 }}
      >
        <MenuCategoryList categories={categories} />
      </MotiView>
    </View>
  );
}
