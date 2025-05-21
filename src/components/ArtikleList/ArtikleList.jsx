import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import style from './ArtikleList.module.scss';
import { useGetListQuery, useGetCurrentUserQuery } from '../Api/artikleApi';
import ArtikleDraftPage from '../ArtikleDraftPage/ArtikleDraftPage';

function ArtikleList() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data = [], isLoading, isFetching } = useGetListQuery({ page });
  const { isError, data: currentData = [] } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isError || !localStorage.getItem('token')) {
      navigate('/sign-in');
    }
  }, [isLoading, isFetching, isError, navigate, currentData]);

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      {isFetching && <h2>Обновление страницы...</h2>}
      {!isFetching &&
        data.articles.map((elem) => {
          return <ArtikleDraftPage key={elem.slug} elem={elem} />;
        })}
      <Pagination
        Current={page}
        total={data.articlesCount}
        align="center"
        pageSize="5"
        onChange={(pag) => {
          setPage(pag);
        }}
        className={style.pagination}
      />
    </>
  );
}

export default ArtikleList;
