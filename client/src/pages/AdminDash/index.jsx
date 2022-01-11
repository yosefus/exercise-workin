import React, { useEffect, useState, useContext } from 'react';
import { AllExercises, StatisticMain } from '../../components';
import styles from './style.module.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../hooks/Store';

function AdminDash() {
  const [Show, setShow] = useState('default');
  const navigate = useNavigate();

  const store = useContext(StoreContext);

  const isAdmin = store[0]?.user?.isAdmin;

  const ShowByClick = {
    default: (
      <div className={styles.welcomeCom}>
        <h1>ברוכים הבאים לדף הניהול</h1>
      </div>
    ),
    exercise: <AllExercises />,
    stat: <StatisticMain />,
  };

  useEffect(() => {
    if (!isAdmin) {
      toast.warning('אינך מאושר להיכנס לדף זה');
      navigate('/');
    }
  }, [isAdmin, navigate, store]);

  return (
    <div className={styles.adminDash}>
      <div className={styles.right}>
        <ul>
          <li onClick={() => setShow('exercise')}>כל התרגילים</li>
          <li onClick={() => setShow('stat')}>סטטיסטיקות</li>
          <li onClick={() => setShow()}>משתמשים</li>
        </ul>
      </div>
      <div className={styles.show}>{ShowByClick[Show]}</div>
    </div>
  );
}

export default AdminDash;
