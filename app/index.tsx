import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!email) return "Email is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return "Enter a valid email.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleLogin = () => {
    const err = validate();
    setError(err);
    setSubmitted(true);
    if (!err) {
      console.log({ email, password });
      router.push("/home");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-3xl font-bold text-center mb-12 text-black">
          LogIn
        </Text>
        <View className="w-full border-2 border-gray-400 rounded-2xl mb-4 px-4 bg-white flex-row items-center">
          <TextInput
            className="flex-1 h-14 text-lg text-black font-semibold"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
        </View>
        {submitted && error && error.toLowerCase().includes("email") ? (
          <Text className="text-red-600 text-sm mb-2 w-full text-left">
            {error}
          </Text>
        ) : null}
        <View className="w-full border-2 border-gray-400 rounded-2xl mb-4 px-4 bg-white flex-row items-center">
          <TextInput
            className="flex-1 h-14 text-lg text-black font-semibold"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            className="p-1"
            onPress={() => setShowPassword((v) => !v)}
            hitSlop={10}
          >
            {showPassword ? (
              <Eye size={24} color="#222" />
            ) : (
              <EyeOff size={24} color="#222" />
            )}
          </TouchableOpacity>
        </View>
        {submitted && error && error.toLowerCase().includes("password") ? (
          <Text className="text-red-600 text-sm mb-2 w-full text-left">
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          className="w-full bg-blue-500 py-4 rounded-xl items-center mt-2"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
