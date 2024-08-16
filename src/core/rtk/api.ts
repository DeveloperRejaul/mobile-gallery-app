import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/src/core/constant/constant';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => {
    return {
      getPhotosPerPage: builder.query({
        query: ({ page = 1, limit = 10 }) => ({ url: `/photos?_page=${page}&_limit=${limit}` }),
      }),
    };
  },
});

export const {useGetPhotosPerPageQuery } = api;