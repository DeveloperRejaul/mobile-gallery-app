import { Pressable, StyleSheet } from "react-native";
import ImageViewer from "./ImageViewer";
import { IParamsType } from "@/src/features/gallery/types";
import { useRouter } from "expo-router";
import { colors } from "@/src/core/constant/colors";
import { CARD_WIDTH } from "../constant/constant";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";

export default memo((props: IParamsType) => {
  const { id, thumbnailUrl } = props;
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/details", params: props })}
      key={id}
      style={styles.card}
    >
      <Skeleton
        show={thumbnailUrl === undefined}
        colorMode="light"
        radius="square"
        height={CARD_WIDTH}
        width={CARD_WIDTH}
      >
        <ImageViewer imageUrl={thumbnailUrl} />
      </Skeleton>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.success[100],
    borderRadius: 7,
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    overflow: "hidden",
  },
});
