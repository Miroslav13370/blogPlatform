import { configureStore } from '@reduxjs/toolkit';
import { artikleApi } from '../components/Api/artikleApi';

const store = configureStore({
  reducer: {
    [artikleApi.reducerPath]: artikleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(artikleApi.middleware),
});

export default store;
