import { Bike } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Text, View } from "react-native";

export default function OrderCard({
  order,
  accepted = false,
}: {
  order: {
    id: string;
    items: number;
    mins: number;
    code?: string;
    test?: boolean;
    status?: string;
  };
  accepted?: boolean;
}) {
  if (accepted) {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 400 }}
        className="bg-white rounded-xl px-4 py-3 flex-row items-center min-h-[90px] mb-2 border border-gray-200 shadow-sm"
      >
        {/* Left: Order Info */}
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="font-extrabold text-lg text-black mr-2">
              #{order.id}
            </Text>
            {order.test && (
              <Text className="bg-pink-100 text-pink-600 font-bold rounded px-2 py-0.5 text-xs ml-1">
                TEST ORDER
              </Text>
            )}
          </View>
          <Text className="text-black text-base mb-1">
            {order.code} 3 {order.items} item{order.items > 1 ? "s" : ""}
          </Text>
          <View className="flex-row items-center mt-1">
            <Bike size={16} color="#222" className="mr-1" />
            <Text className="text-black text-base ml-2">
              {order.status || "Test is on the way"}
            </Text>
          </View>
        </View>
        {/* Right: Green Circle with Minutes */}
        <View className="ml-2">
          <View className="w-12 h-12 rounded-full border-2 border-green-500 items-center justify-center bg-white">
            <Text className="text-green-700 font-bold text-lg">
              {order.mins}
            </Text>
          </View>
        </View>
      </MotiView>
    );
  }
  // Default (current) card
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 400 }}
      className="bg-orange-400 rounded-xl p-5 min-w-[140px] min-h-[120px] justify-center mb-2 shadow-md"
    >
      <Text className="text-white font-bold text-xl mb-2">#{order.id}</Text>
      <Text className="text-white text-base mb-2">
        {order.items} item{order.items > 1 ? "s" : ""}
      </Text>
      <Text className="text-white text-base">{order.mins} mins</Text>
    </MotiView>
  );
}
