import React, { useEffect, useState, useContext } from 'react';
import { AllExercises } from '../../components';
import styles from './style.module.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../hooks/Store';

function AdminDash() {
  const [Show, setShow] = useState();
  const navigate = useNavigate();

  const store = useContext(StoreContext);

  const isAdmin = store[0]?.user?.isAdmin;

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
          <li onClick={() => setShow()}>סטטיסטיקות</li>
          <li onClick={() => setShow()}>משתמשים</li>
        </ul>
      </div>
      <div className={styles.show}>{Show === 'exercise' && <AllExercises />}</div>
    </div>
  );
}

export default AdminDash;
