import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import OpeningHoursDayRow from "./OpeningHoursDayRow";
import OpeningHoursShiftRow from "./OpeningHoursShiftRow";
import TimePickerModal from "./TimePickerModal";

export default function OpeningHoursEditView({
  openingHours,
  setOpeningHours,
  onCancel,
  onSave,
}) {
  const [expandedDays, setExpandedDays] = useState([]);
  const [localHours, setLocalHours] = useState(
    JSON.parse(JSON.stringify(openingHours))
  );
  const [picker, setPicker] = useState(null); // { dayIdx, shiftIdx, field }

  const handleToggle = (idx) => {
    const updated = [...localHours];
    updated[idx].enabled = !updated[idx].enabled;
    setLocalHours(updated);
  };

  const handleArrow = (idx) => {
    setExpandedDays((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleShiftChange = (dayIdx, shiftIdx, field, value) => {
    const updated = [...localHours];
    updated[dayIdx].shifts[shiftIdx][field] = value;
    setLocalHours(updated);
  };

  const handleRemoveShift = (dayIdx, shiftIdx) => {
    const updated = [...localHours];
    updated[dayIdx].shifts.splice(shiftIdx, 1);
    if (updated[dayIdx].shifts.length === 0) updated[dayIdx].enabled = false;
    setLocalHours(updated);
  };

  const handleAddShift = (dayIdx) => {
    const updated = [...localHours];
    if (updated[dayIdx].shifts.length < 2) {
      updated[dayIdx].shifts.push({ start: "11:00", end: "21:00" });
      updated[dayIdx].enabled = true;
      setLocalHours(updated);
    }
  };

  const hasChanged =
    JSON.stringify(localHours) !== JSON.stringify(openingHours);

  // Time picker handlers
  const openPicker = (dayIdx, shiftIdx, field) => {
    setPicker({ dayIdx, shiftIdx, field });
  };
  const closePicker = () => setPicker(null);
  const onPickerOk = (hour, minute) => {
    if (!picker) return;
    const value = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    handleShiftChange(picker.dayIdx, picker.shiftIdx, picker.field, value);
    closePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            margin: 24,
            marginBottom: 12,
          }}
        >
          Edit regular schedule
        </Text>
        {localHours.map((item, idx) => (
          <View key={item.day}>
            <OpeningHoursDayRow
              day={item.day}
              enabled={item.enabled}
              onToggle={() => handleToggle(idx)}
              onArrowPress={() => handleArrow(idx)}
            />
            <AnimatePresence>
              {expandedDays.includes(idx) && item.enabled && (
                <MotiView
                  from={{ opacity: 0, translateY: -10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -10 }}
                  transition={{ type: "timing", duration: 300 }}
                  key={"shift-section"}
                >
                  {item.shifts.map((shift, sidx) => (
                    <OpeningHoursShiftRow
                      key={sidx}
                      start={shift.start}
                      end={shift.end}
                      onStartChange={() => openPicker(idx, sidx, "start")}
                      onEndChange={() => openPicker(idx, sidx, "end")}
                      onRemove={() => handleRemoveShift(idx, sidx)}
                    />
                  ))}
                  {item.shifts.length < 2 && (
                    <TouchableOpacity
                      onPress={() => handleAddShift(idx)}
                      style={{ marginLeft: 32, marginBottom: 8 }}
                    >
                      <Text
                        style={{
                          color: "#E91E63",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Add a shift
                      </Text>
                    </TouchableOpacity>
                  )}
                </MotiView>
              )}
            </AnimatePresence>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 24,
          borderTopWidth: 1,
          borderTopColor: "#eee",
        }}
      >
        <TouchableOpacity onPress={onCancel}>
          <Text style={{ color: "#E91E63", fontWeight: "bold", fontSize: 18 }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSave(localHours)}
          disabled={!hasChanged}
          style={{
            opacity: hasChanged ? 1 : 0.5,
            backgroundColor: "#f3f4f6",
            borderRadius: 8,
            paddingHorizontal: 32,
            paddingVertical: 12,
          }}
        >
          <Text style={{ color: "#888", fontWeight: "bold", fontSize: 18 }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      {picker && (
        <TimePickerModal
          visible={!!picker}
          onCancel={closePicker}
          onOk={onPickerOk}
          initialHour={parseInt(
            localHours[picker.dayIdx].shifts[picker.shiftIdx][
              picker.field
            ].split(":")[0],
            10
          )}
          initialMinute={parseInt(
            localHours[picker.dayIdx].shifts[picker.shiftIdx][
              picker.field
            ].split(":")[1],
            10
          )}
          label={picker.field === "start" ? "STARTS AT" : "ENDS AT"}
        />
      )}
    </View>
  );
}
