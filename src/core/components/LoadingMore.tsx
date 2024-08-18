import { StyleSheet, View } from "react-native";
import { CARD_WIDTH, TOTAL_COL } from "../constant/constant";
import { Skeleton } from "moti/skeleton";

const Loading = new Array(TOTAL_COL).fill(0).map((_, i) => i);

export default function LoadingMore() {
  const props = {
    colorMode: "light",
    radius: "square",
    height: "100%",
    width: "100%",
  } as const;

  return (
    <View style={styles.container}>
      {Loading.map((i) => (
        <View key={i} style={styles.body}>
          <Skeleton {...props} />
        </View>
      ))}
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
