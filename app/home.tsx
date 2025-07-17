import React, { useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import Header from "../components/Header";
import HistorySection from "../components/HistorySection";

import Discounts from "@/components/Discounts";
import Inbox from "@/components/Inbox";
import MenuPage from "@/components/MenuPage";
import Performance from "@/components/Performance";
import RecentOrders from "@/components/RecentOrders";
import RequestRider from "@/components/RequestRider";
import SettingsPage from "@/components/SettingsPage";
import Sidebar from "@/components/Sidebar";
import WhatsNew from "@/components/WhatsNew";
import MenusSection from "../components/MenusSection";
import OpeningHoursModal from "../components/OpeningHoursModal";
import OrdersSection from "../components/OrdersSection";
import StoreStatusModal from "../components/StoreStatusModal";

function getStatusBarHeight() {
  if (Platform.OS === "ios") return 44;
  return StatusBar.currentHeight || 24;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("orders");
  const [headerHeight, setHeaderHeight] = useState(0);
  const statusBarHeight = getStatusBarHeight();

  // Store status state
  const [storeStatus, setStoreStatus] = useState({
    status: "open", // "open" or "pause"
    pauseType: "", // "forever", "wholeDay", "hours", or ""
    hours: 0,
  });
  const [storeStatusModalVisible, setStoreStatusModalVisible] = useState(false);

  // Opening hours state
  const [openingHoursModalVisible, setOpeningHoursModalVisible] =
    useState(false);
  const [openingHours, setOpeningHours] = useState([
    {
      day: "Monday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
    {
      day: "Tuesday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
    {
      day: "Wednesday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
    {
      day: "Thursday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
    {
      day: "Friday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
    {
      day: "Saturday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
    {
      day: "Sunday",
      enabled: true,
      shifts: [{ start: "11:00", end: "21:00" }],
    },
  ]);

  // Compute label for header button
  let storeStatusLabel = "Open";
  if (storeStatus.status === "pause") {
    if (storeStatus.pauseType === "forever") storeStatusLabel = "Paused";
    else if (storeStatus.pauseType === "wholeDay") storeStatusLabel = "Paused";
    else if (storeStatus.pauseType === "hours")
      storeStatusLabel = `Paused (${storeStatus.hours}h)`;
    else storeStatusLabel = "Paused";
  }

  let SectionComponent = null;
  if (activeSection === "orders") SectionComponent = <OrdersSection />;
  if (activeSection === "recent") SectionComponent = <RecentOrders />;
  if (activeSection === "performance") SectionComponent = <Performance />;
  if (activeSection === "menu") SectionComponent = <MenuPage />;
  if (activeSection === "discounts") SectionComponent = <Discounts />;
  if (activeSection === "request") SectionComponent = <RequestRider />;
  if (activeSection === "inbox") SectionComponent = <Inbox />;
  if (activeSection === "settings") SectionComponent = <SettingsPage />;
  if (activeSection === "whatsnew") SectionComponent = <WhatsNew />;
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
          onOpenPress={() => setStoreStatusModalVisible(true)}
          storeStatusLabel={storeStatusLabel}
          isPaused={storeStatus.status === "pause"}
          onStoreIconPress={() => setOpeningHoursModalVisible(true)}
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
      <StoreStatusModal
        visible={storeStatusModalVisible}
        onClose={() => setStoreStatusModalVisible(false)}
        onUpdate={(status, pauseType, hours) => {
          setStoreStatus({ status, pauseType, hours });
          setStoreStatusModalVisible(false);
        }}
        currentStatus={storeStatus}
      />
      <OpeningHoursModal
        visible={openingHoursModalVisible}
        onClose={() => setOpeningHoursModalVisible(false)}
        openingHours={openingHours}
        setOpeningHours={setOpeningHours}
      />
    </View>
  );
}
