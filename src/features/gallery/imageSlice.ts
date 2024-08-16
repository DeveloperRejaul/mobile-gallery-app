import { RootState } from '@/src/core/rtk/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

interface ImagesState {
  images: Record<string, string>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: ImagesState = {
  images: {},
  status: 'idle',
  error: null,
};


export const fetchImage = createAsyncThunk<string, string>(
  'images/fetchImage',
  async (url) => {
    try {
      const path = `${FileSystem.cacheDirectory}${url.split('/').pop()}`
      const imageExists = await FileSystem.getInfoAsync(path);

      if (imageExists.exists) { 
        return path;
      }
      const { uri } = await FileSystem.downloadAsync(url, path);    
      return uri;
    } catch (error) {
      throw new Error('Failed to download image');
    }
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImage.fulfilled, (state,  action: PayloadAction<string, string, { arg: string }>) => {
        state.status = 'succeeded';
        state.images[action.meta.arg] = action.payload;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default imagesSlice.reducer;
export const selectImageByURL = (state: RootState, url: string) => state.images.images[url];