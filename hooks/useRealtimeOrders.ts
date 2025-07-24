import { useGetOrdersQuery } from "@/redux/feature/order/orderApi";
import { useEffect, useRef } from "react";

interface Order {
  id: number;
  status: string;
  customer: string;
  order_id: string;
  total: number;
  quantity: number;
  prep_time: number;
  created_date: string;
  orderitem_set: Array<{
    id: number;
    quantity: number;
    menu_item: {
      id: number;
      name: string;
      base_price: number;
    };
  }>;
  payment_method: string;
  subtotal: number;
  tax: number;
  discount: number;
}

interface OrdersResponse {
  count: number;
  results: Order[];
}

export const useRealtimeOrders = (restaurantId: number | undefined) => {
  const {
    data: ordersData,
    error,
    isLoading,
    refetch,
  } = useGetOrdersQuery({ restaurantId }, { skip: !restaurantId });

  const intervalRef = useRef<number | null>(null);

  // Set up polling
  useEffect(() => {
    if (restaurantId) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        refetch();
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [restaurantId, refetch]);

  // Categorize orders by status
  const categorizeOrders = (orders: Order[]) => {
    const newOrders = orders.filter((order) => order.status === "pending");
    const acceptedOrders = orders.filter(
      (order) => order.status !== "pending" && order.status !== "completed"
    );
    // Add counts for each status
    const statusCounts = {
      pending: orders.filter((order) => order.status === "pending").length,
      accepted: orders.filter((order) => order.status === "accepted").length,
      driver_assigned: orders.filter(
        (order) => order.status === "driver_assigned"
      ).length,
      ready_for_pickup: orders.filter(
        (order) => order.status === "ready_for_pickup"
      ).length,
    };
    return {
      newOrders,
      acceptedOrders,
      statusCounts,
    };
  };

  const categorizedOrders = ordersData?.results
    ? categorizeOrders(ordersData.results)
    : {
        newOrders: [],
        acceptedOrders: [],
        statusCounts: {
          pending: 0,
          accepted: 0,
          driver_assigned: 0,
          ready_for_pickup: 0,
        },
      };

  return {
    orders: ordersData?.results || [],
    categorizedOrders,
    error,
    isLoading,
    refetch,
  };
};
