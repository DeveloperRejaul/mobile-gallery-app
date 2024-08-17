import { View, FlatList, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL, CARD_WIDTH } from "@/src/core/constant/constant";
import { IAppPhotosRenterProps, IParamsType, LayoutGallery } from "../types";
import Card from "@/src/core/components/Card";
import LoadingMore from "@/src/core/components/LoadingMore";
import BottomBar from "@/src/core/components/BottomBar";
import { useDeletePhotosWithIdMutation } from "@/src/core/rtk/api";
import { styles } from "@/src/features/gallery/styles";
import { useAppDispatch, useAppSelector } from "@/src/core/hooks/redux";
import { checkEqual } from "@/src/core/utils/redux";
import { addPhotos, removePhotos } from "@/src/features/gallery/slice/photos";

let page = 1;
const limit = 10;

const selectData: number[] = [];

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [deletePhoto] = useDeletePhotosWithIdMutation();
  const data = useAppSelector((state) => state.photos.photos, checkEqual);

  const isSearching = useAppSelector((state) => state.search.isSearching);
  const searchText = useAppSelector((state) => state.search.text);
  const searchType = useAppSelector((state) => state.search.type);

  const dispatch = useAppDispatch();

  const { width: WIDTH } = useWindowDimensions();
  const TOTAL_COL = Math.floor(WIDTH / CARD_WIDTH + 0.8);

  const fetchData = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/photos?_page=${page}&_limit=${limit}`);
    const result = await res.json();
    dispatch(addPhotos(result));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleScrollEnd = () => {
    setIsLoading(true);
    page = page + 1;
    if (!isLoading && !isSearching) fetchData();
  };

  const handlePress = (id: number, isChecked: boolean) => {
    if (isChecked) return selectData.push(id);
    const index = selectData.findIndex((arId) => arId === id);
    if (index || index === 0) selectData.splice(index, 1);
  };

  const handleDelete = () => {
    dispatch(removePhotos(selectData));
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

  // handle search operation
  const titleSearch = (photo: IParamsType) => {
    if (searchText && searchType === "photos") {
      return photo.title.toLowerCase().includes(searchText);
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
