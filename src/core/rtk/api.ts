import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/src/core/constant/constant';
import { addPhotos } from '@/src/features/gallery/slice/photos';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getPhotos: builder.query({
            query: ({ limit = 10, page = 1 }) => `/photos?_page=${page}&_limit=${limit}`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(addPhotos(data))
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        deletePhotosWithAlbumsId: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/albums/${id}`
            }),
        }),
        deletePhotosWithId: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/photos/${id}`
            }),
        })
    }),
});

export const {
    useDeletePhotosWithAlbumsIdMutation,
    useDeletePhotosWithIdMutation,
    useLazyGetPhotosQuery
} = api