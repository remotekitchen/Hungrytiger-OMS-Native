import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import {
  selectToken,
  selectUser,
} from "@/redux/feature/authentication/authenticationSlice";
import { useGetRestaurantQuery } from "@/redux/feature/restaurant/restaurantApi";
import * as Updates from "expo-updates";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import OrderAcceptedModal from "./OrderAcceptedModal";
import OrderCard from "./OrderCard";
import OrderCategoryHeader from "./OrderCategoryHeader";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderEmptyCard from "./OrderEmptyCard";
import OrderReadyModal from "./OrderReadyModal";

export default function OrdersSection() {
  const [refreshing, setRefreshing] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [acceptedVisible, setAcceptedVisible] = useState(false);
  const [readyModalVisible, setReadyModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const { data: getRestaurants } = useGetRestaurantQuery({});

  const restaurantId = getRestaurants?.results[0]?.id;

  const { categorizedOrders, error, isLoading } =
    useRealtimeOrders(restaurantId);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Updates.reloadAsync();
    } catch (e) {
      // handle error
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleAccept = () => {
    setDetailsVisible(false);
    setAcceptedVisible(true);
    setTimeout(() => {
      setAcceptedVisible(false);
    }, 3000);
  };

  const handleReadyForDelivery = () => {
    setReadyModalVisible(false);
    // Handle ready for delivery logic here
  };

  const handleOrderPress = (order: any, type: "new" | "accepted") => {
    setSelectedOrder(order);
    if (type === "new") {
      setDetailsVisible(true);
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
          <OrderDetailsModal
            visible={detailsVisible}
            onClose={() => setDetailsVisible(false)}
            order={selectedOrder}
            onAccept={handleAccept}
          />
          <OrderReadyModal
            visible={readyModalVisible}
            onClose={() => setReadyModalVisible(false)}
            order={selectedOrder}
            onReadyForDelivery={handleReadyForDelivery}
          />
        </>
      )}

      <OrderAcceptedModal visible={acceptedVisible} />
    </>
  );
}
