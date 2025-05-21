import { useNavigate } from 'react-router';
import style from './LayoutUnregister.module.scss';

function LayoutUnregister() {
  const navigate = useNavigate();
  return (
    <div className={style.header_Box}>
      <p className={style.header_BoxTitle}>Realworld Blog</p>
      <div className={style.header_ButtonBox}>
        <button
          type="button"
          className={style.header_ButtonBoxItemDOWN}
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          className={style.header_ButtonBoxItemUP}
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
