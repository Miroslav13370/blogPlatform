import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router';
import style from './ArtikleDraftPage.module.scss';
import Vector from '../img/Vector.svg';

function ArtikleDraftPage({ elem }) {
  const location = useLocation();
  const funcLocate = (locate, slug) => {
    if (locate === '/') {
      return `articles/${slug}`;
    }
    return slug;
  };
  const tagFunction = (list) => {
    return list.map((el) => {
      return (
        <p key={el} className={style.tagElem}>
          {el}
        </p>
      );
    });
  };
  const dateRefactor = (data) => format(new Date(data), 'MMMM d, yyyy');

  return (
    <div className={style.artikleBox}>
      <div className={style.leftBlock}>
        <div className={style.titleBox}>
          <Link className={style.title} to={funcLocate(location.pathname, elem.slug)}>
            {elem.title}
          </Link>
          <img src={Vector} alt="сердечко" className={style.heart} />
          <p className={style.favoritesCount}>{elem.favoritesCount}</p>
        </div>
        <div className={style.tagBox}>{tagFunction(elem.tagList)}</div>
        <p className={style.description}>{elem.description}</p>
      </div>
      <div className={style.rigthBlock}>
        <div className={style.rigthBlockText}>
          <p className={style.username}>{elem.author.username}</p>
          <p className={style.createdAt}>{dateRefactor(elem.createdAt)}</p>
        </div>
        <img src={elem.author.image} alt="Аватарка" className={style.logo} />
      </div>
    </div>
  );
}

export default ArtikleDraftPage;

ArtikleDraftPage.propTypes = {
  elem: PropTypes.arrayOf,
};
