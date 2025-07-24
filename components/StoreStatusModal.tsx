import {
  useGetRestaurantQuery,
  useGetStoreStatusQuery,
  useStorePauseUnpauseMutation,
} from "@/redux/feature/restaurant/restaurantApi";
import { PauseCircle, Store, X } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

interface StoreStatusModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (status: string, pauseType: string, hours: number) => void;
  currentStatus: { status: string; pauseType: string; hours: number };
}

const pauseOptions = [
  { key: "forever", label: "Forever" },
  { key: "wholeDay", label: "Whole Day" },
  { key: "hours", label: "Certain Hours" },
];

function FilledCircle({ size = 20, color = "#2563eb" }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
}

export default function StoreStatusModal({
  visible,
  onClose,
  onUpdate,
  currentStatus,
}: StoreStatusModalProps) {
  // Commented out for now: Pause type and hours logic
  // const [pauseType, setPauseType] = useState(currentStatus.pauseType);
  // const [hours, setHours] = useState(currentStatus.hours);

  const { data: getRestaurants } = useGetRestaurantQuery({});

  const locationId = getRestaurants?.results[0]?.location_details[0]?.id;

  const { data: getStoreStatus } = useGetStoreStatusQuery({ locationId });
  const storeStatus = getStoreStatus?.is_location_closed;

  const [status, setStatus] = useState(storeStatus === true ? "pause" : "open");

  const [storePauseUnpause, { isLoading: isUpdating }] =
    useStorePauseUnpauseMutation();

  useEffect(() => {
    if (visible) {
      setStatus(storeStatus === true ? "pause" : "open");
      // setPauseType(currentStatus.pauseType);
      // setHours(currentStatus.hours);
    }
  }, [visible, storeStatus]);

  const hasChanged = status !== (storeStatus === true ? "pause" : "open");
  // || pauseType !== currentStatus.pauseType || hours !== currentStatus.hours;

  // const pauseDisabled = status !== "pause";

  if (!visible) return null;
  return (
    <View className="absolute inset-0 z-50 bg-black/40 justify-center items-center">
      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "timing", duration: 300 }}
        className="w-11/12 max-w-xl bg-gray-50 rounded-2xl p-6"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">Store Status</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={28} color="#ef4444" />
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <TouchableOpacity
            className={`flex-row items-center border-2 rounded-xl px-4 py-3 mb-2 ${
              status === "open" ? "border-blue-500" : "border-gray-300"
            }`}
            onPress={() => setStatus("open")}
            disabled={status === "open"}
          >
            <Store
              size={24}
              color={status === "open" ? "#2563eb" : "#888"}
              style={{ marginRight: 12 }}
            />
            <Text className="text-lg flex-1">Open</Text>
            {/* No right icon for Open */}
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-row items-center border-2 rounded-xl px-4 py-3 ${
              status === "pause" ? "border-blue-500" : "border-gray-300"
            }`}
            onPress={() => setStatus("pause")}
            disabled={status === "pause"}
          >
            <PauseCircle
              size={24}
              color={status === "pause" ? "#2563eb" : "#888"}
              style={{ marginRight: 16 }}
            />
            <Text className="text-lg flex-1">Pause</Text>
            {/* No right-side circle for Pause */}
          </TouchableOpacity>
        </View>
        {/*
        <View className="mb-4">
          <View className="flex-row flex-wrap gap-2 mb-2">
            {pauseOptions.slice(0, 2).map((opt) => (
              <TouchableOpacity
                key={opt.key}
                className="flex-row items-center"
                onPress={() => {
                  if (!pauseDisabled) setPauseType(opt.key);
                }}
                disabled={pauseDisabled}
                style={{ opacity: pauseDisabled ? 0.5 : 1 }}
              >
                {pauseType === opt.key && !pauseDisabled ? (
                  <FilledCircle size={20} color="#2563eb" />
                ) : (
                  <Circle size={20} color="#888" />
                )}
                <Text className="ml-2">{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row items-center gap-2 mb-2">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                if (!pauseDisabled) setPauseType("hours");
              }}
              disabled={pauseDisabled}
              style={{ opacity: pauseDisabled ? 0.5 : 1 }}
            >
              {pauseType === "hours" && !pauseDisabled ? (
                <FilledCircle size={20} color="#2563eb" />
              ) : (
                <Circle size={20} color="#888" />
              )}
              <Text className="ml-2">Certain Hours</Text>
            </TouchableOpacity>
            <View className="flex-row items-center ml-4">
              <TouchableOpacity
                onPress={() => setHours(Math.max(0, hours - 1))}
                className="p-0"
                disabled={pauseDisabled || pauseType !== "hours"}
                style={{
                  opacity: pauseType === "hours" && !pauseDisabled ? 1 : 0.5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e0e7ff",
                    borderRadius: 9999,
                    padding: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Minus size={18} color="#2563eb" />
                </View>
              </TouchableOpacity>
              <Text className="mx-2 w-6 text-center">{hours}</Text>
              <TouchableOpacity
                onPress={() => setHours(hours + 1)}
                className="p-0"
                disabled={pauseDisabled || pauseType !== "hours"}
                style={{
                  opacity: pauseType === "hours" && !pauseDisabled ? 1 : 0.5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e0e7ff",
                    borderRadius: 9999,
                    padding: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Plus size={18} color="#2563eb" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        */}
        <TouchableOpacity
          className="w-full bg-blue-600 py-4 rounded-xl items-center mt-2"
          onPress={async () => {
            try {
              await storePauseUnpause({
                locationId,
                status: status === "pause", // true for pause, false for open
              }).unwrap();
              Toast.show({
                type: "success",
                text1:
                  status === "pause"
                    ? "Store paused successfully!"
                    : "Store opened successfully!",
              });
              onUpdate(status, "", 0);
              onClose();
            } catch (err) {
              Toast.show({
                type: "error",
                text1: "Failed to update store status.",
              });
            }
          }}
          disabled={!hasChanged || isUpdating}
          style={{ opacity: hasChanged && !isUpdating ? 1 : 0.5 }}
        >
          {isUpdating ? (
            <Text className="text-white text-lg font-bold">Updating...</Text>
          ) : (
            <Text className="text-white text-lg font-bold">Update Status</Text>
          )}
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}
