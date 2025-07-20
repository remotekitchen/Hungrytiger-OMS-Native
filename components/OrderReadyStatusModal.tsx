import { Box } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Modal, Text, View } from "react-native";

export default function OrderReadyStatusModal({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-yellow-400 justify-center items-center">
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 400 }}
          className="items-center justify-center"
        >
          <Box size={64} color="#fff" className="mb-4" />
          <Text className="text-3xl text-white font-bold mb-4">
            Ready for Pickup!
          </Text>
          <Text className="text-lg text-white text-center font-medium">
            The order is now ready for pickup by the rider.
          </Text>
        </MotiView>
      </View>
    </Modal>
  );
}
