import { useGetOrdersQuery } from "@/redux/feature/order/orderApi";
import { useAudioPlayer } from "expo-audio";
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
  const [previousPendingCount, setPreviousPendingCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const loopIntervalRef = useRef<number | null>(null);

  // 👇 Setup audio player using expo-audio
  const player = useAudioPlayer(require("../assets/sound/order_sound.mp3"));

  // Play sound with infinite loop
  const playOrderSound = async () => {
    try {
      // console.log("Audio Debug: playOrderSound called");
      setIsPlaying(true);
      await player.seekTo(0);
      await player.play();
      // console.log("Audio Debug: Initial play started");

      // Set up infinite looping
      const startLooping = () => {
        // console.log("Audio Debug: Setting up loop interval");
        loopIntervalRef.current = setInterval(async () => {
          try {
            // console.log("Audio Debug: Loop iteration - restarting audio");
            // Always restart the audio as long as the interval is running
            await player.seekTo(0);
            await player.play();
          } catch (err) {
            console.error("Error in audio loop:", err);
          }
        }, 2000); // Restart every 2 seconds for seamless looping
      };

      // Start looping after a short delay
      setTimeout(startLooping, 100);
    } catch (err) {
      console.error("Error playing sound:", err);
      setIsPlaying(false);
    }
  };

  // Stop sound and clear loop
  const stopOrderSound = async () => {
    try {
      // console.log("Audio Debug: stopOrderSound called");
      setIsPlaying(false);
      if (loopIntervalRef.current) {
        // console.log("Audio Debug: Clearing loop interval");
        clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = null;
      }
      await player.pause();
      // console.log("Audio Debug: Audio paused");
    } catch (err) {
      console.error("Error stopping sound:", err);
    }
  };

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
        // Clean up audio loop interval
        if (loopIntervalRef.current) {
          clearInterval(loopIntervalRef.current);
          loopIntervalRef.current = null;
        }
      };
    }
  }, [restaurantId, refetch]);

  // Handle sound based on pending orders
  useEffect(() => {
    if (ordersData?.results) {
      const currentPendingCount = ordersData.results.filter(
        (order: Order) => order.status === "pending"
      ).length;

      // console.log(
      //   `Audio Debug: Pending orders: ${currentPendingCount}, Is playing: ${isPlaying}`
      // );

      // Start playing if there are pending orders and we weren't playing before
      if (currentPendingCount > 0 && !isPlaying) {
        // console.log("Audio Debug: Starting audio loop");
        playOrderSound();
      }
      // Stop playing if there are no pending orders and we were playing before
      else if (currentPendingCount === 0 && isPlaying) {
        // console.log("Audio Debug: Stopping audio loop");
        stopOrderSound();
      }

      setPreviousPendingCount(currentPendingCount);
    }
  }, [ordersData?.results, isPlaying, previousPendingCount]);

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
    stopOrderSound,
    isPlaying,
  };
};
