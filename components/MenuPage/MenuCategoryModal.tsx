import { ArrowLeft, ChevronDown, Pencil } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const mockMenuItems = [
  {
    name: "Chicken Biryani Half",
    image: require("../../assets/images/icon.png"),
    available: true,
    category: "বিরিয়ানি",
    price: 79.0,
    description:
      "সুগন্ধি মসলা ও চালের স্তরে তৈরি স্বাদে ভরপুর বিরিয়ানি, আপনার পছন্দের মাংস বা শাকসবজির সাথে পরিবেশিত।",
  },
  {
    name: "Chicken Biryani Full",
    image: require("../../assets/images/icon.png"),
    available: true,
    category: "বিরিয়ানি",
    price: 149.0,
    description: "ফুল প্লেট বিরিয়ানি, সুগন্ধি চাল ও মসলার মিশেলে।",
  },
  {
    name: "Egg Khichuri",
    image: require("../../assets/images/icon.png"),
    available: false,
    category: "খিচুরি",
    price: 39.0,
    description:
      "সুগন্ধি মসলা ও চালের স্তরে তৈরি স্বাদে ভরপুর খিচুরি, আপনার পছন্দের মাংস বা শাকসবজির সাথে পরিবেশিত।",
  },
  {
    name: "Chicken Khichuri",
    image: require("../../assets/images/icon.png"),
    available: false,
    category: "খিচুরি",
    price: 49.0,
    description:
      "সুগন্ধি মসলা ও চালের স্তরে তৈরি স্বাদে ভরপুর খিচুরি, আপনার পছন্দের মাংস বা শাকসবজির সাথে পরিবেশিত।",
  },
  {
    name: "Beef Khichuri",
    image: require("../../assets/images/icon.png"),
    available: true,
    category: "কারি",
    price: 69.0,
    description:
      "সুগন্ধি মসলা ও চালের স্তরে তৈরি স্বাদে ভরপুর বিরিয়ানি, আপনার পছন্দের মাংস বা শাকসবজির সাথে পরিবেশিত।",
  },
  {
    name: "Beef Biryani",
    image: require("../../assets/images/icon.png"),
    available: true,
    category: "কারি",
    price: 129.0,
    description: "ফুল প্লেট বিরিয়ানি, সুগন্ধি চাল ও মসলার মিশেলে।",
  },
  {
    name: "Morog Polao",
    image: require("../../assets/images/icon.png"),
    available: false,
    category: "কোম্বো",
    price: 89.0,
    description:
      "সুগন্ধি মসলা ও চালের স্তরে তৈরি স্বাদে ভরপুর বিরিয়ানি, আপনার পছন্দের মাংস বা শাকসবজির সাথে পরিবেশিত।",
  },
  {
    name: "Plain Rice",
    image: require("../../assets/images/icon.png"),
    available: false,
    category: "কোম্বো",
    price: 29.0,
    description:
      "সুগন্ধি মসলা ও চালের স্তরে তৈরি স্বাদে ভরপুর বিরিয়ানি, আপনার পছন্দের মাংস বা শাকসবজির সাথে পরিবেশিত।",
  },
];

const AVAILABILITY_OPTIONS = [
  { key: "in_stock", label: "In Stock" },
  { key: "sold_out_today", label: "Sold Out Today" },
  { key: "out_of_stock", label: "Out of Stock" },
];

const CATEGORIES = ["বিরিয়ানি", "খিচুরি", "কোম্বো", "কারি", "ড্রিঙ্কস"];

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
}: {
  visible: boolean;
  onClose: () => void;
  item: any;
  onUpdate: (item: any) => void;
  onDelete: () => void;
}) {
  const [category, setCategory] = useState(item.category);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [description, setDescription] = useState(item.description);
  const [image] = useState(item.image); // static image
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
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      style={{
                        paddingVertical: 16,
                        paddingHorizontal: 18,
                        backgroundColor:
                          cat === category ? "#E5E1EB" : "#F5F3F7",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{cat}</Text>
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
                    category,
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
}: {
  visible: boolean;
  category: string | null;
  onClose: () => void;
}) {
  const [show, setShow] = useState(visible);
  const [closing, setClosing] = useState(false);
  const [items, setItems] = useState(mockMenuItems);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [availModalIdx, setAvailModalIdx] = useState<number | null>(null);

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

  const handleToggle = (idx: number) => {
    if (!items[idx].available) {
      setItems((prev) =>
        prev.map((it, i) => (i === idx ? { ...it, available: true } : it))
      );
    } else {
      setAvailModalIdx(idx);
    }
  };

  const handleChangeAvailability = (option: string) => {
    if (availModalIdx !== null) {
      setItems((prev) =>
        prev.map((it, i) =>
          i === availModalIdx ? { ...it, available: option === "in_stock" } : it
        )
      );
      setAvailModalIdx(null);
    }
  };

  const handleUpdateItem = (updated: any) => {
    setItems((prev) => prev.map((it, i) => (i === editIdx ? updated : it)));
    setEditIdx(null);
  };

  const handleDeleteItem = () => {
    setItems((prev) => prev.filter((_, i) => i !== editIdx));
    setEditIdx(null);
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
            <View style={{ paddingHorizontal: 8, marginTop: 4 }}>
              {items.map((item, idx) => (
                <MotiView
                  key={item.name}
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
                  <Image
                    source={item.image}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      marginRight: 12,
                    }}
                    resizeMode="cover"
                  />
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
                    value={item.available}
                    trackColor={{ false: "#D1D5DB", true: "#34D399" }}
                    thumbColor={item.available ? "#10B981" : "#ccc"}
                    style={{ marginRight: 10 }}
                    onValueChange={() => handleToggle(idx)}
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
              ))}
            </View>
            <ChangeAvailabilityModal
              visible={availModalIdx !== null}
              current={
                items[availModalIdx || 0]?.available
                  ? "in_stock"
                  : "out_of_stock"
              }
              onClose={() => setAvailModalIdx(null)}
              onChange={handleChangeAvailability}
            />
            {editIdx !== null && (
              <EditMenuItemModal
                visible={editIdx !== null}
                item={items[editIdx]}
                onClose={() => setEditIdx(null)}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
              />
            )}
          </MotiView>
        )}
      </AnimatePresence>
    </Modal>
  );
}
