import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import { useGetRestaurantQuery } from "@/redux/feature/restaurant/restaurantApi";
import * as Updates from "expo-updates";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AcceptOrderModal from "./AcceptOrderModal";
import OrderCard from "./OrderCard";
import OrderCategoryHeader from "./OrderCategoryHeader";
import OrderEmptyCard from "./OrderEmptyCard";
import OrderReadyModal from "./OrderReadyModal";

export default function OrdersSection() {
  const [refreshing, setRefreshing] = useState(false);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [readyModalVisible, setReadyModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: getRestaurants } = useGetRestaurantQuery({});

  // console.log(
  //   JSON.stringify(getRestaurants?.results[0]?.name, null, 2),
  //   "get-res name"
  // );

  const restaurantName = getRestaurants?.results[0]?.name;
  const restaurantId = getRestaurants?.results[0]?.id;

  const { categorizedOrders } = useRealtimeOrders(restaurantId);

  // Helper to check if there are any orders
  const hasOrders =
    categorizedOrders.newOrders.length > 0 ||
    categorizedOrders.acceptedOrders.length > 0;

  // Reset timer and hide empty state on orders or rerender
  useEffect(() => {
    setShowEmptyState(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!hasOrders) {
      timerRef.current = setTimeout(() => {
        setShowEmptyState(true);
      }, 15000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasOrders]);

  // Reset timer on any user interaction
  const handleUserInteraction = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowEmptyState(false);
    if (!hasOrders) {
      timerRef.current = setTimeout(() => {
        setShowEmptyState(true);
      }, 15000);
    }
  };

  // Auto open AcceptOrderModal when a new order arrives
  useEffect(() => {
    if (
      categorizedOrders.newOrders.length > 0 &&
      !acceptModalVisible &&
      (!selectedOrder || selectedOrder.id !== categorizedOrders.newOrders[0].id)
    ) {
      setSelectedOrder(categorizedOrders.newOrders[0]);
      setAcceptModalVisible(true);
    }
  }, [categorizedOrders.newOrders, acceptModalVisible, selectedOrder]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Updates.reloadAsync();
    } catch {
      // handle error silently
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleReadyForDelivery = () => {
    setReadyModalVisible(false);
    // Handle ready for delivery logic here
  };

  const handleOrderPress = (order: any, type: "new" | "accepted") => {
    setSelectedOrder(order);
    if (type === "new") {
      setAcceptModalVisible(true);
    } else if (type === "accepted") {
      setReadyModalVisible(true);
    }
  };

  if (showEmptyState && !hasOrders) {
    return (
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 48,
        }}
        scrollEventThrottle={16}
      >
        <Image
          source={require("../assets/images/bg.png")}
          style={{ width: 120, height: 120, marginBottom: 24 }}
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-black text-center mb-2">
          No active orders
        </Text>
        <Text className="text-center text-gray-700 mb-6 px-6">
          Use this time efficiently: Increase your profits by keeping your
          business up to date.
        </Text>
        <View className="w-full px-4">
          <View className="flex-row mb-3">
            <TouchableOpacity
              className="flex-1 bg-yellow-200 rounded-xl shadow p-4 mr-2 items-center"
              onPress={() => {
                /* TODO: handle update menu */
              }}
            >
              <Text className="text-yellow-700 text-2xl mb-1">🍽️</Text>
              <Text className="font-bold text-base text-yellow-700 mb-1 text-center">
                Update your menu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-orange-100 rounded-xl shadow p-4 ml-2 items-center"
              onPress={() => {
                /* TODO: handle avoidable wait time */
              }}
            >
              <Text className="text-orange-500 text-2xl mb-1">🕒</Text>
              <Text className="font-bold text-base text-orange-500 mb-1 text-center">
                Avoidable wait time
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row mb-3">
            <TouchableOpacity
              className="flex-1 bg-yellow-200 rounded-xl shadow p-4 mr-2 items-center"
              onPress={() => {
                /* TODO: handle check performance */
              }}
            >
              <Text className="text-yellow-700 text-2xl mb-1">📈</Text>
              <Text className="font-bold text-base text-yellow-700 mb-1 text-center">
                Check your Performance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-orange-100 rounded-xl shadow p-4 ml-2 items-center"
              onPress={() => {
                /* TODO: handle see new features */
              }}
            >
              <Text className="text-orange-500 text-2xl mb-1">✨</Text>
              <Text className="font-bold text-base text-orange-500 mb-1 text-center">
                See new Features
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-yellow-200 rounded-xl shadow p-4 items-center"
            onPress={() => {
              /* TODO: handle help center */
            }}
          >
            <Text className="text-yellow-700 text-2xl mb-1">ℹ️</Text>
            <Text className="font-bold text-base text-yellow-700 mb-1">
              Visit our Help Center
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-white pt-4 px-3"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FB923C"]}
            progressBackgroundColor="#fff"
          />
        }
        onTouchStart={handleUserInteraction}
        onScroll={handleUserInteraction}
        scrollEventThrottle={16}
      >
        {/* Top row: New & Upcoming */}
        <View className="flex-row justify-between mb-6">
          <View className="flex-1 mr-2">
            <OrderCategoryHeader
              title="New"
              count={categorizedOrders.newOrders.length}
            />
            {categorizedOrders.newOrders.length > 0 ? (
              categorizedOrders.newOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  activeOpacity={0.85}
                  onPress={() => handleOrderPress(order, "new")}
                >
                  <OrderCard order={order} />
                </TouchableOpacity>
              ))
            ) : (
              <OrderEmptyCard text="No new orders" />
            )}
          </View>
          <View className="flex-1 ml-2">
            <OrderCategoryHeader title="Upcoming" count={0} />
            <OrderEmptyCard text="No upcoming orders" />
          </View>
        </View>

        {/* Accepted row */}
        <View className="mt-2">
          <OrderCategoryHeader
            title="Accepted"
            count={categorizedOrders.acceptedOrders.length}
          />
          {categorizedOrders.acceptedOrders.length > 0 ? (
            categorizedOrders.acceptedOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                activeOpacity={0.85}
                onPress={() => handleOrderPress(order, "accepted")}
              >
                <OrderCard order={order} accepted />
              </TouchableOpacity>
            ))
          ) : (
            <OrderEmptyCard text="No accepted orders" />
          )}
        </View>
      </ScrollView>

      {selectedOrder && (
        <>
          <AcceptOrderModal
            restaurantName={restaurantName}
            visible={acceptModalVisible}
            onClose={() => setAcceptModalVisible(false)}
            order={selectedOrder}
          />
          <OrderReadyModal
            restaurantName={restaurantName}
            visible={readyModalVisible}
            onClose={() => setReadyModalVisible(false)}
            order={selectedOrder}
            onReadyForDelivery={handleReadyForDelivery}
          />
        </>
      )}
    </>
  );
}
