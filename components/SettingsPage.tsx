import { useAudioPlayer } from "expo-audio";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PrinterSelectionModal from "./PrinterSelectionModal";

export default function SettingsPage() {
  const [selectedPrinter, setSelectedPrinter] = useState("DISCONNECTED");
  const [numberOfReceipts, setNumberOfReceipts] = useState(1);
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const player = useAudioPlayer(require("../assets/sound/order_sound.mp3"));

  const handleTestSound = async () => {
    try {
      await player.seekTo(0);
      await player.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleSelectPrinter = (printerName: string) => {
    setSelectedPrinter(printerName);
  };

  const handleTestPrint = async () => {
    try {
      // Mock print function to avoid SunmiPrinter native module issues
      const printContent = `
Hungrytiger Test

Test print completed successfully!

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

      `;

      console.log("Printing content:", printContent);
      Alert.alert(
        "Print Test",
        "Test print completed successfully!\n\nContent:\n" + printContent,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error printing:", error);
      Alert.alert("Print Error", "Failed to print test content");
    }
  };

  const SettingItem = ({
    title,
    subtitle,
    value,
    onPress,
    delay = 0,
  }: {
    title: string;
    subtitle: string;
    value: string | number;
    onPress?: () => void;
    delay?: number;
  }) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className="bg-gray-100 rounded-lg p-4 mb-3 flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <View className="flex-1">
          <Text className="text-black font-bold text-base">{value}</Text>
          <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
        </View>
        <ChevronDown size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );

  const SectionTitle = ({
    title,
    delay = 0,
  }: {
    title: string;
    delay?: number;
  }) => (
    <View>
      <Text className="text-black font-bold text-lg mb-3 mt-6">{title}</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      {/* Header */}
      <View>
        <Text className="text-black font-bold text-3xl mb-8">Settings</Text>
      </View>

      {/* Printer Section */}
      <SectionTitle title="Printer" delay={200} />

      {/* Printer Header with Test Print Button */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-black font-bold text-lg">Printer</Text>
        {selectedPrinter !== "DISCONNECTED" && (
          <TouchableOpacity
            onPress={handleTestPrint}
            className="bg-pink-500 px-4 py-2 rounded-lg"
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold">Test print</Text>
          </TouchableOpacity>
        )}
      </View>

      <SettingItem
        title="Select Printer"
        subtitle={
          selectedPrinter === "DISCONNECTED" ? "DISCONNECTED" : "CONNECTED"
        }
        value={
          selectedPrinter === "DISCONNECTED"
            ? "Select Printer"
            : selectedPrinter
        }
        onPress={() => setShowPrinterModal(true)}
        delay={400}
      />
      <SettingItem
        title="Number of Receipts"
        subtitle="NUMBER OF RECEIPTS"
        value={numberOfReceipts}
        delay={600}
      />

      {/* Sound Section */}
      {/* <SectionTitle title="Sound" delay={800} /> */}
      <View className="flex-row items-center justify-between mt-5">
        <Text className="text-black font-bold text-lg">Sound</Text>
        <TouchableOpacity
          onPress={handleTestSound}
          className="bg-pink-500 px-4 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-white font-semibold">Test sound</Text>
        </TouchableOpacity>
      </View>

      {/* Printer Selection Modal */}
      <PrinterSelectionModal
        visible={showPrinterModal}
        onClose={() => setShowPrinterModal(false)}
        onSelectPrinter={handleSelectPrinter}
      />
    </ScrollView>
  );
}
