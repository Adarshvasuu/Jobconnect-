import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Toast from '../common/Toast';

export const RecruiterLayout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="container animate-fade-in">
          {children}
        </div>
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default RecruiterLayout;
