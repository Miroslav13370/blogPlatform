import { useNavigate, useParams, Outlet } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetArticleBySlagQuery,
  useGetCurrentUserQuery,
  useDeleteArticleMutation,
  useAddFavoritMutation,
  useDeleteFavoritMutation,
} from '../Api/artikleApi';
import style from './Artikle.module.scss';
import Vector from '../img/Vector.svg';
import like from '../img/path4.svg';
import { getUserFunc } from '../../store/sliceUser';
import mark from '../img/mark.svg';

function Artikle() {
  const [isClickDelete, setIsClickDelete] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const username = useSelector(getUserFunc);
  const [DeleteArticle] = useDeleteArticleMutation();
  const [addFavorit] = useAddFavoritMutation();
  const [deleteFavorit] = useDeleteFavoritMutation();

  const {
    data = [],
    isLoading,
    isError: errr,
    refetch,
  } = useGetArticleBySlagQuery({ slug }, { skip: !slug });
  const { isError } = useGetCurrentUserQuery();

  useEffect(() => {
    refetch();
    if (isError || !localStorage.getItem('token')) {
      navigate('/sign-in');
    }
  }, [isLoading, isError, navigate, refetch]);

  if (isLoading) return <h1>Загрузка...</h1>;

  const tagFunction = (list) => {
    return list.map((el) => {
      return (
        <p key={el} className={style.tagElem}>
          {el}
        </p>
      );
    });
  };
  const dateRefactor = (dataf) => format(new Date(dataf), 'MMMM d, yyyy');
  const clickLikeFunc = async (e) => {
    if (e.target.checked) {
      await addFavorit(slug);
    } else {
      await deleteFavorit(slug);
    }
    refetch();
  };

  return (
    <>
      {errr && <h1>Not Found</h1>}
      {data.article && (
        <div className={style.artikleBox}>
          <div className={style.leftBlock}>
            <div className={style.titleBox}>
              <p className={style.title}>{data.article.title}</p>
              <label className={style.corsor}>
                <img
                  src={data.article.favorited ? like : Vector}
                  alt="сердечко"
                  className={style.heart}
                />
                <input
                  type="checkbox"
                  className={style.checkLikes}
                  onChange={clickLikeFunc}
                  checked={data.article.favorited}
                />
              </label>
              <p className={style.favoritesCount}>{data.article.favoritesCount}</p>
            </div>
            <div className={style.tagBox}>{tagFunction(data.article.tagList)}</div>
            <div className={style.descriptionBox}>
              <p className={style.description}>{data.article.description}</p>
            </div>
            <div className={style.body}>
              <ReactMarkdown>{data.article.body}</ReactMarkdown>
            </div>
          </div>
          <div className={style.rigthBlock}>
            <div className={style.rigthBlockTop}>
              <div className={style.rigthBlockText}>
                <p className={style.username}>{data.article.author.username}</p>
                <p className={style.createdAt}>{dateRefactor(data.article.createdAt)}</p>
              </div>
              <img src={data.article.author.image} alt="Аватарка" className={style.logo} />
            </div>
            {username === data?.article?.author?.username && (
              <div className={style.rigthBlockBottom}>
                <button
                  type="button"
                  className={style.delete}
                  onClick={() => setIsClickDelete(true)}
                >
                  Delete
                </button>
                {isClickDelete && (
                  <div className={style.deleteAprovedBox}>
                    <div className={style.deleteAprovedTitile}>
                      <img src={mark} alt="вопросики" /> <p>Are you sure to delete this article?</p>
                    </div>
                    <div className={style.deleteAprovedButtons}>
                      <button
                        type="button"
                        className={style.deleteAprovedNo}
                        onClick={() => setIsClickDelete(false)}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={style.deleteAprovedYes}
                        onClick={async () => {
                          await DeleteArticle(slug);
                          navigate('/articles');
                        }}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className={style.add}
                  onClick={() => {
                    navigate('edit');
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Artikle;
