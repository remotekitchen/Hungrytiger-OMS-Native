import { Pencil } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Image, Switch, Text, TouchableOpacity } from "react-native";
import { MenuItem } from "./types";

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onImagePress: (imageUri: string) => void;
  onAvailabilityChange: () => void;
  onEdit: () => void;
}

export default function MenuItemCard({
  item,
  index,
  onImagePress,
  onAvailabilityChange,
  onEdit,
}: MenuItemCardProps) {
  // Determine image source
  const getImageSource = (item: MenuItem) => {
    if (item.original_image && item.original_image.local_url) {
      return { uri: item.original_image.local_url };
    } else if (item.image_url) {
      return { uri: item.image_url };
    } else {
      return require("../../assets/images/main_icon_300x300.png");
    }
  };

  const imageSource = getImageSource(item);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 400,
        delay: index * 60,
      }}
      style={{
        backgroundColor: "#F7F7F7",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (typeof imageSource === "object" && imageSource.uri) {
            onImagePress(imageSource.uri);
          }
        }}
      >
        <Image
          source={imageSource}
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            marginRight: 12,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text
        style={{
          flex: 1,
          fontWeight: "600",
          fontSize: 16,
          color: "#222",
        }}
      >
        {item.name}
      </Text>
      <Switch
        value={item.is_available && item.is_available_today}
        trackColor={{
          false: item.is_available ? "#FCD34D" : "#D1D5DB",
          true: "#34D399",
        }}
        thumbColor={
          item.is_available && item.is_available_today ? "#10B981" : "#ccc"
        }
        style={{ marginRight: 10 }}
        onValueChange={onAvailabilityChange}
      />
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: "#E5E7EB",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onEdit}
      >
        <Pencil size={18} color="#888" />
      </TouchableOpacity>
    </MotiView>
  );
}
