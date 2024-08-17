import { CACHE_PATH } from '@/src/core/constant/constant';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import { ImagesState } from '@/src/features/gallery/types';


const initialState: ImagesState = {
  images: {},
  status: 'idle',
  error: null,
};


export const fetchImage = createAsyncThunk<string, string>(
  'images/fetchImage',
  async (url) => {
    try {
      const path = `${CACHE_PATH}${url.split('/').pop()}`
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
        const id = action.meta.arg.split("/").pop() as string
        state.images[id] = action.payload.split("/").pop() as string;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default imagesSlice.reducer;