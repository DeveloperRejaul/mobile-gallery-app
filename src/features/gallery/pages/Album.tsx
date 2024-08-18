import { View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { CARD_WIDTH, TOTAL_COL } from "@/src/core/constant/constant";
import AlbumCard from "@/src/core/components/AlbumCard";
import BottomBar from "@/src/core/components/BottomBar";
import { styles } from "@/src/features/gallery/styles";
import { formatAlbum } from "@/src/core/utils/utils";
import {
  useDeletePhotosWithAlbumsIdMutation,
  useGetPhotosQuery,
} from "@/src/core/rtk/api";
import type {
  IAlbumProps,
  IAlbumRenterProps,
  LayoutAlbum,
} from "@/src/features/gallery/types";
import { useAppSelector } from "@/src/core/hooks/redux";

const albumsSelectData: number[] = [];

export default function Album() {
  const [isLongPress, setIsLongPress] = useState(false);
  const { data = [] } = useGetPhotosQuery(undefined);

  const [deleteAlbum] = useDeletePhotosWithAlbumsIdMutation();
  const searchText = useAppSelector((state) => state.search.text);
  const searchType = useAppSelector((state) => state.search.type);

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

  const handleDelete = () => {
    albumsSelectData.forEach((id) => deleteAlbum(id));
    albumsSelectData.splice(0, albumsSelectData.length);
    setIsLongPress(false);
  };

  // handle search operation
  const titleSearch = (item: IAlbumProps) => {
    if (searchText && searchType === "album") {
      return item.albumId.toString().toLowerCase().includes(searchText);
    } else {
      return true;
    }
  };
  const newData = formatAlbum(data).filter(titleSearch);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.cardContainer}
          data={newData}
          numColumns={TOTAL_COL}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ columnGap: 8 }}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={2}
          initialNumToRender={15}
          renderItem={renderItem}
        />
      </View>
      <BottomBar isActive={isLongPress} onDelete={handleDelete} />
    </>
  );
}
