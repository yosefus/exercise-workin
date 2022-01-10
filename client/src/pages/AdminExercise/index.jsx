import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.scss';
import req from '../../functions/apiReq';
import { useState } from 'react';
import { CostumSelect, CostumInput, CostumTextArea } from '../../components';
import { toast } from 'react-toastify';

function AdminExercise() {
  const [CurrExercise, setCurrExercise] = useState();
  const [AllLang, setAllLang] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getLang = async () => {
      const res = await req({ path: '/lang/all', method: 'get' });
      console.log(res);
      res && setAllLang(res);
    };

    getLang();

    const getExercise = async () => {
      try {
        const res = await req({ path: `/exercise/${id}`, method: 'get' });
        res && setCurrExercise(res);
      } catch (error) {
        return navigate('/');
      }
    };

    const initialNew = {
      content: { simple: '' },
      creator: '61d72ef6c5a70c65e23d3c34',
      description: '',
      difficulty: '',
      labels: [],
      img: '',
      programingLanguage: '',
      status: '',
      title: '',
      type: '',
    };

    const setNew = () => setCurrExercise(initialNew);

    id !== 'new' ? getExercise() : setNew();

    return () => setCurrExercise();
  }, [id, navigate]);

  useEffect(() => {
    console.log(CurrExercise);
  }, [CurrExercise]);

  const onChangeInput = (e) => {
    let newState = { ...CurrExercise };
    if (e.target.name !== 'content') newState[e.target.name] = e.target.value;
    if (e.target.name === 'content') newState['content']['simple'] = e.target.value;
    setCurrExercise(newState);
  };

  const onChangeLabels = (e) => {
    let newState = { ...CurrExercise };
    const stringLabels = e.target.value;
    const arrLabels = stringLabels.split(',').map((i) => i.trim().toLowerCase());
    newState.labels = arrLabels;
    setCurrExercise(newState);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (id !== 'new') {
      const res = await req({ path: `/exercise/${id}`, method: 'put', data: CurrExercise });
      if (res) {
        setCurrExercise(res);
        toast.success('עודכן בהצלחה');
        navigate(`/admin`);
      }
    } else {
      const res = await req({ path: `/exercise`, method: 'post', data: CurrExercise });
      if (res._id) {
        toast.success('נוצר בהצלחה');
      }
    }
  };

  return (
    <div className={styles.adminExercise}>
      {CurrExercise && (
        <form onSubmit={submitHandle}>
          <h1>עריכת תרגיל</h1>
          <CostumInput
            name="title"
            onChangeFn={onChangeInput}
            defaultValue={CurrExercise.title}
            label="כותרת"
            required={true}
          />

          <CostumInput
            name="description"
            onChangeFn={onChangeInput}
            defaultValue={CurrExercise.description}
            label="תיאור"
            required={true}
          />

          <CostumInput
            name="img"
            onChangeFn={onChangeInput}
            defaultValue={CurrExercise.img}
            label="קישור לתמונה"
          />

          <CostumSelect
            className={styles.select}
            onChangeFn={onChangeInput}
            optionArr={[
              { value: 'short', title: 'תרגיל קצר' },
              { value: 'rolling', title: 'תרגיל מתגלגל' },
              { value: 'tutorial', title: 'מדריך' },
            ]}
            defaultValue={CurrExercise.type}
            name="type"
            label="סוג התרגיל"
            required={true}
          />

          <CostumSelect
            className={styles.select}
            onChangeFn={onChangeInput}
            optionArr={[
              { value: 'easy', title: 'קל' },
              { value: 'medium', title: 'בינוני' },
              { value: 'hard', title: 'קשה' },
            ]}
            defaultValue={CurrExercise.difficulty}
            name="difficulty"
            label="דרגת קושי"
            required={true}
          />

          <CostumSelect
            className={styles.select}
            onChangeFn={onChangeInput}
            optionArr={[
              { value: 'draft', title: 'טיוטה' },
              { value: 'publish', title: 'פרסום' },
              { value: 'deleted', title: 'מחיקה' },
            ]}
            defaultValue={CurrExercise.status}
            name="status"
            label="סטטוס"
            required={true}
          />

          {AllLang && (
            <CostumSelect
              className={styles.select}
              onChangeFn={onChangeInput}
              optionArr={AllLang.map((l) => ({ value: l._id, title: l.langName }))}
              defaultValue={CurrExercise.programingLanguage}
              name="programingLanguage"
              label="שפת תכנות"
              required={true}
            />
          )}

          <CostumTextArea
            name="content"
            onChangeFn={onChangeInput}
            defaultValue={CurrExercise.content.simple}
            label="תוכן התרגיל"
          />

          <CostumTextArea
            name="labels"
            onChangeFn={onChangeLabels}
            defaultValue={CurrExercise.labels}
            rows={3}
            label=" תגיות (יש להפריד את התגיות בפסיק)"
          />

          <CostumTextArea
            name="solution"
            // onChangeFn={onChangeInput}
            // defaultValue={CurrExercise.content.simple}
            rows={4}
            label="פיתרון"
          />

          <button type="submit">{id === 'new' ? 'צור' : 'עדכן'}</button>
        </form>
      )}
    </div>
  );
}

export default AdminExercise;
