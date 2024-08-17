import { View, FlatList, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL, CARD_WIDTH } from "@/src/core/constant/constant";
import type {
  IAlbumProps,
  IAlbumRenterProps,
  IParamsType,
  LayoutAlbum,
} from "@/src/features/gallery/types";
import AlbumCard from "@/src/core/components/AlbumCard";
import BottomBar from "@/src/core/components/BottomBar";
import { useDeletePhotosWithAlbumsIdMutation } from "@/src/core/rtk/api";
import { styles } from "@/src/features/gallery/styles";
import { addAlbum, removeAlbum } from "@/src/features/gallery/slice/album";
import { useAppDispatch, useAppSelector } from "@/src/core/hooks/redux";
import { checkEqual } from "@/src/core/utils/redux";
import { formatAlbum } from "@/src/core/utils/utils";

const albums: IAlbumProps[] = [];
const limit = 10;
let fastIndex = 0;
let lastIndex = limit;
const albumsSelectData: number[] = [];

export default function Album() {
  const [isLongPress, setIsLongPress] = useState(false);
  const [deleteAlbum] = useDeletePhotosWithAlbumsIdMutation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.album.album, checkEqual);

  const isSearching = useAppSelector((state) => state.search.isSearching);
  const searchText = useAppSelector((state) => state.search.text);
  const searchType = useAppSelector((state) => state.search.type);

  const { width: WIDTH } = useWindowDimensions();
  const TOTAL_COL = Math.floor(WIDTH / CARD_WIDTH + 0.8);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/photos`);
      const result = (await res.json()) as IParamsType[];
      albums.push(...formatAlbum(result));
      dispatch(addAlbum(albums.slice(fastIndex, lastIndex)));
    })();
  }, []);

  const handleAlbumSelect = useCallback((id: number, isChecked: boolean) => {
    if (isChecked) return albumsSelectData.push(id);
    const index = albumsSelectData.findIndex((arId) => arId === id);
    if (index || index === 0) albumsSelectData.splice(index, 1);
  }, []);

  const renderItem = ({ item }: IAlbumRenterProps) => (
    <AlbumCard
      {...item}
      onLongPress={() => setIsLongPress((pre) => !pre)}
      isActive={isLongPress}
      onPress={handleAlbumSelect}
    />
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
    if (lastIndex <= albums.length && !isSearching) {
      fastIndex = lastIndex;
      lastIndex += limit;
      dispatch(addAlbum(albums.slice(fastIndex, lastIndex)));
    }
  };

  const handleDelete = () => {
    dispatch(removeAlbum(albumsSelectData));
    albumsSelectData.forEach((id) => deleteAlbum(albumsSelectData[id]));
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
  const newData = data.filter(titleSearch);

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
