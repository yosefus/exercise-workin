import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

export default function LayOut({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ height: '70px' }} />
      {children}
      <Footer />
    </>
  );
}
