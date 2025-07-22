import { Bike } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

interface OrderItem {
  id: number;
  quantity: number;
  menu_item: {
    id: number;
    name: string;
    base_price: number;
  };
}

interface Order {
  id: number;
  status: string;
  customer: string;
  order_id: string;
  total: number;
  quantity: number;
  prep_time: number;
  created_date: string;
  orderitem_set: OrderItem[];
  payment_method: string;
  subtotal: number;
  tax: number;
  discount: number;
}

export default function OrderCard({
  order,
  accepted = false,
}: {
  order: Order;
  accepted?: boolean;
}) {
  // Calculate total items
  const totalItems = order.orderitem_set.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return `BDT${amount.toFixed(2)}`;
  };

  if (accepted) {
    if (order.status === "completed") {
      return null;
    }
    const isReady = order.status === "ready_for_pickup";
    let statusLabel = "";
    let statusClass = "";
    if (isReady) {
      statusLabel = "READY";
      statusClass = "bg-green-100 text-green-600";
    } else {
      statusLabel = order.status.replace(/_/g, " ").toUpperCase();
      statusClass = "bg-pink-100 text-pink-600";
    }

    // Dynamic prep time countdown
    const acceptedTime = new Date(order.created_date).getTime();
    const [now, setNow] = useState(Date.now());
    const intervalRef = useRef<any>(null);
    useEffect(() => {
      setNow(Date.now());
      intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 60000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);
    const elapsedMinutes = Math.floor((now - acceptedTime) / 60000);
    const remaining = order.prep_time - elapsedMinutes;
    const isLate = remaining < 0;

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
            <Text
              className={`font-bold rounded px-2 py-0.5 text-xs ml-1 ${statusClass}`}
            >
              {statusLabel}
            </Text>
          </View>
          <Text className="text-black text-base mb-1">
            {order.order_id.slice(0, 8)} {totalItems} item
            {totalItems > 1 ? "s" : ""}
          </Text>
          {!isReady && (
            <View className="flex-row items-center mt-1">
              <Bike size={16} color="#222" className="mr-1" />
              <Text className="text-black text-base ml-2">
                Rider is on the way
              </Text>
            </View>
          )}
          {isReady && (
            <Text className="text-gray-600 text-sm mt-1">
              {formatCurrency(order.total)}
            </Text>
          )}
        </View>
        {/* Right: Green Circle with Minutes (only for accepted, not ready) */}
        {!isReady && (
          <View className="ml-2">
            <View
              className={`w-12 h-12 rounded-full border-2 items-center justify-center bg-white ${
                isLate ? "border-red-500 bg-red-100" : "border-green-500"
              }`}
            >
              <Text
                className={`font-bold text-lg ${
                  isLate ? "text-red-600" : "text-green-700"
                }`}
              >
                {remaining}
              </Text>
            </View>
          </View>
        )}
      </MotiView>
    );
  }

  // Default (new) card
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 400 }}
      className="bg-orange-400 rounded-xl p-5 min-w-[140px] min-h-[120px] justify-center mb-2 shadow-md"
    >
      <Text className="text-white font-bold text-xl mb-2">#{order.id}</Text>
      <Text className="text-white text-base mb-2">
        {totalItems} item{totalItems > 1 ? "s" : ""}
      </Text>
      <Text className="text-white text-base">{order.prep_time} mins</Text>
    </MotiView>
  );
}
