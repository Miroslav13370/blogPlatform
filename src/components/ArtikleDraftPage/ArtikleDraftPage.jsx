import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router';
import style from './ArtikleDraftPage.module.scss';
import Vector from '../img/Vector.svg';
import like from '../img/path4.svg';
import { useAddFavoritMutation, useDeleteFavoritMutation } from '../Api/artikleApi';

function ArtikleDraftPage({ elem, refegh, isError }) {
  const location = useLocation();
  const funcLocate = (locate, slug) => {
    if (locate === '/') {
      return `articles/${slug}`;
    }
    return `/articles/${slug}`;
  };
  const [addFavorit] = useAddFavoritMutation();
  const [deleteFavorit] = useDeleteFavoritMutation();
  const tagFunction = (list) => {
    return list.map((el) => {
      return (
        <p key={Math.random()} className={style.tagElem}>
          {el}
        </p>
      );
    });
  };

  const dateRefactor = (data) => format(new Date(data), 'MMMM d, yyyy');
  const clickLikeFunc = async (e) => {
    if (e.target.checked) {
      await addFavorit(elem.slug);
      refegh();
    } else {
      await deleteFavorit(elem.slug);
      refegh();
    }
  };

  return (
    <div className={style.artikleBox}>
      <div className={style.leftBlock}>
        <div className={style.titleBox}>
          <Link className={style.title} to={funcLocate(location.pathname, elem.slug)}>
            {elem.title ? elem.title.slice(0, 50) : 'Нет заголовка'}
          </Link>
          {!isError && localStorage.getItem('token') && (
            <>
              <label>
                <img src={elem.favorited ? like : Vector} alt="сердечко" className={style.heart} />
                <input
                  type="checkbox"
                  className={style.checkLikes}
                  onChange={clickLikeFunc}
                  checked={elem.favorited}
                />
              </label>
              <p className={style.favoritesCount}>{elem.favoritesCount}</p>
            </>
          )}
        </div>
        <div className={style.tagBox}>{tagFunction(elem.tagList)}</div>
        <p className={style.description}>{`${elem.description.slice(0, 300)}`}</p>
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
  refegh: PropTypes.func,
  isError: PropTypes.bool,
};
