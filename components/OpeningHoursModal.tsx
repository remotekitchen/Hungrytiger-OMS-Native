import { ArrowLeft } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import OpeningHoursEditView from "./OpeningHoursEditView";
import OpeningHoursView from "./OpeningHoursView";

const { width } = Dimensions.get("window");

export default function OpeningHoursModal({
  visible,
  onClose,
  openingHours,
  setOpeningHours,
}) {
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(visible);

  React.useEffect(() => {
    if (visible) setShow(true);
  }, [visible]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setEditMode(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {show && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: 100,
          }}
        >
          <MotiView
            from={{ translateX: width }}
            animate={{ translateX: 0 }}
            exit={{ translateX: width }}
            transition={{ type: "timing", duration: 400 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (editMode) setEditMode(false);
                  else handleClose();
                }}
              >
                <ArrowLeft size={28} color="#222" />
              </TouchableOpacity>
            </View>
            {editMode ? (
              <OpeningHoursEditView
                openingHours={openingHours}
                setOpeningHours={setOpeningHours}
                onCancel={() => setEditMode(false)}
                onSave={(newHours) => {
                  setOpeningHours(newHours);
                  setEditMode(false);
                }}
              />
            ) : (
              <OpeningHoursView
                openingHours={openingHours}
                onEdit={() => setEditMode(true)}
              />
            )}
          </MotiView>
        </View>
      )}
    </AnimatePresence>
  );
}
