import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL, CARD_WIDTH, PADDING_H } from "@/src/core/constant/constant";
import type {
  IAlbumProps,
  IAlbumRenterProps,
  IParamsType,
  LayoutAlbum,
} from "@/src/features/gallery/types";
import AlbumCard from "@/src/core/components/AlbumCard";
import { formatAlbum } from "@/src/core/utils/utils";
import BottomBar from "@/src/core/components/BottomBar";
import { useDeletePhotosWithAlbumsIdMutation } from "@/src/core/rtk/api";

const albums: IAlbumProps[] = [];
const albumsSelectData: number[] = [];
const limit = 10;
let fastIndex = 0;
let lastIndex = limit;

export default function Album() {
  const [data, setData] = useState<IAlbumProps[]>([]);
  const [isLongPress, setIsLongPress] = useState(false);
  const [deleteAlbum] = useDeletePhotosWithAlbumsIdMutation();

  const { width: WIDTH } = useWindowDimensions();
  const TOTAL_COL = Math.floor(WIDTH / CARD_WIDTH + 0.8);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/photos`);
      const result = (await res.json()) as IParamsType[];
      albums.push(...formatAlbum(result));
      setData(albums.slice(fastIndex, lastIndex));
    })();
  }, []);

  const handleAlbumSelect = useCallback((id: number, isChecked: boolean) => {
    if (isChecked) return albumsSelectData.push(id);
    const index = albumsSelectData.findIndex((arId) => arId === id);
    if (index || index === 0) albumsSelectData.splice(index, 1);
  }, []);

  const renderItem = useCallback(
    ({ item }: IAlbumRenterProps) => (
      <AlbumCard
        {...item}
        onLongPress={() => setIsLongPress((pre) => !pre)}
        isActive={isLongPress}
        onPress={handleAlbumSelect}
      />
    ),
    [isLongPress]
  );

  const keyExtractor = (item: IAlbumProps, index: number) => {
    return `${item.albumId}-${index}`;
  };

  const getItemLayout = (data: LayoutAlbum, index: number) => {
    return {
      length: CARD_WIDTH,
      offset: CARD_WIDTH * index,
      index,
    };
  };

  const handleScrollEnd = () => {
    if (lastIndex <= albums.length) {
      fastIndex = lastIndex;
      lastIndex += limit;
      setData((pre) => [...pre, ...albums.slice(fastIndex, lastIndex)]);
    }
  };

  const handleDelete = () => {
    setData((pre) => {
      return pre.filter((item) => !albumsSelectData.includes(item.albumId));
    });
    albumsSelectData.forEach((id) => deleteAlbum(albumsSelectData[id]));
    albumsSelectData.splice(0, albumsSelectData.length);
    setIsLongPress(false);
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
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          onEndReached={handleScrollEnd}
          windowSize={2}
          initialNumToRender={15}
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
