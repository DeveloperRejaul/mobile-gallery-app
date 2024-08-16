import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { PADDING_H } from "@/src/core/constant/constant";
import Header from "@/src/core/components/Header";
import { colors } from "@/src/core/constant/colors";
import { upperFastChar } from "@/src/core/utils/string";
import ImageViewer from "@/src/core/components/ImageViewer";

export default function Details(props: any) {
  const { width: WIDTH } = useWindowDimensions();
  const IMG_WIDTH = WIDTH - PADDING_H * 2;
  const params = props.route.params;

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: PADDING_H,
    flex: 1,
  },
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
