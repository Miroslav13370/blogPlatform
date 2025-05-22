import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import style from './LayoutRegister.module.scss';
import { getUserImgFunc, getUserFunc } from '../../store/sliceUser';

function LayoutRegister() {
  const img = useSelector(getUserImgFunc);
  const userName = useSelector(getUserFunc);
  const navigate = useNavigate();

  return (
    <div className={style.header_Box}>
      <button
        className={style.header_BoxTitle}
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Realworld Blog
      </button>
      <div className={style.header_ButtonBox}>
        <button
          type="button"
          className={style.CreateArticle}
          onClick={() => {
            navigate('new-article');
          }}
        >
          <p className={style.CreateArticleText}>Create article </p>
        </button>
        <button
          type="button"
          className={style.header_ButtonBoxItemProfile}
          onClick={() => {
            navigate('/profile');
          }}
        >
          <p>{userName}</p>
          <img src={img} alt="катринка" />
        </button>
        <button
          type="button"
          className={style.header_ButtonBoxItemUP}
          onClick={() => {
            localStorage.clear();
            navigate(0);
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default LayoutRegister;
