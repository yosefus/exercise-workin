import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import req, { getToken } from '../../functions/apiReq';
import { StoreContext } from './../../hooks/Store';

import styles from './style.module.scss';
import { toast } from 'react-toastify';

const DataLogin = [
  { type: 'email', label: 'דואר אלקטרוני', name: 'email' },
  { type: 'password', label: 'סיסמא', name: 'password' },
];
const DataSignUp = [{ type: 'text', label: 'שם', name: 'name' }, ...DataLogin];

function SignUp() {
  const [TypeForm, setTypeForm] = useState(DataLogin);
  const [FormData, setFormData] = useState();

  const [Store, setStore] = useContext(StoreContext);

  const navigate = useNavigate();

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

  // useEffect(() => {
  //   console.log(FormData);
  // }, [FormData]);

  const ChangeLogin = () => setTypeForm(TypeForm === DataLogin ? DataSignUp : DataLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FormData.password || !FormData.email) return;

    try {
      const res = await req({
        method: 'post',
        data: FormData,
        path: TypeForm === DataLogin ? '/user/login' : '/user/signup',
      });

      if (TypeForm === DataLogin) {
        const temp = { ...Store, user: res.user };
        setStore(temp);
        localStorage.token = res.token;
        getToken(res.token);
        navigate('/');
      } else {
        toast.success('נרשמת בהצלחה, אנא התחבר בבקשה');
        ChangeLogin();
      }
    } catch (error) {
      toast.error('ההתחברות נכשלה');
    }

    e.target.reset();
  };

  return (
    <div className={styles.signUp}>
      <form onSubmit={handleSubmit}>
        <h1>טופס {TypeForm === DataLogin ? 'התחברות' : 'הרשמה'}</h1>
        {FormData &&
          Object.keys(FormData).length === TypeForm.length &&
          TypeForm.map((d, i) => (
            <input
              key={`il${i}`}
              value={FormData[d.name]}
              required={true}
              name={d.name}
              type={d.type}
              onChange={onChangeFn}
              placeholder={d.label}
            />
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
