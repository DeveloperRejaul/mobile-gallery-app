import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Search from "@/src/core/components/search";
import { BASE_URL, CARD_WIDTH } from "@/src/core/constant/constant";
import { rootStyle } from "@/src/core/styles/styles";
import { IParamsType } from "./types";
import Card from "@/src/core/components/Card";
import LoadingMore from "@/src/core/components/LoadingMore";

let page = 1;
let totalPages = 10;

export default function Gallery() {
  const [data, setData] = useState<IParamsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width: WIDTH } = useWindowDimensions();
  const TOTAL_COL = Math.floor(WIDTH / CARD_WIDTH + 0.8);

  const fetchData = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/photos?_page=${page}&_limit=${10}`);
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
    if (!isLoading && totalPages >= page) {
      fetchData();
    }
  };

  const renderItem = ({ item }: { item: IParamsType }) => <Card {...item} />;
  const keyExtractor = (item: IParamsType, index: number) => {
    return `${item.id}-${index}`;
  };
  const getItemLayout = (
    data: ArrayLike<IParamsType> | null | undefined,
    index: number
  ) => {
    return {
      length: CARD_WIDTH,
      offset: CARD_WIDTH * index,
      index,
    };
  };

  return (
    <View style={rootStyle.container}>
      <Search />
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
        windowSize={5}
        initialNumToRender={20}
        removeClippedSubviews={true}
        ListFooterComponent={
          isLoading && data.length >= 0 ? <LoadingMore /> : null
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    rowGap: 10,
    paddingBottom: CARD_WIDTH + 30,
  },
});
