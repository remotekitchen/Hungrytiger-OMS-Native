import * as Updates from "expo-updates";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
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

  // Demo order
  const order = { id: "125", items: 1, mins: 17, code: "XXXX-1234" };

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
        style={styles.container}
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
        <View style={styles.row}>
          <View style={styles.col}>
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
          <View style={styles.col}>
            <OrderCategoryHeader title="Upcoming" count={0} />
            <OrderEmptyCard text="No upcoming orders" />
          </View>
        </View>
        {/* Accepted row */}
        <View style={styles.acceptedRow}>
          <OrderCategoryHeader title="Accepted" count={0} />
          <OrderEmptyCard text="No accepted orders" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  col: {
    flex: 1,
    marginRight: 8,
  },
  acceptedRow: {
    marginTop: 8,
  },
});
