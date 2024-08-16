import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DeleteIcon from "@/src/core/assets/icons/delete";
import { colors } from "@/src/core/constant/colors";
import Animated from "react-native-reanimated";
const BAR_HEIGHT = 80;

export default function BottomBar() {
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: BAR_HEIGHT }] }]}
    >
      <View style={styles.iconsBody}>
        <DeleteIcon color={colors.error[600]} size={30} />
        <DeleteIcon color={colors.error[600]} size={30} />
        <DeleteIcon color={colors.error[600]} size={30} />
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
