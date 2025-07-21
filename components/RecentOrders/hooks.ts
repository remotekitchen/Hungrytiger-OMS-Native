import { useOrderHistoryQuery } from "@/redux/feature/order/orderApi";
import { useMemo, useState } from "react";
import { DateFilter, FilterType, Order } from "./types";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const useRecentOrders = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    mode: "last7days",
  });
  const [filter, setFilter] = useState<FilterType>("all");

  const queryParams = useMemo(() => {
    const endDate = new Date();
    if (dateFilter.mode === "last7days") {
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      return {
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      };
    } else if (dateFilter.mode === "custom" && dateFilter.range) {
      return {
        start_date: dateFilter.range.startDate,
        end_date: dateFilter.range.endDate,
      };
    }
    return {
      start_date: "",
      end_date: "",
    };
  }, [dateFilter]);

  const {
    data: ordersData,
    error,
    isLoading,
  } = useOrderHistoryQuery(queryParams, { skip: !queryParams.start_date });

  const filteredOrders = useMemo(() => {
    if (!ordersData) return [];
    let orders = ordersData.results;
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
  }, [ordersData, filter]);

  const orderCounts = useMemo(() => {
    if (!ordersData) return { all: 0, ongoing: 0, completed: 0, cancelled: 0 };
    const orders = ordersData.results;
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
  }, [ordersData]);

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
