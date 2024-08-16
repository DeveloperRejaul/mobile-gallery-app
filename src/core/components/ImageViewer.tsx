import React, { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/core/rtk/store";
import { fetchImage } from "@/src/features/gallery/slice/cacheImageSlice";
import { Skeleton } from "moti/skeleton";
import { checkEqual, checkEqualString } from "@/src/core/utils/redux";
import Error from "./Error";
import { CACHE_PATH } from "../constant/constant";
interface ImageViewerProps {
  imageUrl: string;
}
const ImageViewer = ({ imageUrl }: ImageViewerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const urlId = imageUrl.split("/").pop() as string;
  const imageUri = useSelector(
    (state: RootState) => state.images.images[urlId],
    checkEqualString
  );

  useEffect(() => {
    if (imageUri === undefined) {
      dispatch(fetchImage(imageUrl));
    }
  }, []);

  const status = useSelector(
    (state: RootState) => state.images.status,
    checkEqualString
  );
  const error = useSelector(
    (state: RootState) => state.images.error,
    checkEqual
  );

  if (status === "loading") return <Loading />;
  if (status === "failed") return <Error error={error} />;

  return imageUri ? (
    <Image
      source={{ uri: CACHE_PATH + imageUri }}
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
