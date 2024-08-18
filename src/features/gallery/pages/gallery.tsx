import { View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { CARD_WIDTH, TOTAL_COL } from "@/src/core/constant/constant";
import { IAppPhotosRenterProps, IParamsType, LayoutGallery } from "../types";
import Card from "@/src/core/components/Card";
import LoadingMore from "@/src/core/components/LoadingMore";
import BottomBar from "@/src/core/components/BottomBar";
import { styles } from "@/src/features/gallery/styles";
import { useAppSelector } from "@/src/core/hooks/redux";
import {
  useDeletePhotosWithIdMutation,
  useGetPhotosQuery,
  useLazyGetPhotosByPageQuery,
} from "@/src/core/rtk/api";

let page = 1;
const limit = 10;

const selectData: number[] = [];

export default function Gallery() {
  const [isLongPress, setIsLongPress] = useState(false);
  const [deletePhoto] = useDeletePhotosWithIdMutation();
  const { isLoading, data = [] } = useGetPhotosQuery(undefined);
  const [getPhotosByPage, { isLoading: pageLoading }] =
    useLazyGetPhotosByPageQuery();

  const isSearching = useAppSelector((state) => state.search.isSearching);
  const searchText = useAppSelector((state) => state.search.text);
  const searchType = useAppSelector((state) => state.search.type);
  const tab = useAppSelector((state) => state.search.activeTab);

  const handleScrollEnd = () => {
    page = page + 1;
    if (!isLoading && !isSearching && tab === "photos") {
      getPhotosByPage({ page, limit });
    }
  };

  const handlePress = (id: number, isChecked: boolean) => {
    if (isChecked) return selectData.push(id);
    const index = selectData.findIndex((arId) => arId === id);
    if (index || index === 0) selectData.splice(index, 1);
  };

  const handleDelete = () => {
    selectData.forEach((id) => deletePhoto(id));
    selectData.splice(0, selectData.length);
    setIsLongPress(false);
  };

  const renderItem = useCallback(
    ({ item }: IAppPhotosRenterProps) => (
      <Card
        onLongPress={() => setIsLongPress((pre) => !pre)}
        isActive={isLongPress}
        onPress={handlePress}
        {...item}
      />
    ),
    [isLongPress]
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

  // handle search operation
  const titleSearch = (photo: IParamsType) => {
    if (searchText && searchType === "photos") {
      return (
        photo.title.toLowerCase().includes(searchText) ||
        photo.albumId.toString().toLowerCase().includes(searchText)
      );
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
          columnWrapperStyle={{ columnGap: 8, justifyContent: "space-between" }}
          keyExtractor={keyExtractor}
          onEndReached={handleScrollEnd}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={10}
          windowSize={2}
          initialNumToRender={15}
          removeClippedSubviews={true}
          ListFooterComponent={
            isLoading || pageLoading ? <LoadingMore /> : null
          }
          renderItem={renderItem}
        />
      </View>
      <BottomBar isActive={isLongPress} onDelete={handleDelete} />
    </>
  );
}
