import { MotiView } from "moti";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MenuCategoryModal from "./MenuCategoryModal";

export default function MenuCategoryList({
  categories,
}: {
  categories: { name: string; count: number }[];
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = (catName: string) => {
    setSelectedCategory(catName);
    setModalVisible(true);
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 18,
          color: "#111",
        }}
      >
        Delivery Menu
      </Text>
      {categories.map((cat, idx) => (
        <MotiView
          key={cat.name}
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", duration: 500, delay: 100 * idx }}
          style={{ marginBottom: 12 }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleCategoryPress(cat.name)}
            style={{
              backgroundColor: idx % 2 === 0 ? "#FFF7E6" : "#FFF3E0", // alternating soft yellow/orange
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 18,
              paddingHorizontal: 18,
              shadowColor: "#000",
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 17, color: "#222", fontWeight: "600" }}>
              {cat.name}
            </Text>
            <View
              style={{
                backgroundColor: "#FB923C",
                borderRadius: 16,
                minWidth: 32,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 12,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                {cat.count}
              </Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      ))}
      <MenuCategoryModal
        visible={modalVisible}
        category={selectedCategory}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
