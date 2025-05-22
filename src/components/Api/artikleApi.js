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
    createArticle: build.mutation({
      query: (userData) => ({
        url: 'articles',
        method: 'POST',
        body: {
          article: userData,
        },
      }),
    }),
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
    changeArticle: build.mutation({
      query: ({ userData, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: {
          article: userData,
        },
      }),
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    addFavorit: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
    }),
    deleteFavorit: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
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
  useCreateArticleMutation,
  useChangeArticleMutation,
  useDeleteArticleMutation,
  useAddFavoritMutation,
  useDeleteFavoritMutation,
} = artikleApi;
