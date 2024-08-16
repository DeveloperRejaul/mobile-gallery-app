import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArrowBackIcon from "@/src/core/assets/icons/arrowBack";
import { colors } from "@/src/core/constant/colors";

interface IHeaterProps {
  text: string;
  onPress?: () => void;
}

export default function Header(props: IHeaterProps) {
  return (
    <View style={styles.container}>
      <ArrowBackIcon size={30} onPress={props.onPress} />
      <Text style={styles.text}>{props.text || "My Header"}</Text>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark[500],
  },
});
