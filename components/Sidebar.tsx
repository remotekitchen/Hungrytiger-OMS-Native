import { Clock, List, LogOut, Shield, Utensils, X } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (key: string) => void;
  selectedKey: string;
  headerHeight: number;
}

const menuItems = [
  { label: "Orders", icon: List, key: "orders" },
  { label: "History", icon: Clock, key: "history" },
  { label: "Menus", icon: Utensils, key: "menus" },
  { label: "Privacy Policy", icon: Shield, key: "privacy" },
];

export default function Sidebar({
  visible,
  onClose,
  onSelect,
  selectedKey,
  headerHeight,
}: SidebarProps) {
  const windowHeight = Dimensions.get("window").height;
  const sidebarHeight = windowHeight - headerHeight;
  return (
    <AnimatePresence>
      {visible && (
        <View
          className="absolute left-0 right-0 z-50 flex-row"
          style={{ top: headerHeight, height: sidebarHeight }}
        >
          <MotiView
            from={{ translateX: -300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: -300, opacity: 0 }}
            transition={{ type: "timing", duration: 300 }}
            className="w-3/4 max-w-xs h-full bg-white p-4"
          >
            <TouchableOpacity onPress={onClose} className="self-end mb-4">
              <X size={28} color="#ef4444" />
            </TouchableOpacity>
            {/* Demo: Two dropdowns */}
            <View className="mb-4">
              <TouchableOpacity className="border-2 border-blue-500 rounded-lg p-3 mb-2">
                <Text className="text-blue-600 font-semibold">Tiger Eats</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border-2 border-blue-500 rounded-lg p-3">
                <Text className="text-blue-600 font-semibold">Tiger Eats</Text>
              </TouchableOpacity>
            </View>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                className={`flex-row items-center py-3 ${
                  selectedKey === item.key ? "font-bold" : ""
                }`}
                onPress={() => onSelect(item.key)}
              >
                <item.icon size={22} color="#222" className="mr-3" />
                <Text className="text-lg">{item.label}</Text>
              </TouchableOpacity>
            ))}
            <View className="flex-1" />
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => {}}
            >
              <LogOut size={22} color="#222" className="mr-3" />
              <Text className="text-lg">Logout</Text>
            </TouchableOpacity>
          </MotiView>
          {/* Overlay */}
          <TouchableOpacity className="flex-1 bg-black/30" onPress={onClose} />
        </View>
      )}
    </AnimatePresence>
  );
}
