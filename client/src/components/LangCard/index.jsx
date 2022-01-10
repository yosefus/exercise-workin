import styles from './style.module.scss';
// import { FiEdit2 } from 'react-icons/fi';
import img from '../../media/pages/kid.png';

export default function LangCard({ lang, onClickFn }) {
  return (
    <div onClick={onClickFn} className={styles.card}>
      <div
        className={styles.cardImg}
        style={{
          background: `url(${lang.icon ? lang.icon : img})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className={styles.cardText}>
        <h2>{lang.langName}</h2>
      </div>
    </div>
  );
}
