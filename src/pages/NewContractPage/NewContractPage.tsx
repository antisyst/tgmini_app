import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoot, Button, FixedLayout, Text } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import './NewContractPage.scss';
import SentIcon from '../../assets/search.svg';

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const hapticFeedback = useHapticFeedback(); 

  const handleClose = () => {
    hapticFeedback.impactOccurred('medium');
    navigate('/documents');
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="contract-sent-layout">
           <div className="logo-container">
             <img src={SentIcon} alt="" />
             <Text className="sent-message">Документ отправлен</Text>
           </div>
        </div>
        <FixedLayout vertical='bottom' className='bottom'>
            <Button onClick={handleClose} className="close-button">
              Закрыть
            </Button>
        </FixedLayout>
      </FixedLayout>
    </AppRoot>
  );
};

export default NewContractPage;
