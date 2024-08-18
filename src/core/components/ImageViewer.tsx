import React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import Loading from "./Loading";
interface ImageViewerProps {
  imageUrl: string;
}
export default function ImageViewer({ imageUrl }: ImageViewerProps) {
  return (
    <FastImage
      style={styles.img}
      source={{
        uri: imageUrl,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

const styles = StyleSheet.create({
  img: { width: "100%", height: "100%", resizeMode: "cover" },
});
