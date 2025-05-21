import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserQuery, useGetProfileQuery } from '../Api/artikleApi';
import { setUsername, getUserFunc, setUserImg } from '../../store/sliceUser';
import LayoutUnregister from '../LayoutUnregister/LayoutUnregister';
import LayoutRegister from '../LayoutRegister/LayoutRegister';

function Layout() {
  const { isError, data = [] } = useGetCurrentUserQuery();
  const user = useSelector(getUserFunc);
  const { data: profileData, isLoading } = useGetProfileQuery(user, { skip: !user });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isError && localStorage.getItem('token') && data?.user?.username) {
      dispatch(setUsername(data?.user?.username));
    }
  }, [isError, data, dispatch]);

  useEffect(() => {
    if (profileData) {
      dispatch(setUserImg(profileData.profile.image));
    }
  }, [isLoading, profileData, dispatch]);

  return (
    <>
      {profileData ? <LayoutRegister /> : <LayoutUnregister />}
      <Outlet />
    </>
  );
}
export default Layout;
