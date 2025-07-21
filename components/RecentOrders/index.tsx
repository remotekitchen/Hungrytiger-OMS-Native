import { Search } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import FilterDropdown from "./FilterDropdown";
import { useRecentOrders } from "./hooks";
import OrderList from "./OrderList";
import Tabs from "./Tabs";

function SkeletonLoader() {
  return (
    <View className="px-4 pb-4 flex-1 justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.3, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: i * 120 }}
          className="flex-row items-center p-4 mb-2 bg-gray-100 rounded-lg"
        >
          <View className="w-10 h-10 bg-gray-300 rounded-full mr-4" />
          <View className="flex-1">
            <View className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
            <View className="h-3 bg-gray-200 rounded w-1/3 mb-1" />
            <View className="h-3 bg-gray-200 rounded w-1/4" />
          </View>
        </MotiView>
      ))}
    </View>
  );
}

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

  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (order: any) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.order_id.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <View className="p-4">
          <Tabs dateFilter={dateFilter} setDateFilter={setDateFilter} />
        </View>
        <SkeletonLoader />
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
        <View className="flex-row items-center mb-3 border border-gray-300 rounded-lg bg-gray-50 px-2">
          <Search size={20} color="#222" className="mr-2" />
          <TextInput
            className="flex-1 px-2 py-2 text-black"
            placeholder="Search By Customer Name or Order ID"
            placeholderTextColor="#222"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FilterDropdown
          filter={filter}
          setFilter={setFilter}
          orderCounts={orderCounts}
        />
      </View>
      <OrderList orders={filteredOrders} />
    </View>
  );
}
