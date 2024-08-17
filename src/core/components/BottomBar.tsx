import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import DeleteIcon from "@/src/core/assets/icons/delete";
import { colors } from "@/src/core/constant/colors";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface IBottomBarProps {
  isActive?: boolean;
  onDelete?: () => void;
}

const BAR_HEIGHT = 80;

export default function BottomBar({ isActive, onDelete }: IBottomBarProps) {
  const translateY = useSharedValue(BAR_HEIGHT);

  useEffect(() => {
    if (isActive) {
      translateY.value = withTiming(0, { duration: 200 });
    } else {
      translateY.value = withTiming(BAR_HEIGHT, { duration: 200 });
    }
  }, [isActive]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.iconsBody}>
        <DeleteIcon color={colors.error[600]} size={30} onPress={onDelete} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BAR_HEIGHT,
    width: "100%",
    borderTopColor: "#00000015",
    borderTopWidth: 2,
    position: "absolute",
    backgroundColor: colors.light[100],
    bottom: 0,
  },
  iconsBody: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
});
