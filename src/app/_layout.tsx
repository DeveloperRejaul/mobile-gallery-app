import "react-native-reanimated";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/src/core/rtk/store";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <Provider store={store}>
      <StatusBar style={isDark ? "dark" : "light"} />
      <Stack screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
