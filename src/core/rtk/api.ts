import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/src/core/constant/constant';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        deletePhotosWithAlbumsId: builder.mutation({
            query: (id) => ({
                method:"DELETE",
                url:`/albums/${id}`
            }),
        }),
        deletePhotosWithId: builder.mutation({
            query: (id) => ({
                method:"DELETE",
                url:`/photos/${id}`
            }),
        }),
    }),
});

export const {
    useDeletePhotosWithAlbumsIdMutation,
    useDeletePhotosWithIdMutation
} = api