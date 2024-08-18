import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/logo.svg';
import { AppRoot, Button, FixedLayout, Spinner } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { motion } from 'framer-motion';
import axios from 'axios';
import './StartPage.scss';

const StartPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const hapticFeedback = useHapticFeedback();

  const { initData } = retrieveLaunchParams();

  const handleStart = async () => {
    setLoading(true);
    hapticFeedback.impactOccurred('medium');

    try {
      const user = initData?.user;
      if (!user) {
        console.error('User data not found in initData');
        return;
      }

      const response = await axios.get(`/user/registered/${user.id}`);
      
      if (response.data.user_registered) {
        navigate('/documents');
      } else {
        navigate('/registration');
      }
    } catch (error) {
      console.error('Error during start process:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="logo-container"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ marginBottom: '30px' }}
        >
          <img src={MainLogo} alt="App Logo" style={{ width: '250px', height: '250px' }} />
        </motion.div>
        <FixedLayout vertical="bottom" className="button-layout">
          <Button 
            className="start-button" 
            onClick={handleStart} 
            style={{ background: '#1375FA', height: '58px', marginBottom: '30px' }}
          >
            {loading ? <Spinner size="m" className='spinner'/> : 'Начать'}
          </Button>
        </FixedLayout>
      </FixedLayout>
    </AppRoot>
  );
};

export default StartPage;