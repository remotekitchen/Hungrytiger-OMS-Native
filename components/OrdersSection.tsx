import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import { useGetRestaurantQuery } from "@/redux/feature/restaurant/restaurantApi";
import * as Updates from "expo-updates";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
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

  const { data: getRestaurants } = useGetRestaurantQuery({});

  // console.log(
  //   JSON.stringify(getRestaurants?.results[0]?.name, null, 2),
  //   "get-res name"
  // );

  const restaurantName = getRestaurants?.results[0]?.name;
  const restaurantId = getRestaurants?.results[0]?.id;

  const { categorizedOrders } = useRealtimeOrders(restaurantId);

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
