
import React from 'react';
import '../assets/loadingscreen.css';
import { KreaterlyLogo, KreaterlyLogoAnimateDraw } from './Icons';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Please wait a second..." 
}) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
      <div className='flex justify-center'><KreaterlyLogo /></div>
        <h1 className="brand-name">Kreaterly</h1>
        <div className="loader"></div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
