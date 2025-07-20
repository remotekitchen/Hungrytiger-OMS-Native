import { useGetOrdersQuery } from "@/redux/feature/order/orderApi";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

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
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previousPendingCount, setPreviousPendingCount] = useState(0);

  // Load and play sound
  const playOrderSound = async () => {
    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sound/order_sound.mp3"),
          {
            shouldPlay: true,
            isLooping: true,
            volume: 0.8,
          }
        );
        soundRef.current = sound;
        setIsPlaying(true);
      } else if (!isPlaying) {
        await soundRef.current.setIsLoopingAsync(true);
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Stop sound
  const stopOrderSound = async () => {
    try {
      if (soundRef.current && isPlaying) {
        await soundRef.current.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error stopping sound:", error);
    }
  };

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Set up polling
  useEffect(() => {
    if (restaurantId) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up new interval for polling
      intervalRef.current = setInterval(() => {
        refetch();
      }, 1000);

      // Cleanup on unmount
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [restaurantId, refetch]);

  // Handle sound based on pending orders
  useEffect(() => {
    if (ordersData?.results) {
      const currentPendingCount = ordersData.results.filter(
        (order) => order.status === "pending"
      ).length;

      // If there are pending orders and we weren't playing before, start playing
      if (currentPendingCount > 0 && previousPendingCount === 0) {
        playOrderSound();
      }
      // If there are no pending orders and we were playing, stop playing
      else if (currentPendingCount === 0 && previousPendingCount > 0) {
        stopOrderSound();
      }

      setPreviousPendingCount(currentPendingCount);
    }
  }, [ordersData?.results, previousPendingCount]);

  // Categorize orders by status
  const categorizeOrders = (orders: Order[]) => {
    const newOrders = orders.filter((order) => order.status === "pending");
    const acceptedOrders = orders.filter(
      (order) =>
        order.status === "accepted" || order.status === "ready_for_pickup"
    );

    return {
      newOrders,
      acceptedOrders,
    };
  };

  const categorizedOrders = ordersData?.results
    ? categorizeOrders(ordersData.results)
    : { newOrders: [], acceptedOrders: [] };

  return {
    orders: ordersData?.results || [],
    categorizedOrders,
    error,
    isLoading,
    refetch,
    isPlaying,
    stopOrderSound, // Expose this function to allow manual stop
  };
};
