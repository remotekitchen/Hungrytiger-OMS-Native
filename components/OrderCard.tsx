import { MotiView } from "moti";
import React from "react";
import { Text } from "react-native";

export default function OrderCard({
  order,
}: {
  order: { id: string; items: number; mins: number };
}) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 400 }}
      style={{
        backgroundColor: "#FB923C",
        borderRadius: 12,
        padding: 18,
        minWidth: 140,
        minHeight: 120,
        justifyContent: "center",
        marginBottom: 8,
        shadowColor: "#FB923C",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 8,
        }}
      >
        #{order.id}
      </Text>
      <Text style={{ color: "#fff", fontSize: 16, marginBottom: 8 }}>
        {order.items} item{order.items > 1 ? "s" : ""}
      </Text>
      <Text style={{ color: "#fff", fontSize: 16 }}>{order.mins} mins</Text>
    </MotiView>
  );
}
