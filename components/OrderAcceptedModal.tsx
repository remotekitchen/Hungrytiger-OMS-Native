import { CheckCheck } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Modal, Text, View } from "react-native";

export default function OrderAcceptedModal({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-green-500 justify-center items-center">
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 400 }}
          className="items-center justify-center"
        >
          <CheckCheck size={64} color="#fff" className="mb-4" />
          <Text className="text-3xl text-white font-bold mb-4">Accepted</Text>
          <Text className="text-lg text-white text-center font-medium">
            You accepted in under 20 seconds.{"\n"}Keep up the good work!
          </Text>
        </MotiView>
      </View>
    </Modal>
  );
}
