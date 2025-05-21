import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import Layout from './components/Layout/Layout';
import './main.scss';
import ArtikleList from './components/ArtikleList/ArtikleList';
import Artikle from './components/Artikle/Artikle';
import SignUp from './components/signUp/SignUp';
import SingIn from './components/SingIn/SingIn';
import Profile from './components/Profile/Profile';

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
      { path: 'sign-up', element: <SignUp /> },
      { path: 'sign-in', element: <SingIn /> },
      { path: 'profile', element: <Profile /> },
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
