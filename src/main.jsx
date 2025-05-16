import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import Layout from './components/Layout/Layout';
import './main.scss';
import ArtikleList from './components/ArtikleList/ArtikleList';
import Artikle from './components/Artikle/Artikle';

import store from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ArtikleList />,
      },
      {
        path: 'articles',
        element: <ArtikleList />,
      },
      {
        path: 'articles/:slug',
        element: <Artikle />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
