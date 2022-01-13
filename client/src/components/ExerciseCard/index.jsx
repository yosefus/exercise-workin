import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { FiEdit2 } from 'react-icons/fi';
import img from '../../media/pages/kid.png';

export default function ExerciseCard({ Ex, isAdmin }) {
  const TypeList = {
    short: ' תרגיל קצר',
    rolling: 'תרגיל מתגלגל',
    tutorial: 'מדריך',
  };

  return (
    <div style={{ position: 'relative' }}>
      <Link to={`/exercise/${Ex._id}`}>
        <div className={styles.card}>
          <div className={styles.cardText}>
            <div className={styles.cardImg}>
              <img src={Ex.img ? Ex.img : img} alt="exercise" />
            </div>
            <div>
              <h2>{Ex.title}</h2>
              <h4>{Ex.description}</h4>
              <p>{TypeList[Ex.type]}</p>
            </div>
          </div>
          <div className={styles.cardIcons}>
            <div className={styles.difficulty}>
              <GiWeightLiftingUp className={styles.is} />
              <GiWeightLiftingUp className={Ex.difficulty !== 'easy' ? styles.is : undefined} />
              <GiWeightLiftingUp className={Ex.difficulty === 'hard' ? styles.is : undefined} />
            </div>
          </div>
        </div>
      </Link>
      {isAdmin && (
        <Link className={styles.edit} to={`/admin/exercise/${Ex._id}`}>
          <p>{isAdmin && Ex.status}</p>
          <FiEdit2 />
        </Link>
      )}
    </div>
  );
}
