import { Pressable, StyleSheet } from "react-native";
import ImageViewer from "./ImageViewer";
import { IParamsType } from "@/src/features/gallery/types";
import { colors } from "@/src/core/constant/colors";
import { CARD_WIDTH } from "../constant/constant";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackScreenType } from "../navigation/types";
import { checkEqual } from "@/src/core/utils/redux";

export default memo((props: IParamsType) => {
  const { id, thumbnailUrl } = props;
  const navigation = useNavigation<NavigationProp<StackScreenType>>();

  return (
    <Pressable
      onPress={() => navigation.navigate("details", props)}
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
}, checkEqual);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.success[100],
    borderRadius: 7,
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    overflow: "hidden",
  },
});
