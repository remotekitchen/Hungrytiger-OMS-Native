import {
  CheckCircle,
  Circle,
  Minus,
  PauseCircle,
  Plus,
  X,
} from "lucide-react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function StoreStatusModal({ visible, onClose }) {
  const [status, setStatus] = useState("open");
  const [pauseType, setPauseType] = useState("");
  const [hours, setHours] = useState(0);

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
          >
            <CheckCircle
              size={24}
              color={status === "open" ? "#2563eb" : "#888"}
              className="mr-3"
            />
            <Text className="text-lg flex-1">Open</Text>
            {status === "open" && <CheckCircle size={24} color="#2563eb" />}
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-row items-center border-2 rounded-xl px-4 py-3 ${
              status === "pause" ? "border-blue-500" : "border-gray-300"
            }`}
            onPress={() => setStatus("pause")}
          >
            <PauseCircle
              size={24}
              color={status === "pause" ? "#2563eb" : "#888"}
              className="mr-3"
            />
            <Text className="text-lg flex-1">Pause</Text>
            {status === "pause" && <Circle size={24} color="#2563eb" />}
          </TouchableOpacity>
        </View>
        {status === "pause" && (
          <View className="mb-4">
            <View className="flex-row flex-wrap gap-2 mb-2">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPauseType("forever")}
              >
                <Circle
                  size={20}
                  color={pauseType === "forever" ? "#2563eb" : "#888"}
                />
                <Text className="ml-2">Forever</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPauseType("wholeDay")}
              >
                <Circle
                  size={20}
                  color={pauseType === "wholeDay" ? "#2563eb" : "#888"}
                />
                <Text className="ml-2">Whole Day</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-2 mb-2">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setPauseType("hours")}
              >
                <Circle
                  size={20}
                  color={pauseType === "hours" ? "#2563eb" : "#888"}
                />
                <Text className="ml-2">Certain Hours</Text>
              </TouchableOpacity>
              {pauseType === "hours" && (
                <View className="flex-row items-center ml-4">
                  <TouchableOpacity
                    onPress={() => setHours(Math.max(0, hours - 1))}
                    className="p-2"
                  >
                    <Minus size={20} color="#222" />
                  </TouchableOpacity>
                  <Text className="mx-2 w-6 text-center">{hours}</Text>
                  <TouchableOpacity
                    onPress={() => setHours(hours + 1)}
                    className="p-2"
                  >
                    <Plus size={20} color="#222" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        <TouchableOpacity className="w-full bg-blue-600 py-4 rounded-xl items-center mt-2">
          <Text className="text-white text-lg font-bold">Update Status</Text>
        </TouchableOpacity>
      </MotiView>
      <TouchableOpacity className="absolute inset-0" onPress={onClose} />
    </View>
  );
}
