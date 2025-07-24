import { ArrowLeft, ChevronDown } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Category, MenuItem } from "./types";

interface EditMenuItemModalProps {
  visible: boolean;
  onClose: () => void;
  item: MenuItem;
  onUpdate: (item: MenuItem) => void;
  onDelete: () => void;
  categories: Category[];
}

export default function EditMenuItemModal({
  visible,
  onClose,
  item,
  onUpdate,
  onDelete,
  categories,
}: EditMenuItemModalProps) {
  // Fallbacks for missing fields
  const defaultCategory =
    Array.isArray(item.category) && item.category.length > 0
      ? item.category[0]
      : item.category || "";
  const [category, setCategory] = useState(defaultCategory);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [name, setName] = useState(item.name || "");
  const [price, setPrice] = useState(item.price ? item.price.toString() : "0");
  const [description, setDescription] = useState(item.description || "");
  const [image] = useState(
    item.original_image && item.original_image.local_url
      ? { uri: item.original_image.local_url }
      : item.image_url
      ? { uri: item.image_url }
      : require("../../assets/images/main_icon_300x300.png")
  );
  const [show, setShow] = useState(visible);
  const [closing, setClosing] = useState(false);

  React.useEffect(() => {
    if (visible) {
      setShow(true);
      setClosing(false);
    }
  }, [visible]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
      onClose();
    }, 400);
  };

  return (
    <Modal visible={show} animationType="none" transparent>
      <AnimatePresence>
        {show && !closing && (
          <MotiView
            from={{ translateX: 400, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 400, opacity: 0 }}
            transition={{ type: "timing", duration: 400 }}
            style={{
              flex: 1,
              backgroundColor: "#fff",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 200,
            }}
          >
            <ScrollView
              contentContainerStyle={{ padding: 22, paddingBottom: 32 }}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: 18,
                }}
              >
                <TouchableOpacity
                  onPress={handleClose}
                  style={{ marginRight: 16 }}
                >
                  <ArrowLeft size={32} color="#222" />
                </TouchableOpacity>
                <Text
                  style={{ fontWeight: "bold", fontSize: 22, color: "#111" }}
                >
                  Update Menu Item
                </Text>
              </View>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
              >
                Select Category
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1.5,
                  borderColor: "#D1D5DB",
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setShowCategoryDropdown((v) => !v)}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 18 }}>{category}</Text>
                <ChevronDown
                  size={22}
                  color="#888"
                  style={{
                    transform: [
                      { rotate: showCategoryDropdown ? "180deg" : "0deg" },
                    ],
                  }}
                />
              </TouchableOpacity>
              {showCategoryDropdown && (
                <View
                  style={{
                    backgroundColor: "#F5F3F7",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    marginBottom: 18,
                    borderWidth: 1.5,
                    borderColor: "#D1D5DB",
                    borderTopWidth: 0,
                    maxHeight: 320,
                    overflow: "hidden",
                  }}
                >
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => {
                        setCategory(cat.name);
                        setShowCategoryDropdown(false);
                      }}
                      style={{
                        paddingVertical: 16,
                        paddingHorizontal: 18,
                        backgroundColor:
                          cat.id === item.category_id ? "#E5E1EB" : "#F5F3F7",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {!showCategoryDropdown && <View style={{ marginBottom: 18 }} />}
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
              >
                Item Image
              </Text>
              <View style={{ marginBottom: 18 }}>
                <Image
                  source={image}
                  style={{ width: 120, height: 120, borderRadius: 12 }}
                />
              </View>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
              >
                Item Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={{
                  borderWidth: 1.5,
                  borderColor: "#D1D5DB",
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 18,
                  marginBottom: 18,
                  color: "#222",
                }}
              />
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
              >
                Base Price
              </Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                style={{
                  borderWidth: 1.5,
                  borderColor: "#D1D5DB",
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 18,
                  marginBottom: 18,
                  color: "#222",
                }}
              />
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
              >
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
                style={{
                  borderWidth: 1.5,
                  borderColor: "#D1D5DB",
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 17,
                  minHeight: 80,
                  color: "#222",
                  marginBottom: 28,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#2563eb",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginBottom: 16,
                }}
                onPress={() =>
                  onUpdate({
                    ...item,
                    name,
                    price: parseFloat(price),
                    description,
                    category: category, // Use the selected category
                    image,
                  })
                }
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                >
                  Update Item
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#F43F5E",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                }}
                onPress={onDelete}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                >
                  Delete Item
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </MotiView>
        )}
      </AnimatePresence>
    </Modal>
  );
}
