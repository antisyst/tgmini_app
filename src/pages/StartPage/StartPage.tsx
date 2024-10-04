import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/logo.svg';
import { AppRoot, Button, FixedLayout, Spinner, Text, Avatar } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import './StartPage.scss';

const StartPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();
  const hapticFeedback = useHapticFeedback();
  const { initData } = retrieveLaunchParams();

  useEffect(() => {
    if (initData?.user) {
      setUserInfo(initData.user);
      setLoading(false);
    } else {
      console.error('User data not found in initData');
      setLoading(false);
    }
  }, [initData]);

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
        <div className="user-info">
          {userInfo && (
            <div className="user-details">
              {userInfo.photo_url && <Avatar src={userInfo.photo_url} size={96} className="user-avatar" />}
              <Text>User ID: {userInfo.id}</Text>
              <Text>First Name: {userInfo.first_name}</Text>
              <Text>Last Name: {userInfo.last_name}</Text>
              <Text>Username: {userInfo.username}</Text>
              <Text>Language Code: {userInfo.language_code}</Text>
              <Text>Premium User: {userInfo.is_premium ? 'Yes' : 'No'}</Text>
              <Text>Bot: {userInfo.is_bot ? 'Yes' : 'No'}</Text>
              <Text>Allows Messages: {userInfo.allows_write_to_pm ? 'Yes' : 'No'}</Text>
            </div>
          )}
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

export default StartPage;
