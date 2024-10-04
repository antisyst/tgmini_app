import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/logo.svg';
import { AppRoot, Button, FixedLayout, Spinner } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import './NewContractPage.scss';

const NewContractPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false); 
  const [hasCheckedRegistration, setHasCheckedRegistration] = useState(false);
  const navigate = useNavigate();
  const hapticFeedback = useHapticFeedback();
  const { initData } = retrieveLaunchParams();

  const handleStart = () => {
    hapticFeedback.impactOccurred('medium');
    navigate('/registration');
  };

  if (loading) {
    return (
      <AppRoot>
        <Spinner size="l" className="spinner-centered" />
      </AppRoot>
    );
  }

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="logo-container">
          <img src={MainLogo} alt="App Logo" className="app-logo" />
        </div>
        <FixedLayout vertical="bottom" className="button-layout">
          <Button 
            className="start-button" 
            onClick={handleStart} 
            style={{ background: '#1375FA', height: '58px', marginBottom: '30px' }}
          >
            Начать
          </Button>
        </FixedLayout>
      </FixedLayout>
    </AppRoot>
  );
};

export default NewContractPage;
