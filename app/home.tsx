import React, { useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import Header from "../components/Header";
import HistorySection from "../components/HistorySection";
import MenusSection from "../components/MenusSection";
import OrdersSection from "../components/OrdersSection";
import Sidebar from "../components/Sidebar";

function getStatusBarHeight() {
  if (Platform.OS === "ios") return 44;
  return StatusBar.currentHeight || 24;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("orders");
  const [headerHeight, setHeaderHeight] = useState(0);
  const statusBarHeight = getStatusBarHeight();

  let SectionComponent = null;
  if (activeSection === "orders") SectionComponent = <OrdersSection />;
  if (activeSection === "history") SectionComponent = <HistorySection />;
  if (activeSection === "menus") SectionComponent = <MenusSection />;

  return (
    <View className="flex-1 bg-white relative">
      {/* Black status bar area */}
      <View style={{ height: statusBarHeight, backgroundColor: "#000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
      </View>
      {/* Header below status bar */}
      <View
        onLayout={(e) =>
          setHeaderHeight(e.nativeEvent.layout.height + statusBarHeight)
        }
      >
        <Header
          onMenuPress={() => setSidebarOpen(true)}
          onQrPress={() => {}}
          onOpenPress={() => {}}
        />
      </View>
      <View className="flex-1">{SectionComponent}</View>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={(key: string) => {
          setSidebarOpen(false);
          setActiveSection(key);
        }}
        selectedKey={activeSection}
        statusBarHeight={statusBarHeight}
      />
    </View>
  );
}
