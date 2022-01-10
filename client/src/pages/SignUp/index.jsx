import React, { useEffect, useState } from 'react';
// import { CostumInput } from '../../components';
import styles from './style.module.scss';

const DataLogin = [
  { type: 'email', label: 'דואר אלקטרוני', name: 'email' },
  { type: 'password', label: 'סיסמא', name: 'password' },
];

const DataSignUp = [{ type: 'text', label: 'שם', name: 'name' }, ...DataLogin];

function SignUp() {
  const [TypeForm, setTypeForm] = useState(DataLogin);
  const [FormData, setFormData] = useState();

  const onChangeFn = (e) => {
    const newState = { ...FormData };
    newState[e.target.name] = e.target.value;
    setFormData(newState);
  };

  useEffect(() => {
    let obj = {};
    TypeForm.forEach((t) => (obj[t.name] = ''));
    setFormData(obj);
  }, [TypeForm]);

  useEffect(() => {
    console.log(FormData);
  }, [FormData]);

  const ChangeLogin = () => setTypeForm(TypeForm === DataLogin ? DataSignUp : DataLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <div className={styles.signUp}>
      <form onSubmit={handleSubmit}>
        <h1>טופס {TypeForm === DataLogin ? 'התחברות' : 'הרשמה'}</h1>
        {TypeForm.map((d, i) => (
          <input key={`il${i}`} required={true} name={d.name} onChange={onChangeFn} placeholder={d.label} />
        ))}
        <div className={styles.BtnBox}>
          <button onClick={ChangeLogin}>
            {TypeForm === DataLogin ? 'פעם ראשונה פה?' : 'נרשמתי כבר! חלאס!'}
          </button>
          <button type="submit">{TypeForm === DataLogin ? 'התחברות' : 'הרשמה'}</button>
          <button type="reset">נקה</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
