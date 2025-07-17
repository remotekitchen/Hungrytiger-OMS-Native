import * as Updates from "expo-updates";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import OrderAcceptedModal from "./OrderAcceptedModal";
import OrderCard from "./OrderCard";
import OrderCategoryHeader from "./OrderCategoryHeader";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderEmptyCard from "./OrderEmptyCard";

export default function OrdersSection() {
  const [hasOrders, setHasOrders] = useState(true); // Toggle for demo
  const [refreshing, setRefreshing] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [acceptedVisible, setAcceptedVisible] = useState(false);
  const [accepted, setAccepted] = useState(true); // For demo, true shows accepted order

  // Demo order
  const order = { id: "125", items: 1, mins: 17, code: "XXXX-1234" };
  const acceptedOrder = {
    id: "00",
    code: "XXXX-1234",
    items: 1,
    mins: 8,
    test: true,
    status: "Rider is on the way",
  };

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
      // Optionally, reset hasOrders or navigate
    }, 3000);
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
            <OrderCategoryHeader title="New" count={hasOrders ? 1 : 0} />
            {hasOrders ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setDetailsVisible(true)}
              >
                <OrderCard order={order} />
              </TouchableOpacity>
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
          <OrderCategoryHeader title="Accepted" count={accepted ? 1 : 0} />
          {accepted ? (
            <OrderCard order={acceptedOrder} accepted />
          ) : (
            <OrderEmptyCard text="No accepted orders" />
          )}
        </View>
      </ScrollView>
      <OrderDetailsModal
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        order={order}
        onAccept={handleAccept}
      />
      <OrderAcceptedModal visible={acceptedVisible} />
    </>
  );
}
