import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artikleApi = createApi({
  reducerPath: 'artikleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
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
    register: build.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: {
          user: userData,
        },
      }),
    }),
    login: build.mutation({
      query: (userData) => ({
        url: 'users/login',
        method: 'POST',
        body: {
          user: userData,
        },
      }),
    }),
    getCurrentUser: build.query({
      query: () => 'user',
    }),
    getProfile: build.query({
      query: (username) => `/profiles/${username}`,
    }),
    changeProfile: build.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'PUT',
        body: {
          user: userData,
        },
      }),
    }),
  }),
});

export const {
  useGetListQuery,
  useGetArticleBySlagQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useGetProfileQuery,
  useChangeProfileMutation,
} = artikleApi;
