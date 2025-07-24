import React from "react";
import { ScrollView, Text, View } from "react-native";
import MenuItemCard from "./MenuItemCard";
import { MenuItem } from "./types";

interface MenuItemListProps {
  items: MenuItem[];
  onImagePress: (imageUri: string) => void;
  onAvailabilityChange: (index: number) => void;
  onEdit: (index: number) => void;
}

export default function MenuItemList({
  items,
  onImagePress,
  onAvailabilityChange,
  onEdit,
}: MenuItemListProps) {
  if (items.length === 0) {
    return (
      <Text
        style={{
          color: "#888",
          textAlign: "center",
          marginTop: 32,
        }}
      >
        No items in this category.
      </Text>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 8, marginTop: 4 }}>
        {items.map((item, idx) => (
          <MenuItemCard
            key={item.id || item.name}
            item={item}
            index={idx}
            onImagePress={onImagePress}
            onAvailabilityChange={() => onAvailabilityChange(idx)}
            onEdit={() => onEdit(idx)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
