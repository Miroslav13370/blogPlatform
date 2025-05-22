import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import style from './ArtikleList.module.scss';
import { useGetListQuery, useGetCurrentUserQuery } from '../Api/artikleApi';
import ArtikleDraftPage from '../ArtikleDraftPage/ArtikleDraftPage';

function ArtikleList() {
  const page = localStorage.getItem('page') ? localStorage.getItem('page') : 1;
  const navigate = useNavigate();
  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetListQuery({ page }, { refetchOnMountOrArgChange: true });
  const { isError, data: currentData = [] } = useGetCurrentUserQuery();

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      {isFetching && <h2>Обновление страницы...</h2>}
      {!isFetching &&
        data?.articles?.map((elem) => {
          return (
            <ArtikleDraftPage key={elem.slug} elem={elem} refegh={refetch} isError={isError} />
          );
        })}
      <Pagination
        current={page}
        total={data.articlesCount}
        align="center"
        pageSize="5"
        onChange={(pag) => {
          localStorage.setItem('page', pag);
          refetch();
        }}
        className={style.pagination}
      />
    </>
  );
}

export default ArtikleList;
