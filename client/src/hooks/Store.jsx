import React, { createContext, useEffect, useState } from 'react';
import req, { getToken } from '../functions/apiReq';
import { toast } from 'react-toastify';
import { cleanLocalStorage } from '../functions/sign';

export const StoreContext = createContext();

export default function Store({ children }) {
  const StoreState = useState({
    theme: 'light',
    user: localStorage?.user ? JSON.parse(localStorage?.user) : undefined,
  });
  const [store, setStore] = StoreState;

  useEffect(() => {
    const token = localStorage.token || sessionStorage.token;

    if (token && !store?.user) {
      getToken(token);
      req({ path: '/user/token', method: 'post' })
        .then(({ user }) => {
          console.log('log in succses');
          // let temp = { ...store, user };
          // setStore(temp);
        })
        .catch((err) => {
          console.log(err);
          cleanLocalStorage();
          toast.info('התנתקת אנא התחבר שוב');
          let temp = { ...store };
          delete temp.user;
          setStore(temp);
        });
    }
  }, [store, setStore]);

  useEffect(() => {
    console.log('store', store[0]);
  }, [store]);

  return <StoreContext.Provider value={StoreState}>{children}</StoreContext.Provider>;
}
