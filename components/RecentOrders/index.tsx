import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterDropdown from "./FilterDropdown";
import { useRecentOrders } from "./hooks";
import OrderList from "./OrderList";
import Tabs from "./Tabs";

export default function RecentOrders() {
  const {
    orders,
    orderCounts,
    isLoading,
    error,
    dateFilter,
    setDateFilter,
    filter,
    setFilter,
  } = useRecentOrders();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading orders.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <Tabs dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </View>
      <View className="px-4 pb-4">
        <FilterDropdown
          filter={filter}
          setFilter={setFilter}
          orderCounts={orderCounts}
        />
      </View>
      <OrderList orders={orders} />
    </View>
  );
}
