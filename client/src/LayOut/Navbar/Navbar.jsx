import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to={'/'}>בית </NavLink>
        </li>
        <li>
          <NavLink to={'/admin'}>דף ניהול</NavLink>
        </li>
        <li>
          <NavLink to={'/signUp'}>התחברות</NavLink>
        </li>
      </ul>
    </nav>
  );
}
