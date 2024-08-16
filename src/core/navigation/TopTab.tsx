import Album from "@/src/features/gallery/pages/Album";
import Gallery from "@/src/features/gallery/pages/gallery";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBar from "@/src/core/components/TabBar";

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="home" component={Gallery} />
      <Tab.Screen name="album" component={Album} />
    </Tab.Navigator>
  );
}
