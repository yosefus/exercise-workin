import React from 'react';
import styles from './style.module.scss';
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram, AiOutlineWhatsApp } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <AiFillFacebook />
        <AiFillTwitterCircle />
        <AiFillInstagram />
        <AiOutlineWhatsApp />
      </div>
      <div className={styles.about}></div>
      <div className={styles.icon}></div>
    </footer>
  );
}
