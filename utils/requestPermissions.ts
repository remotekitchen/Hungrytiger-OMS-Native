import { requestRecordingPermissionsAsync } from "expo-audio";
import { Camera } from "expo-camera"; // ✅ SDK 53+ import
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as Notifications from "expo-notifications";

type PermissionMap = {
  [key: string]: string;
};

export const requestAllPermissions = async (): Promise<PermissionMap | { error: string }> => {
  const results: PermissionMap = {};

  try {
    // 📍 Location
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    results["location"] = locationStatus;

    // 🔔 Notifications
    const { status: notifStatus } = await Notifications.requestPermissionsAsync();
    results["notifications"] = notifStatus;

    // 📸 Camera (modern method using Camera module)
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    results["camera"] = cameraStatus;

    // 🗂 Media/Storage
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
    results["media"] = mediaStatus;

    // 🎙 Microphone
    const { status: micStatus } = await requestRecordingPermissionsAsync();
    results["microphone"] = micStatus;

    // ❗ Log denied permissions
    const denied = Object.entries(results).filter(([_, status]) => status !== "granted");
    if (denied.length > 0) {
      console.warn("Some permissions were denied:", denied.map(([key]) => key).join(", "));
    }

    return results;
  } catch (error) {
    console.error("Error requesting permissions:", error);
    return { error: "Failed to request some or all permissions." };
  }
};
