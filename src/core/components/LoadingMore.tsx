import { StyleSheet, View } from "react-native";
import { CARD_WIDTH } from "../constant/constant";
import { Skeleton } from "moti/skeleton";

export default function LoadingMore() {
  const props = {
    colorMode: "light",
    radius: "square",
    height: "100%",
    width: "100%",
  } as const;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Skeleton {...props} />
      </View>
      <View style={styles.body}>
        <Skeleton {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  body: {
    borderRadius: 7,
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    overflow: "hidden",
  },
});
