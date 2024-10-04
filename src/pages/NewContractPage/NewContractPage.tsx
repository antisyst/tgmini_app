import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/logo.svg';
import { AppRoot, Button, FixedLayout } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import './NewContractPage.scss';

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const hapticFeedback = useHapticFeedback();

  const handleStart = () => {
    hapticFeedback.impactOccurred('medium');
    navigate('/registration');
  };


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
