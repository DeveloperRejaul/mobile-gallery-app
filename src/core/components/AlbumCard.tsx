import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { IAlbumItemProps } from "@/src/features/gallery/types";
import ImageViewer from "./ImageViewer";
import { CARD_WIDTH } from "@/src/core/constant/constant";
import { colors } from "@/src/core/constant/colors";
import CheckBall from "./CheckBall";

const checkProps = (pre: IAlbumItemProps, next: IAlbumItemProps) => {
  return pre.albumId === next.albumId;
};

export default memo((props: IAlbumItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onLongPress={props.onLongPress}>
      <View style={styles.imgBody}>
        <ImageViewer imageUrl={props.thumbnail} />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.text}>Total Photos: {props.total}</Text>
          <Text style={styles.text}>Album Id: {props.albumId}</Text>
        </View>
        <CheckBall
          isActive={props.isActive}
          onPress={(isChecked) => props.onPress(props.albumId, isChecked)}
        />
      </View>
    </TouchableOpacity>
  );
}, checkProps);

const styles = StyleSheet.create({
  imgBody: {
    width: CARD_WIDTH - 10,
    height: CARD_WIDTH * 0.8,
    overflow: "hidden",
    borderRadius: 20,
  },
  container: {
    backgroundColor: colors.primary[100],
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
    padding: 5,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { color: colors.dark[900], fontSize: 14, fontWeight: "600" },
});
