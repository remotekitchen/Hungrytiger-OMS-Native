import { ChevronDown, Menu, QrCode } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  onMenuPress: () => void;
  onQrPress: () => void;
  onOpenPress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onQrPress,
  onOpenPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity onPress={onMenuPress} className="p-2 static z-50">
        <Menu size={28} color="#222" />
      </TouchableOpacity>
      <Text className="text-xl font-bold flex-1 text-center -ml-8">Orders</Text>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={onQrPress} className="p-2">
          <QrCode size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onOpenPress}
          className="flex-row items-center bg-green-500 rounded-lg px-4 py-2 ml-2"
        >
          <Text className="text-white font-semibold mr-1">Open</Text>
          <ChevronDown size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
