import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoot, Button, FixedLayout, Text, Avatar, Spinner } from '@telegram-apps/telegram-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import './PreviewContractPage.scss';
import BackIcon from '../../assets/arrow.svg';

const PreviewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hapticFeedback = useHapticFeedback();

  const { pdfPath = 'https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf', dealId = '12345', selectedContact = { telegram_id: 'user_123', avatar_url: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' } } = location.state || {};

  useEffect(() => {
    if (!pdfPath || !dealId) {
      console.warn("Missing pdfPath or dealId. Redirecting to documents page.");
      navigate('/documents');
    }
  }, [pdfPath, dealId, navigate]);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!dealId || !selectedContact?.telegram_id) {
      console.error('Deal ID or telegram user ID is missing.');
      return;
    }

    hapticFeedback.impactOccurred('medium');
    setIsSending(true);
    try {
      // Simulate sending contract without backend request
      console.log(`Sending contract to user ${selectedContact.telegram_id} for deal ${dealId}`);
      setTimeout(() => {
        navigate('/contract-sent', { state: { selectedContact } });
      }, 1000); // Simulate a delay
    } catch (error) {
      console.error('Error sending contract:', error);
      alert('Произошла ошибка при отправке договора. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSending(false);
    }
  };

  const openFullScreen = () => {
    hapticFeedback.impactOccurred('medium');
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    hapticFeedback.impactOccurred('medium');
    setIsFullScreen(false);
  };

  const handleBack = () => {
    hapticFeedback.impactOccurred('medium');
    navigate('/documents');
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className={`preview-contract-layout ${isFullScreen ? 'modal-open' : ''}`}>
          <div className="header">
            <Button className="back-button" onClick={handleBack}>
              <img src={BackIcon} alt="Back" />
            </Button>
            <Text className="header-text">Новый договор</Text>
          </div>
          <div className="preview-container">
            <motion.div
              animate={isFullScreen ? { scale: 1.2 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              className="pdf-preview-wrapper"
            >
              <iframe
                src={pdfPath}
                title="Contract Preview"
                className="pdf-preview"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              {!isFullScreen && (
                <Button className="open-button" onClick={openFullScreen}>
                  Открыть
                </Button>
              )}
            </motion.div>
          </div>
          {isFullScreen && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="full-screen-overlay"
              >
                <iframe
                  src={pdfPath}
                  title="Contract Preview Fullscreen"
                  className="pdf-preview-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <Button className="close-button" onClick={closeFullScreen}>
                  Закрыть
                </Button>
              </motion.div>
            </AnimatePresence>
          )}
          <div className="recipient-container">
            <Text className="recipient-label">Получатель:</Text>
            <div className="recipient-info">
              <Avatar src={selectedContact?.avatar_url} size={48} />
              <Text className="recipient-username">{selectedContact?.telegram_id}</Text>
            </div>
          </div>
        </div>
        <FixedLayout vertical="bottom" className="bottom">
          <Button className="send-button" onClick={handleSend} disabled={isSending || !dealId}>
            {isSending ? <Spinner size="m" className="spinner" /> : 'Отправить'}
          </Button>
        </FixedLayout>
      </FixedLayout>
    </AppRoot>
  );
};

export default PreviewContractPage;
