import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artikleApi = createApi({
  reducerPath: 'artikleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api/' }),
  endpoints: (build) => ({
    getList: build.query({
      query: ({ page = 1 } = {}) => {
        const limit = 5;
        const offset = (page - 1) * limit;
        return `articles?limit=${limit}&offset=${offset}`;
      },
    }),
    getArticleBySlag: build.query({
      query: ({ slug } = {}) => `articles/${slug}`,
    }),
  }),
});

export const { useGetListQuery, useGetArticleBySlagQuery } = artikleApi;
