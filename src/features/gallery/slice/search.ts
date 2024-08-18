import { createSlice } from "@reduxjs/toolkit";

interface IInitialStateType {
  isSearching: boolean;
  text: string | null;
  type: "photos" | "album";
  activeTab: "photos" | "album";
}

const initialState: IInitialStateType = {
  isSearching: false,
  text: null,
  type: "photos",
  activeTab: "photos",
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchActive: (state) => {
      state.isSearching = true;
    },
    searchInActive: (state) => {
      state.isSearching = false;
    },
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
    setPhotosType: (state) => {
      state.type = "photos";
    },
    setAlbumType: (state) => {
      state.type = "album";
    },
    activeAlbum: (state) => {
      state.activeTab = "album";
    },
    activePhotos: (state) => {
      state.activeTab = "photos";
    },
  },
});

export const {
  searchActive,
  searchInActive,
  setSearchText,
  setPhotosType,
  setAlbumType,
  activeAlbum,
  activePhotos,
} = search.actions;
export default search.reducer;
