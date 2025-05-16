import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { useGetArticleBySlagQuery } from '../Api/artikleApi';
import style from './Artikle.module.scss';
import Vector from '../img/Vector.svg';

function Artikle() {
  const { slug } = useParams();

  const { data = [], isLoading } = useGetArticleBySlagQuery({ slug }, { skip: !slug });

  console.log(data.article);

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

  return (
    data.article && (
      <div className={style.artikleBox}>
        <div className={style.leftBlock}>
          <div className={style.titleBox}>
            <p className={style.title}>{data.article.title}</p>
            <img src={Vector} alt="сердечко" className={style.heart} />
            <p className={style.favoritesCount}>{data.article.favoritesCount}</p>
          </div>
          <div className={style.tagBox}>{tagFunction(data.article.tagList)}</div>
          <p className={style.description}>{data.article.description}</p>
          <div className={style.body}>
            <ReactMarkdown>{data.article.body}</ReactMarkdown>
          </div>
        </div>
        <div className={style.rigthBlock}>
          <div className={style.rigthBlockText}>
            <p className={style.username}>{data.article.author.username}</p>
            <p className={style.createdAt}>{dateRefactor(data.article.createdAt)}</p>
          </div>
          <img src={data.article.author.image} alt="Аватарка" className={style.logo} />
        </div>
      </div>
    )
  );
}

export default Artikle;
