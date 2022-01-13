import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../hooks/Store';
import styles from './style.module.scss';
import { CgLogOut } from 'react-icons/cg';

export default function Navbar() {
  const store = useContext(StoreContext);
  const [storeState, setStoreState] = store;

  const logout = () => {
    localStorage.token && localStorage.removeItem('token');
    sessionStorage.token && sessionStorage.removeItem('token');
    let tempState = { ...storeState };
    delete tempState.user;
    setStoreState(tempState);
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to={'/'}>בית </NavLink>
        </li>
        <li>{storeState?.user?.isAdmin && <NavLink to={'/admin'}>דף ניהול</NavLink>}</li>
        <li>
          {!storeState?.user ? (
            <NavLink to={'/signUp'}>התחברות</NavLink>
          ) : (
            <button className={styles.logout} onClick={logout}>
              התנתק
              <CgLogOut />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
