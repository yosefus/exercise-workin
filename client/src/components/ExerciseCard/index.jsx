import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { SiJavascript } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import img from '../../media/pages/kid.png';

export default function ExerciseCard({ Ex, isAdmin }) {
  const IconList = {
    js: <SiJavascript />,
    html: <AiFillHtml5 />,
  };

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
            <div
              className={styles.cardImg}
              style={{
                background: `url(${Ex.img ? Ex.img : img})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div>
              <h2>{Ex.title}</h2>
              <h4>{Ex.description}</h4>
              <p>{TypeList[Ex.type]}</p>
            </div>
          </div>
          <div className={styles.cardIcons}>
            <h2>{IconList[Ex.programingLanguage.langName]}</h2>

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
