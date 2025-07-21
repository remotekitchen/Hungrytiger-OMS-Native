import { useGetOrdersQuery } from "@/redux/feature/order/orderApi";
import { useGetRestaurantQuery } from "@/redux/feature/restaurant/restaurantApi";
import { useMemo, useState } from "react";
import { DateFilter, FilterType, Order } from "./types";

export const useRecentOrders = () => {
  const { data: getRestaurants } = useGetRestaurantQuery({});
  const restaurantId = getRestaurants?.results[0]?.id;
  const {
    data: ordersData,
    error,
    isLoading,
  } = useGetOrdersQuery({ restaurantId }, { skip: !restaurantId });

  const [dateFilter, setDateFilter] = useState<DateFilter>({
    mode: "last7days",
  });
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredOrders = useMemo(() => {
    if (!ordersData) return [];

    let orders = ordersData.results;

    if (dateFilter.mode === "last7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      orders = orders.filter(
        (order: Order) => new Date(order.created_date) >= sevenDaysAgo
      );
    } else if (dateFilter.mode === "custom" && dateFilter.range) {
      const startDate = new Date(dateFilter.range.startDate);
      const endDate = new Date(dateFilter.range.endDate);
      orders = orders.filter((order: Order) => {
        const orderDate = new Date(order.created_date);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    if (filter !== "all") {
      if (filter === "ongoing") {
        orders = orders.filter(
          (order: Order) =>
            order.status !== "completed" && order.status !== "cancelled"
        );
      } else {
        orders = orders.filter((order: Order) => order.status === filter);
      }
    }
    return orders;
  }, [ordersData, dateFilter, filter]);

  const orderCounts = useMemo(() => {
    if (!ordersData) return { all: 0, ongoing: 0, completed: 0, cancelled: 0 };

    let orders = ordersData.results;

    if (dateFilter.mode === "last7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      orders = orders.filter(
        (order: Order) => new Date(order.created_date) >= sevenDaysAgo
      );
    } else if (dateFilter.mode === "custom" && dateFilter.range) {
      const startDate = new Date(dateFilter.range.startDate);
      const endDate = new Date(dateFilter.range.endDate);
      orders = orders.filter((order: Order) => {
        const orderDate = new Date(order.created_date);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    return {
      all: orders.length,
      ongoing: orders.filter(
        (order: Order) =>
          order.status !== "completed" && order.status !== "cancelled"
      ).length,
      completed: orders.filter((order: Order) => order.status === "completed")
        .length,
      cancelled: orders.filter((order: Order) => order.status === "cancelled")
        .length,
    };
  }, [ordersData, dateFilter]);

  return {
    orders: filteredOrders,
    orderCounts,
    isLoading,
    error,
    dateFilter,
    setDateFilter,
    filter,
    setFilter,
  };
};
