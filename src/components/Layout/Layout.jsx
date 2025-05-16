import { Outlet } from 'react-router';
import style from './Layout.module.scss';

function Layout() {
  return (
    <>
      <div className={style.header_Box}>
        <p className={style.header_BoxTitle}>Realworld Blog</p>
        <div className={style.header_ButtonBox}>
          <button type="button" className={style.header_ButtonBoxItemDOWN}>
            Sign In
          </button>
          <button type="button" className={style.header_ButtonBoxItemUP}>
            Sign Up
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Layout;
