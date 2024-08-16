import Details from "@/src/features/gallery/pages/details";
import { createStackNavigator } from "@react-navigation/stack";
import TopTabs from "./TopTab";
import Search from "@/src/features/search/search";
import { Easing } from "react-native";
const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={TopTabs} />
      <Stack.Screen
        name="details"
        component={Details}
        options={{
          animationEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 500,
                easing: Easing.out(Easing.poly(5)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500,
                easing: Easing.in(Easing.poly(5)),
              },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          animationEnabled: true,
          gestureDirection: "vertical",
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
}
