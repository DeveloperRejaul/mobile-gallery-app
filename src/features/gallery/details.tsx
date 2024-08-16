import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { PADDING_H } from "@/src/core/constant/constant";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/src/core/components/Header";
import { rootStyle } from "@/src/core/styles/styles";
import { colors } from "@/src/core/constant/colors";
import { upperFastChar } from "@/src/core/utils/string";
import ImageViewer from "@/src/core/components/ImageViewer";

export default function Details() {
  const data = useLocalSearchParams();
  const router = useRouter();
  const { width: WIDTH } = useWindowDimensions();
  const IMG_WIDTH = WIDTH - PADDING_H * 2;

  return (
    <View style={rootStyle.container}>
      <Header text="Details" onPress={() => router.back()} />
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>Id: {data.id}</Text>
          <Text style={styles.text}>albumId: {data.albumId}</Text>
          <Text style={styles.text}>
            Title: {upperFastChar(data.title.toString())}
          </Text>
        </View>
        <View style={[{ width: IMG_WIDTH, height: IMG_WIDTH }, styles.imgBody]}>
          <ImageViewer imageUrl={data.url.toString()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    flex: 1,
    rowGap: 30,
    marginTop: -50,
  },
  imgBody: {
    overflow: "hidden",
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    fontSize: 20,
    color: colors.dark[900],
  },
});
