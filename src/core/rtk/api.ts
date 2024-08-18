import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/src/core/constant/constant";
import { IParamsType } from "@/src/features/gallery/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: () => `/photos?_page=1&_limit=10`,
    }),

    getPhotosByPage: builder.query({
      query: ({ page, limit }) => `/photos?_page=${page}&_limit=${limit}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        let cacheData;
        try {
          const { data } = await queryFulfilled;
          cacheData = dispatch(
            api.util.updateQueryData("getPhotos", undefined, (draft) => {
              draft.push(...data);
            })
          );
        } catch (error) {
          cacheData?.undo();
        }
      },
    }),

    deletePhotosWithId: builder.mutation({
      query: (id) => ({ method: "DELETE", url: `/photos/${id}` }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        let cacheData;
        try {
          await queryFulfilled;
          cacheData = dispatch(
            api.util.updateQueryData("getPhotos", undefined, (draft) => {
              return draft.filter((d: IParamsType) => d.id !== id);
            })
          );
        } catch (error) {
          cacheData?.undo();
          console.log(error);
        }
      },
    }),
    deletePhotosWithAlbumsId: builder.mutation({
      query: (id) => ({ method: "DELETE", url: `/albums/${id}` }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        let cacheData;
        try {
          await queryFulfilled;
          cacheData = dispatch(
            api.util.updateQueryData("getPhotos", undefined, (draft) => {
              return draft.filter((d: IParamsType) => d.albumId !== id);
            })
          );
        } catch (error) {
          cacheData?.undo();
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useDeletePhotosWithAlbumsIdMutation,
  useDeletePhotosWithIdMutation,
  useLazyGetPhotosQuery,
  useGetPhotosQuery,
  useLazyGetPhotosByPageQuery,
} = api;
