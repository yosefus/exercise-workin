import { AllExercises } from '../../components';
import styles from './style.module.scss';

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.headerImg}>
        <div>
          <h1>ברוכים הבאים</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A dolore consequatur officiis est vero
            hic sapiente officia, voluptas quibusdam inventore eius deserunt laboriosam aliquam necessitatibus
            incidunt consequuntur. Quam, commodi autem.
          </p>
          <div className={styles.buttonsBox}>
            <button>
              <a href="#start"> בוא נתחיל</a>
            </button>
            <button>
              <a href="#about"> אודות</a>
            </button>
          </div>
        </div>
      </div>

      <section>
        <AllExercises />
      </section>
    </div>
  );
}

export default HomePage;
