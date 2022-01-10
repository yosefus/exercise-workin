import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import req from '../../functions/apiReq';
import formatCode from '../../functions/formatCode';
import { GiWeightLiftingUp } from 'react-icons/gi';
import img from '../../media/pages/kid.png';

function Exercise() {
  const { id } = useParams();
  const [CurrExercise, setCurrExercise] = useState();
  const [showSul, setshowSul] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getExercise = async () => {
      try {
        let res = await req({ path: `/exercise/${id}`, method: 'get' });
        res && setCurrExercise(res);
      } catch (error) {
        console.log(error.message || error);
        return navigate('/');
      }
    };
    getExercise();
  }, [id, navigate]);

  useEffect(() => {
    console.log(CurrExercise);
  }, [CurrExercise]);

  return (
    <div className={styles.exercise}>
      {CurrExercise && (
        <>
          <div className={styles.exerciseBox}>
            <img src={CurrExercise.img ? CurrExercise.img : img} alt="exercise" />
            <h1>{CurrExercise.title}</h1>
            <div className={styles.difficulty}>
              <span>דרגת קושי:</span>
              <GiWeightLiftingUp className={styles.is} />
              <GiWeightLiftingUp className={CurrExercise.difficulty !== 'easy' ? styles.is : undefined} />
              <GiWeightLiftingUp className={CurrExercise.difficulty === 'hard' ? styles.is : undefined} />
            </div>
            <h2>
              <span>תיאור: </span>
              {CurrExercise.description}
            </h2>
            <h6>
              {CurrExercise.content.simple.split('.').map((a, i) => (
                <div style={{ marginBottom: '10px' }} key={i}>
                  {a}.
                </div>
              ))}
            </h6>
            <p> תגיות: {CurrExercise.labels.map((l) => `${l}, `)}</p>
            <button onClick={() => setshowSul(!showSul)}>פתרונות</button>
          </div>
          <div className={styles.sul}>
            {showSul && (
              <div className={styles.exerciseBox}>
                {CurrExercise.solution.map((s) => formatCode(s, styles.oneSul))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Exercise;
