import styles from './style.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import req from '../../functions/apiReq';
import filter from '../../functions/filter';
import { ExerciseCard, LangCard } from '..';
import FilterBox from './FilterBox';
import { StoreContext } from '../../hooks/Store';

export default function AllExercises() {
  const [AllExercises, setAllExercises] = useState([]);
  const [CurrLang, setCurrLang] = useState('');
  const [AllLang, setAllLang] = useState([]);
  const [Filter, setFilter] = useState({ search: '', difficulty: '', type: '' });

  const Store = useContext(StoreContext);
  const [StoreState] = Store;

  // const isAdmin = false;
  const isAdmin = StoreState?.user?.isAdmin || false;

  const filteredExercise = filter({ isAdmin, Filter, arr: AllExercises });

  const onChangeFilter = (e) => {
    let newFilter = { ...Filter };
    newFilter[e.target.name] = e.target.value;
    setFilter(newFilter);
  };

  const getLang = async () => {
    const res = await req({ path: '/lang/all', method: 'get' });
    res && setAllLang(res);
  };

  useEffect(() => {
    getLang();
    return () => {
      setAllLang([]);
    };
  }, []);

  useEffect(() => {
    const getExercises = async () => {
      const res = await req({ path: `/exercise/bylang/${CurrLang}`, method: 'get' });
      res && setAllExercises(res);
    };

    CurrLang && getExercises();
  }, [CurrLang]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!CurrLang && (
          <>
            <h2 className={styles.langTitle}>רשימת שפות</h2>
            <div className={styles.langCards}>
              {AllLang.length >= 1
                ? AllLang.map((lang, i) => (
                    <LangCard lang={lang} key={`l${i}`} onClickFn={() => setCurrLang(lang._id)} />
                  ))
                : ''}
            </div>
          </>
        )}

        <div className={styles.langBtns}>
          {CurrLang &&
            AllLang.map((lang, i) => (
              <button
                className={CurrLang === lang._id ? styles.selected : undefined}
                key={`l${i}`}
                onClick={() => setCurrLang(lang._id)}
              >
                {lang.langName}
              </button>
            ))}
        </div>

        {AllExercises.length >= 1 && (
          <>
            <FilterBox Filter={Filter} onChangeFilter={onChangeFilter} />
            <div className={styles.allExercises}>
              {filteredExercise.map((Ex, i) => (
                <ExerciseCard isAdmin={isAdmin} key={`e${i}`} Ex={Ex} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
