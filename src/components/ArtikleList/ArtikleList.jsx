import { Pagination } from 'antd';
import style from './ArtikleList.module.scss';
import { useGetListQuery, useGetCurrentUserQuery } from '../Api/artikleApi';
import ArtikleDraftPage from '../ArtikleDraftPage/ArtikleDraftPage';

function ArtikleList() {
  const page = localStorage.getItem('page') ? localStorage.getItem('page') : 1;
  const {
    data = [],
    isFetching,
    refetch,
  } = useGetListQuery({ page }, { refetchOnMountOrArgChange: true });
  const { isError } = useGetCurrentUserQuery(undefined, { skip: !localStorage.getItem('token') });

  return (
    <>
      {isFetching && <h2>Загрузка...</h2>}
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
        showSizeChanger={false}
      />
    </>
  );
}

export default ArtikleList;
