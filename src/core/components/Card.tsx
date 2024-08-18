import { StyleSheet, TouchableOpacity, View } from "react-native";
import ImageViewer from "./ImageViewer";
import type { IAllPhotosProps } from "@/src/features/gallery/types";
import { colors } from "@/src/core/constant/colors";
import { CARD_WIDTH } from "../constant/constant";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackScreenType } from "../navigation/types";
import CheckBall from "./CheckBall";
import { checkEqual } from "@/src/core/utils/redux";

export default memo((props: IAllPhotosProps) => {
  const { id, thumbnailUrl, albumId, title, url } = props;
  const navigation = useNavigation<NavigationProp<StackScreenType>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("details", {
          id,
          thumbnailUrl,
          albumId,
          title,
          url,
        })
      }
      onLongPress={props.onLongPress}
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
        <>
          <ImageViewer imageUrl={thumbnailUrl} />
          <View style={styles.ballBody}>
            <CheckBall
              isActive={props.isActive}
              onPress={(isSelected) => props.onPress(props.id, isSelected)}
            />
          </View>
        </>
      </Skeleton>
    </TouchableOpacity>
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
  ballBody: {
    position: "absolute",
    bottom: 5,
    right: 0,
  },
});
