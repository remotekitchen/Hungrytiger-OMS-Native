import { ChevronDown, Menu, QrCode, Store } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  onMenuPress: () => void;
  onQrPress: () => void;
  onOpenPress: () => void;
  storeStatusLabel: string;
  isPaused: boolean;
  onStoreIconPress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onQrPress,
  onOpenPress,
  storeStatusLabel,
  isPaused,
  onStoreIconPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity onPress={onMenuPress} className="p-2">
        <Menu size={28} color="#222" />
      </TouchableOpacity>
      {/* <Text className="text-xl font-bold flex-1 text-center -ml-8">Orders</Text> */}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={onQrPress} className="p-2">
          <QrCode size={24} color="#222" />
        </TouchableOpacity>
        {/* Store icon beside QR code */}
        <TouchableOpacity onPress={onStoreIconPress} className="p-2">
          <Store size={24} color="#222" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onOpenPress}
          className={`flex-row items-center rounded-lg px-4 py-2 ml-2 ${
            isPaused ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <Text className="text-white font-semibold mr-1">
            {storeStatusLabel}
          </Text>
          <ChevronDown size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
