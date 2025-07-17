import { Pencil } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function OpeningHoursView({ openingHours, onEdit }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 24,
          paddingBottom: 12,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          Your opening hours
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Regular schedule
        </Text>
        <TouchableOpacity
          onPress={onEdit}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              color: "#E91E63",
              fontWeight: "bold",
              fontSize: 16,
              marginRight: 4,
            }}
          >
            Edit
          </Text>
          <Pencil size={18} color="#E91E63" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={openingHours}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
            <Text style={{ color: "#888", fontSize: 16 }}>{item.day}</Text>
            <Text style={{ color: "#222", fontSize: 16 }}>
              {item.enabled && item.shifts.length > 0
                ? item.shifts.map((s) => `${s.start} - ${s.end}`).join(", ")
                : "--"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
