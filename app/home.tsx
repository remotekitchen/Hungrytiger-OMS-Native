import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-2xl font-bold">Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
