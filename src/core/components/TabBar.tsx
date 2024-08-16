import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import SearchIcon from "../assets/icons/search";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constant/colors";

export default function TabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const home = { name: state.routes[0].name, key: state.routes[0].key };
  const album = { name: state.routes[1].name, key: state.routes[1].key };
  const isAllPhotoActive = state.index === 0;
  const isAlbumActive = state.index === 1;

  const onPress = (key: string, routeName: string) => {
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.content]}
        onPress={() => navigation.navigate("search")}
      >
        <SearchIcon size={35} />
      </TouchableOpacity>
      <View style={[styles.content, styles.labelBody]}>
        <TouchableOpacity onPress={() => onPress(home.key, home.name)}>
          <Text
            style={[
              styles.label,
              {
                color: isAllPhotoActive
                  ? colors.success[500]
                  : colors.dark[900],
              },
            ]}
          >
            All Photos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(album.key, album.name)}>
          <Text
            style={[
              styles.label,
              {
                color: isAlbumActive ? colors.success[500] : colors.dark[900],
              },
            ]}
          >
            Album
          </Text>
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 25,
  },
  labelBody: {
    flexDirection: "row",
    columnGap: 30,
  },
  label: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
