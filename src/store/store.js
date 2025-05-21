import { configureStore } from '@reduxjs/toolkit';
import { artikleApi } from '../components/Api/artikleApi';
import user from './sliceUser';

const store = configureStore({
  reducer: {
    [artikleApi.reducerPath]: artikleApi.reducer,
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(artikleApi.middleware),
});

export default store;
