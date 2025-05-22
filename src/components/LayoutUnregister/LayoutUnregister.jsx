import { useLocation, useNavigate } from 'react-router';
import style from './LayoutUnregister.module.scss';

function LayoutUnregister() {
  const navigate = useNavigate();
  const location = useLocation();

  const singClassFunc = (sing, def) => {
    if (sing === '/sign-up' && def === 'up') {
      return 'header_ButtonBoxItemUP';
    }
    if (sing === '/sign-in' && def === 'i') {
      return 'header_ButtonBoxItemUP';
    }
    return 'header_ButtonBoxItemDOWN';
  };
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
          className={style[singClassFunc(location.pathname, 'i')]}
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          className={style[singClassFunc(location.pathname, 'up')]}
          onClick={() => {
            navigate('/sign-up');
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LayoutUnregister;
