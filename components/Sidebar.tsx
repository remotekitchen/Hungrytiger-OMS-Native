import {
  ArrowLeft,
  BarChart2,
  ChevronDown,
  Clock,
  Headphones,
  Inbox,
  List,
  Percent,
  Settings,
  Star,
  Users,
  Utensils,
} from "lucide-react-native";
import React, { useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const menuItems = [
  { label: "Orders overview", icon: List, key: "orders" },
  { label: "Recent orders", icon: Clock, key: "recent" },
  { label: "Performance", icon: BarChart2, key: "performance" },
  { label: "Menu", icon: Utensils, key: "menu" },
  { label: "Discounts", icon: Percent, key: "discounts" },
  { label: "Request a rider", icon: Users, key: "request", dropdown: true },
  { label: "Inbox", icon: Inbox, key: "inbox" },
  { label: "Settings", icon: Settings, key: "settings" },
  { label: "What's new", icon: Star, key: "whatsnew", badge: 5 },
];

function finishClose(
  setShouldRenderRef: React.MutableRefObject<
    React.Dispatch<React.SetStateAction<boolean>>
  >,
  onCloseRef: React.MutableRefObject<() => void>
) {
  setShouldRenderRef.current(false);
  onCloseRef.current();
}

export default function Sidebar({
  visible,
  onClose,
  onSelect,
  selectedKey,
  statusBarHeight,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (key: string) => void;
  selectedKey: string;
  statusBarHeight: number;
}) {
  const windowHeight = Dimensions.get("window").height;
  const sidebarWidth = Dimensions.get("window").width * 0.8;
  const translateX = useSharedValue(-sidebarWidth);
  const [shouldRender, setShouldRender] = React.useState(visible);
  const setShouldRenderRef = useRef(setShouldRender);
  setShouldRenderRef.current = setShouldRender;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
      translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
    } else if (shouldRender) {
      translateX.value = withSpring(
        -sidebarWidth,
        { damping: 18, stiffness: 180 },
        (finished) => {
          if (finished) runOnJS(finishClose)(setShouldRenderRef, onCloseRef);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleClose = React.useCallback(() => {
    translateX.value = withSpring(
      -sidebarWidth,
      { damping: 18, stiffness: 180 },
      (finished) => {
        if (finished) runOnJS(finishClose)(setShouldRenderRef, onCloseRef);
      }
    );
  }, [sidebarWidth, translateX]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      let newX = ctx.startX + event.translationX;
      if (newX > 0) newX = 0;
      if (newX < -sidebarWidth) newX = -sidebarWidth;
      translateX.value = newX;
    },
    onEnd: (event) => {
      if (event.translationX < -sidebarWidth * 0.3) {
        runOnJS(finishClose)(setShouldRenderRef, onCloseRef);
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
      }
    },
  });

  const handleMenuSelect = (key: string) => {
    handleClose();
    setTimeout(() => onSelect(key), 300); // ensure sidebar animates out before changing content
  };

  if (!shouldRender) return null;

  return (
    <View
      className="absolute left-0 right-0 z-50 flex-row"
      style={{ top: statusBarHeight, height: windowHeight - statusBarHeight }}
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            { width: sidebarWidth, height: "100%" },
            animatedStyle,
            styles.sidebarShadow,
            { borderTopRightRadius: 36, backgroundColor: "white" },
          ]}
        >
          <View className="items-center pt-10 pb-4 bg-white">
            <Image
              source={require("../assets/images/icon.png")}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                marginBottom: 8,
              }}
              resizeMode="cover"
            />
            <Text className="text-2xl font-extrabold text-black mb-2">
              Tiger Eats
            </Text>
          </View>
          <View className="flex-1 px-4">
            {menuItems.map((item, idx) => (
              <TouchableOpacity
                key={item.key}
                className="flex-row items-center py-3"
                onPress={() => handleMenuSelect(item.key)}
                style={{
                  borderLeftWidth: selectedKey === item.key ? 4 : 0,
                  borderLeftColor:
                    selectedKey === item.key ? "#E91E63" : "transparent",
                  backgroundColor:
                    selectedKey === item.key ? "#F8F8F8" : "transparent",
                  marginBottom: item.label === "What's new" ? 8 : 0,
                }}
              >
                <item.icon size={22} color="#222" style={{ marginRight: 16 }} />
                <Text className="text-base font-semibold text-black flex-1">
                  {item.label}
                </Text>
                {item.dropdown && <ChevronDown size={18} color="#222" />}
                {item.badge && (
                  <View
                    style={{
                      backgroundColor: "#E91E63",
                      borderRadius: 12,
                      minWidth: 24,
                      height: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {item.badge}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#eee",
              marginHorizontal: 16,
              marginTop: 8,
            }}
          />
          <View className="px-4 pb-8 pt-4">
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => {}}
            >
              <Headphones size={22} color="#222" style={{ marginRight: 16 }} />
              <Text className="text-base font-semibold text-black flex-1">
                Help Center
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={handleClose}
            >
              <ArrowLeft size={22} color="#222" style={{ marginRight: 16 }} />
              <Text className="text-base font-semibold text-black flex-1">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
      {/* Click outside to close */}
      <TouchableOpacity style={{ flex: 1 }} onPress={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 24,
  },
});
