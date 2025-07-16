import React, { useState } from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import Header from "../components/Header";
import HistorySection from "../components/HistorySection";
import MenusSection from "../components/MenusSection";
import OrderTabs from "../components/OrderTabs";
import OrdersSection from "../components/OrdersSection";
import Sidebar from "../components/Sidebar";
import StoreStatusModal from "../components/StoreStatusModal";

const sectionTabs = {
  orders: "orders",
  history: "history",
  menus: "menus",
};

function getStatusBarHeight() {
  if (Platform.OS === "ios") return 44;
  return StatusBar.currentHeight || 24;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("orders");
  const [activeTab, setActiveTab] = useState("incoming");
  const [tabCounts] = useState({ incoming: 0, preparing: 1, ready: 0 });
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
      {/* Header and tabs below status bar */}
      <View
        onLayout={(e) =>
          setHeaderHeight(e.nativeEvent.layout.height + statusBarHeight)
        }
      >
        <Header
          onMenuPress={() => setSidebarOpen(true)}
          onQrPress={() => alert("hi")}
          onOpenPress={() => setModalOpen(true)}
        />
      </View>
      <StoreStatusModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      {/* Tabs only for Orders section */}
      {activeSection === "orders" && (
        <OrderTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />
      )}
      <View className="flex-1">{SectionComponent}</View>
      <Text className="absolute right-2 bottom-2 text-gray-500 text-xs">
        Version: 6.0.0
      </Text>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={(key: string) => {
          setSidebarOpen(false);
          if (key === "orders") setActiveSection("orders");
          if (key === "history") setActiveSection("history");
          if (key === "menus") setActiveSection("menus");
        }}
        selectedKey={activeSection}
        headerHeight={headerHeight}
      />
    </View>
  );
}
