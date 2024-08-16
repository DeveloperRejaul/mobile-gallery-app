import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL, CARD_WIDTH, PADDING_H } from "@/src/core/constant/constant";
import { IParamsType, LayoutGallery } from "../types";
import Card from "@/src/core/components/Card";
import LoadingMore from "@/src/core/components/LoadingMore";

let page = 1;
const limit = 10;

export default function Gallery() {
  const [data, setData] = useState<IParamsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    if (!isLoading) {
      fetchData();
    }
  };

  const renderItem = ({ item }: { item: IParamsType }) => <Card {...item} />;
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
