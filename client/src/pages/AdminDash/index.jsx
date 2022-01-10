import React, { useState } from 'react';
import { AllExercises } from '../../components';
import styles from './style.module.scss';

function AdminDash() {
  const [Show, setShow] = useState();
  return (
    <div className={styles.adminDash}>
      <div className={styles.right}>
        <ul>
          <li onClick={() => setShow('exercise')}>כל התרגילים</li>
          <li onClick={() => setShow()}>סטטיסטיקות</li>
          <li onClick={() => setShow()}>משתמשים</li>
        </ul>
      </div>
      <div className={styles.show}>{Show === 'exercise' && <AllExercises />}</div>
    </div>
  );
}

export default AdminDash;
