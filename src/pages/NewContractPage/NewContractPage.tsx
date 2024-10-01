import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoot, Button, FixedLayout, Text, Avatar, Spinner } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import BackIcon from '../../assets/arrow.svg';
import './NewContractPage.scss';

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hapticFeedback = useHapticFeedback();

  const examplePdfPath = 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf';
  const { selectedContact } = location.state || {};
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPdfPath = async () => {
      try {
        const response = await fetch(examplePdfPath, { method: 'GET' });
        if (!response.ok) {
          throw new Error('PDF not accessible');
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load PDF. Please try again.');
        setIsLoading(false);
      }
    };

    checkPdfPath();
  }, []);

  const handleSend = () => {
    hapticFeedback.impactOccurred('medium');
    setIsSending(true);

    // Simulating send contract without backend request
    setTimeout(() => {
      alert('Contract sent successfully!');
      navigate('/contract-sent', { state: { selectedContact } });
      setIsSending(false);
    }, 1000);
  };

  const handleBack = () => {
    hapticFeedback.impactOccurred('medium');
    navigate('/documents');
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="preview-contract-layout">
          <div className="header">
            <Button className="back-button" onClick={handleBack}>
              <img src={BackIcon} alt="Back" />
            </Button>
            <Text className="header-text">Новый договор</Text>
          </div>

          <div className="preview-container">
            {isLoading ? (
              <Spinner size="m" className="pdf-loading-spinner" />
            ) : error ? (
              <Text className="error-text">{error}</Text>
            ) : (
              <iframe
                src={examplePdfPath}
                width="100%"
                height="100%"
                title="Contract Preview"
                className="pdf-embed"
              />
            )}
          </div>

          <div className="recipient-container">
            <Text className="recipient-label">Получатель:</Text>
            <div className="recipient-info">
              <Avatar src={selectedContact?.avatar_url} size={48} />
              <Text className="recipient-username">{selectedContact?.telegram_id}</Text>
            </div>
          </div>
        </div>

        <FixedLayout vertical="bottom" className="bottom">
          <Button className="send-button" onClick={handleSend} disabled={isSending}>
            {isSending ? <Spinner size="m" className="spinner" /> : 'Отправить'}
          </Button>
        </FixedLayout>
      </FixedLayout>
    </AppRoot>
  );
};

export default NewContractPage;
