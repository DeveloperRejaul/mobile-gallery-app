import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '@/src/features/gallery/slice/cacheImageSlice'
export const store = configureStore({
  reducer: {
    images: imageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;