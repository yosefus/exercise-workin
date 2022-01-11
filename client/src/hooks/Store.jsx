import React, { createContext, useEffect, useState } from 'react';
import req, { getToken } from '../functions/apiReq';

export const StoreContext = createContext();

export default function Store({ children }) {
  const StoreState = useState({ theme: 'light' });
  const [store, setStore] = StoreState;

  useEffect(() => {
    const token = localStorage.token || sessionStorage.token;

    if (token && !store?.user) {
      getToken(token);
      req({ path: '/user/token', method: 'post' }).then(({ user }) => {
        let temp = { ...store, user };
        setStore(temp);
      });
    }
  }, [store, setStore]);

  useEffect(() => {
    console.log(store[0]);
  }, [store]);

  return <StoreContext.Provider value={StoreState}>{children}</StoreContext.Provider>;
}
