import { useLocation, useNavigate } from 'react-router';
import classNames from 'classnames';
import style from './LayoutUnregister.module.scss';

function LayoutUnregister() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route, type) => {
    return (route === '/sign-in' && type === 'i') || (route === '/sign-up' && type === 'up');
  };

  return (
    <div className={style.header_Box}>
      <button className={style.header_BoxTitle} type="button" onClick={() => navigate('/')}>
        Realworld Blog
      </button>
      <div className={style.header_ButtonBox}>
        <button
          type="button"
          className={classNames({
            [style.header_ButtonBoxItemUP]: isActive(location.pathname, 'i'),
            [style.header_ButtonBoxItemDOWN]: !isActive(location.pathname, 'i'),
          })}
          onClick={() => navigate('/sign-in')}
        >
          Sign In
        </button>
        <button
          type="button"
          className={classNames({
            [style.header_ButtonBoxItemUP]: isActive(location.pathname, 'up'),
            [style.header_ButtonBoxItemDOWN]: !isActive(location.pathname, 'up'),
          })}
          onClick={() => navigate('/sign-up')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LayoutUnregister;
