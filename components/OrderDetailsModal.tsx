import { ArrowLeft, Printer } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OrderDetailsModal({
  visible,
  onClose,
  order,
  onAccept,
}: any) {
  const [mins, setMins] = useState(order.mins);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 3000));
    setLoading(false);
    onAccept();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View className="flex-1 bg-white justify-start items-stretch">
        <MotiView
          from={{ translateY: 60, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: 60, opacity: 0 }}
          transition={{ type: "timing", duration: 350 }}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-5 pb-2">
              <TouchableOpacity onPress={onClose} className="p-1">
                <ArrowLeft size={28} color="#222" />
              </TouchableOpacity>
              <View className="flex-row items-center gap-x-3">
                <Printer size={22} color="#FB923C" className="mr-2" />
                <Text className="text-[#FB923C] font-bold text-lg">Modify</Text>
              </View>
            </View>
            {/* Order Card - Info and Minutes Selector in a row */}
            <View className="bg-white rounded-2xl mx-3 my-2 p-5 border border-[#eee] shadow-sm flex-row items-center justify-between">
              {/* Left: Order Info */}
              <View className="flex-1 min-w-[120px]">
                <View className="flex-row items-center mb-2">
                  <Image
                    source={require("../assets/images/icon.png")}
                    className="w-7 h-7 mr-2 rounded-full"
                  />
                  <Text className="text-[#FB923C] font-bold text-base">
                    Test restaurant
                  </Text>
                </View>
                <Text className="font-bold text-2xl mb-1">#{order.id}</Text>
                <Text className="text-gray-500 text-base mb-1">
                  {order.code}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-pink-600 bg-pink-100 rounded-full px-3 py-1 text-xs font-bold overflow-hidden">
                    TEST ORDER
                  </Text>
                </View>
              </View>
              {/* Right: Minutes Selector */}
              <View className="relative items-center justify-center ml-2 mr-5">
                <View className="w-24 h-24 bg-gray-100 rounded-full border border-gray-200 flex-col items-center justify-center">
                  <Text className="font-bold text-2xl text-black mt-4">
                    {mins}
                  </Text>
                  <Text className="text-gray-500 text-xs mb-4">mins</Text>
                </View>
                {/* - Button */}
                <TouchableOpacity
                  onPress={() => setMins(Math.max(1, mins - 1))}
                  className="absolute left-[-22px] top-[40%] -translate-y-1/2 w-11 h-11 bg-white rounded-full items-center justify-center shadow border border-gray-200"
                  style={{ elevation: 3 }}
                >
                  <Text className="text-2xl text-gray-700">-</Text>
                </TouchableOpacity>
                {/* + Button */}
                <TouchableOpacity
                  onPress={() => setMins(mins + 1)}
                  className="absolute right-[-22px] top-[40%] -translate-y-1/2 w-11 h-11 bg-white rounded-full items-center justify-center shadow border border-gray-200"
                  style={{ elevation: 3 }}
                >
                  <Text className="text-2xl text-gray-700">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Items */}
            <View className="bg-gray-100 rounded-xl mx-3 my-2 p-4">
              <Text className="font-bold text-lg">1 x Pizza Salami</Text>
              <Text className="text-[#E91E63] text-sm mb-1">
                ** the tomatoes should be fresh
              </Text>
              <Text className="text-gray-500 text-base">0 x large</Text>
            </View>
            {/* Subtotal/Total */}
            <View className="bg-gray-100 rounded-xl mx-3 my-2 p-4">
              <Text className="font-bold text-base">Subtotal</Text>
              <Text className="text-gray-500 text-base">VAT (Incl.)</Text>
              <Text className="font-bold text-lg mt-2">Total</Text>
            </View>
            {/* Payment */}
            {/* <View className="items-center my-2">
              <Text className="bg-green-100 text-green-600 font-bold rounded px-4 py-1 text-base mb-1">
                CREDIT CARD
              </Text>
              <Text className="text-gray-500 text-base">cash</Text>
            </View> */}
          </ScrollView>
          {/* Accept Order Button */}
          <View className="p-5 bg-white border-t border-[#eee]">
            <TouchableOpacity
              onPress={handleAccept}
              disabled={loading}
              className="bg-green-500 rounded-xl py-5 flex-row items-center justify-center px-5"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" className="mr-2" />
              ) : null}
              <Text className="text-white font-bold text-xl flex-1 text-center">
                Accept Order
              </Text>
              <Text className="text-white font-bold text-base ml-3">
                {order.items} item
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
}
