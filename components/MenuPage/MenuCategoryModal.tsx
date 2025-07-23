import { ArrowLeft, ChevronDown, Pencil } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AVAILABILITY_OPTIONS = [
  { key: "in_stock", label: "In Stock" },
  { key: "sold_out_today", label: "Sold Out Today" },
  { key: "out_of_stock", label: "Out of Stock" },
];

function ChangeAvailabilityModal({
  visible,
  onClose,
  onChange,
  current,
}: {
  visible: boolean;
  onClose: () => void;
  onChange: (option: string) => void;
  current: string;
}) {
  const [selected, setSelected] = useState(current);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.18)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "timing", duration: 300 }}
          style={{
            backgroundColor: "#F7F7FB",
            borderRadius: 18,
            width: 340,
            padding: 22,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#111" }}>
              Change Availability
            </Text>
            <TouchableOpacity onPress={onClose}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#fff0f0",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 22, color: "#F43F5E", fontWeight: "bold" }}
                >
                  ×
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {AVAILABILITY_OPTIONS.map((opt, idx) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setSelected(opt.key)}
              style={{
                borderWidth: 2,
                borderColor: selected === opt.key ? "#2563eb" : "#E5E7EB",
                borderRadius: 12,
                paddingVertical: 18,
                paddingHorizontal: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
            >
              <Text style={{ fontSize: 17, color: "#222", fontWeight: "500" }}>
                {opt.label}
              </Text>
              {selected === opt.key ? (
                <Text style={{ color: "#2563eb", fontSize: 22 }}>✔️</Text>
              ) : (
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: "#D1D5DB",
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => onChange(selected)}
            style={{
              backgroundColor: "#2196F3",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Change
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </Modal>
  );
}

function EditMenuItemModal({
  visible,
  onClose,
  item,
  onUpdate,
  onDelete,
  categories,
}: {
  visible: boolean;
  onClose: () => void;
  item: any;
  onUpdate: (item: any) => void;
  onDelete: () => void;
  categories: any[];
}) {
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

export default function MenuCategoryModal({
  visible,
  category,
  onClose,
  items = [], // new prop: all items
  categoryId = null, // new prop: selected category id
  categories = [], // new prop: all categories
}: {
  visible: boolean;
  category: string | null;
  onClose: () => void;
  items?: any[];
  categoryId?: number | null;
  categories?: any[]; // Add categories prop
}) {
  const [show, setShow] = useState(visible);
  const [closing, setClosing] = useState(false);
  // Remove local items state, use filteredItems instead
  // const [items, setItems] = useState(mockMenuItems);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [availModalIdx, setAvailModalIdx] = useState<number | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

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

  // Filter items by categoryId
  const filteredItems =
    Array.isArray(items) && categoryId != null
      ? items.filter(
          (item) =>
            Array.isArray(item.category) && item.category.includes(categoryId)
        )
      : [];

  // For edit and availability modals, use filteredItems
  const handleToggle = (idx: number) => {
    // This would need to update the parent state if you want to persist changes
    // For now, do nothing or show a message
  };

  const handleChangeAvailability = (option: string) => {
    if (availModalIdx !== null) {
      // This would need to update the parent state if you want to persist changes
      // For now, do nothing or show a message
      setAvailModalIdx(null);
    }
  };

  const handleUpdateItem = (updated: any) => {
    // This would need to update the parent state if you want to persist changes
    // For now, do nothing or show a message
    setEditIdx(null);
  };

  const handleDeleteItem = () => {
    // This would need to update the parent state if you want to persist changes
    // For now, do nothing or show a message
    setEditIdx(null);
  };

  // Determine image source
  const getImageSource = (item: any) => {
    if (item.original_image && item.original_image.local_url) {
      return { uri: item.original_image.local_url };
    } else if (item.image_url) {
      return { uri: item.image_url };
    } else {
      return require("../../assets/images/main_icon_300x300.png");
    }
  };

  // Get status indicators
  const getStatusIndicators = () => {
    return [
      { color: "#34D399", text: "Available" },
      { color: "#FCD34D", text: "Unavailable Today" },
      { color: "#D1D5DB", text: "Out of Stock" },
    ];
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
              zIndex: 100,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 18,
                paddingBottom: 8,
              }}
            >
              <TouchableOpacity
                onPress={handleClose}
                style={{ marginRight: 12 }}
              >
                <ArrowLeft size={28} color="#222" />
              </TouchableOpacity>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#111" }}>
                {category}
              </Text>
            </View>

            {/* Status Indicators */}
            <View style={{ paddingHorizontal: 18, paddingBottom: 12 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                {getStatusIndicators().map((indicator, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: indicator.color,
                      }}
                    />
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      {indicator.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 8, marginTop: 4 }}>
                {filteredItems.length === 0 ? (
                  <Text
                    style={{
                      color: "#888",
                      textAlign: "center",
                      marginTop: 32,
                    }}
                  >
                    No items in this category.
                  </Text>
                ) : (
                  filteredItems.map((item, idx) => (
                    <MotiView
                      key={item.id || item.name}
                      from={{ opacity: 0, translateY: 20 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: "timing",
                        duration: 400,
                        delay: idx * 60,
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
                          const src = getImageSource(item);
                          if (typeof src === "object" && src.uri)
                            setFullScreenImage(src.uri);
                        }}
                      >
                        <Image
                          source={getImageSource(item)}
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
                          item.is_available && item.is_available_today
                            ? "#10B981"
                            : "#ccc"
                        }
                        style={{ marginRight: 10 }}
                        onValueChange={() => setAvailModalIdx(idx)}
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
                        onPress={() => setEditIdx(idx)}
                      >
                        <Pencil size={18} color="#888" />
                      </TouchableOpacity>
                    </MotiView>
                  ))
                )}
              </View>
            </ScrollView>
            <ChangeAvailabilityModal
              visible={availModalIdx !== null}
              current={
                // This would need to update the parent state if you want to persist changes
                // For now, do nothing or show a message
                "out_of_stock"
              }
              onClose={() => setAvailModalIdx(null)}
              onChange={handleChangeAvailability}
            />
            {editIdx !== null && (
              <EditMenuItemModal
                visible={editIdx !== null}
                item={filteredItems[editIdx]}
                onClose={() => setEditIdx(null)}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
                categories={categories} // Pass categories prop
              />
            )}
          </MotiView>
        )}
      </AnimatePresence>
      {/* Full screen image modal */}
      {fullScreenImage && (
        <Modal visible={true} transparent animationType="fade">
          <TouchableOpacity
            style={styles.fullScreenOverlay}
            activeOpacity={1}
            onPress={() => setFullScreenImage(null)}
          >
            <Image
              source={{ uri: fullScreenImage }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
});
