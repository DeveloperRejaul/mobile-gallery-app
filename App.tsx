import "react-native-reanimated";
import "react-native-gesture-handler";
import React from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/src/core/rtk/store";
import { StatusBar } from "expo-status-bar";
import RootNav from "./src/core/navigation/RootNav";

export default function App() {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  return (
    <Provider store={store}>
      <StatusBar style={isDark ? "dark" : "light"} />
      <RootNav />
    </Provider>
  );
}
