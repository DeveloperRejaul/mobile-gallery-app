import React, { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/core/rtk/store";
import {
  fetchImage,
  selectImageByURL,
} from "@/src/features/gallery/imageSlice";
import { Skeleton } from "moti/skeleton";
import Error from "./Error";

interface ImageViewerProps {
  imageUrl: string;
}

const ImageViewer = ({ imageUrl }: ImageViewerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const imageUri = useSelector((state: RootState) =>
    selectImageByURL(state, imageUrl)
  );
  const status = useSelector((state: RootState) => state.images.status);
  const error = useSelector((state: RootState) => state.images.error);

  useEffect(() => {
    if (!imageUri) dispatch(fetchImage(imageUrl));
  }, [imageUri]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <Error error={error} />;

  return imageUri ? (
    <Image
      source={{ uri: imageUri }}
      style={{ width: "100%", height: "100%", resizeMode: "cover" }}
    />
  ) : (
    <Loading />
  );
};

function Loading() {
  return (
    <Skeleton
      show={true}
      colorMode="light"
      radius="square"
      height="100%"
      width="100%"
    />
  );
}
export default ImageViewer;
