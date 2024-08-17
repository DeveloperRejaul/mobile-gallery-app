import { Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { PADDING_H } from "@/src/core/constant/constant";
import Header from "@/src/core/components/Header";
import { upperFastChar } from "@/src/core/utils/string";
import ImageViewer from "@/src/core/components/ImageViewer";
import { styles } from "@/src/features/gallery/styles";

export default function Details(props: any) {
  const { width: WIDTH } = useWindowDimensions();
  const IMG_WIDTH = WIDTH - PADDING_H * 2;
  const params = props.route.params;

  return (
    <View style={styles.containerDetails}>
      <Header text="Details" onPress={() => props.navigation.goBack()} />
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>Id: {params.id}</Text>
          <Text style={styles.text}>albumId: {params.albumId}</Text>
          <Text style={styles.text}>
            Title: {upperFastChar(params.title.toString())}
          </Text>
        </View>
        <View style={[{ width: IMG_WIDTH, height: IMG_WIDTH }, styles.imgBody]}>
          <ImageViewer imageUrl={params.url.toString()} />
        </View>
      </View>
    </View>
  );
}
