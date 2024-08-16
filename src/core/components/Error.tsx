import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constant/colors";

export default function Error(props: { error?: string | null }) {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>Error: {props.error}</Text>;
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: { fontSize: 20, fontWeight: "600", color: colors.dark[900] },
});
