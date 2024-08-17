import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '@/src/features/gallery/slice/cache'
import { api } from './api';
import photosReducer from '@/src/features/gallery/slice/photos'
import albumReducer from '@/src/features/gallery/slice/album'
import searchReducer from '@/src/features/gallery/slice/search'

export const store = configureStore({
  reducer: {
    images: imageReducer,
    photos: photosReducer,
    album: albumReducer,
    search: searchReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;