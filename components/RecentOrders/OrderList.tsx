import React from "react";
import { FlatList, Text, View } from "react-native";
import OrderItem from "./OrderItem";
import { Order } from "./types";

export default function OrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-500">No orders found.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
}
