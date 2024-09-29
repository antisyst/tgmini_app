import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoot, FixedLayout, Text } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import './NewContractPage.scss';

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedContact } = location.state || {}; 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/preview', { state: { selectedContact } });
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, selectedContact]);

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="loader-progress-layout">
          <div className="header">
            <Text className="header-text">Новый договор</Text>
          </div>
          <div className="loading-container">
            <motion.div
              className="custom-loader"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="circle"/>
              <div className="circle"/>
              <div className="circle"/>
            </motion.div>
            <Text className="loading-text">Запрос обрабатывается...</Text>
          </div>
        </div>
      </FixedLayout>
    </AppRoot>
  );
};

export default NewContractPage;
