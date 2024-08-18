import { View, Text, StyleSheet } from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import SearchIcon from "@/src/core/assets/icons/search";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "@/src/core/constant/colors";
import { useAppDispatch } from "@/src/core/hooks/redux";
import Search from "./search";
import {
  activeAlbum,
  activePhotos,
  searchActive,
  searchInActive,
  setAlbumType,
  setPhotosType,
} from "@/src/features/gallery/slice/search";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function TabBar(props: MaterialTopTabBarProps) {
  const { state, navigation } = props;
  const home = { name: state.routes[0].name, key: state.routes[0].key };
  const album = { name: state.routes[1].name, key: state.routes[1].key };
  const isAllPhotoActive = state.index === 0;
  const isAlbumActive = state.index === 1;

  const search = useSharedValue(0);
  const bar = useSharedValue(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAlbumActive) dispatch(activeAlbum());
    if (isAllPhotoActive) dispatch(activePhotos());
  }, [isAllPhotoActive, isAlbumActive]);

  const onPress = (key: string, routeName: string) => {
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) navigation.navigate(routeName);
  };

  const handleSearchCancel = () => {
    bar.value = withTiming(1, { duration: 300 });
    search.value = withTiming(0, { duration: 300 });
    dispatch(searchInActive());
  };

  const handleSearchActive = () => {
    bar.value = withTiming(0, { duration: 300 });
    search.value = withTiming(1, { duration: 300 });
    dispatch(searchActive());
    if (isAllPhotoActive) dispatch(setPhotosType());
    if (isAlbumActive) dispatch(setAlbumType());
  };

  const barAnimation = useAnimatedStyle(() => ({
    zIndex: bar.value,
    opacity: bar.value,
  }));
  const searchAnimation = useAnimatedStyle(() => ({
    zIndex: search.value,
    opacity: search.value,
  }));

  return (
    <View style={{ height: 80 }}>
      <Animated.View style={[{ position: "absolute" }, searchAnimation]}>
        <Search onCancel={handleSearchCancel} />
      </Animated.View>

      <Animated.View style={[styles.container, barAnimation]}>
        <TouchableOpacity style={[styles.content]} onPress={handleSearchActive}>
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
      </Animated.View>
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
    position: "absolute",
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
