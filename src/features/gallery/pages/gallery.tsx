import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_URL, CARD_WIDTH, PADDING_H } from "@/src/core/constant/constant";
import { IAppPhotosRenterProps, IParamsType, LayoutGallery } from "../types";
import Card from "@/src/core/components/Card";
import LoadingMore from "@/src/core/components/LoadingMore";
import BottomBar from "@/src/core/components/BottomBar";
import { useDeletePhotosWithIdMutation } from "@/src/core/rtk/api";

let page = 1;
const limit = 10;

const selectData: number[] = [];

export default function Gallery() {
  const [data, setData] = useState<IParamsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [deletePhoto] = useDeletePhotosWithIdMutation();

  const [isError, setIsError] = useState(false);

  const { width: WIDTH } = useWindowDimensions();
  const TOTAL_COL = Math.floor(WIDTH / CARD_WIDTH + 0.8);

  const fetchData = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/photos?_page=${page}&_limit=${limit}`);
    const result = await res.json();
    setData((pre) => [...pre, ...result]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleScrollEnd = () => {
    setIsLoading(true);
    page = page + 1;
    if (!isLoading) fetchData();
  };

  const handlePress = (id: number, isChecked: boolean) => {
    if (isChecked) return selectData.push(id);
    const index = selectData.findIndex((arId) => arId === id);
    if (index || index === 0) selectData.splice(index, 1);
  };

  const handleDelete = () => {
    setData((pre) => pre.filter((item) => !selectData.includes(item.id)));
    selectData.forEach((id) => deletePhoto(selectData[id]));
    selectData.splice(0, selectData.length);
    setIsLongPress(false);
  };

  const renderItem = ({ item }: IAppPhotosRenterProps) => (
    <Card
      onLongPress={() => setIsLongPress((pre) => !pre)}
      isActive={isLongPress}
      onPress={handlePress}
      {...item}
    />
  );

  const keyExtractor = (item: IParamsType, index: number) => {
    return `${item.id}-${index}`;
  };
  const getItemLayout = (data: LayoutGallery, index: number) => {
    return {
      length: CARD_WIDTH,
      offset: CARD_WIDTH * index,
      index,
    };
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.cardContainer}
          data={data}
          numColumns={TOTAL_COL}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ columnGap: 8 }}
          keyExtractor={keyExtractor}
          onEndReached={handleScrollEnd}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={10}
          windowSize={2}
          initialNumToRender={15}
          removeClippedSubviews={true}
          ListFooterComponent={isLoading ? <LoadingMore /> : null}
          renderItem={renderItem}
        />
      </View>
      <BottomBar isActive={isLongPress} onDelete={handleDelete} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_H,
    flex: 1,
  },
  cardContainer: {
    rowGap: 10,
    paddingBottom: CARD_WIDTH + 30,
  },
});
