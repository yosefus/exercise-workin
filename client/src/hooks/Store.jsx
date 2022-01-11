import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export default function Store({ children }) {
  const StoreState = useState({ user: { name: 'yosef', isAdmin: true }, theme: 'light' });

  useEffect(() => {
    console.log(StoreState[0]);
  }, [StoreState]);

  return <StoreContext.Provider value={StoreState}>{children}</StoreContext.Provider>;
}
