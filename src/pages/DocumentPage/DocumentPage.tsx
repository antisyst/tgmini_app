import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/document_logo.svg';
import { AppRoot, FixedLayout, Text, InlineButtons, Button } from '@telegram-apps/telegram-ui';
import './DocumentPage.scss';
import IconInbox from '../../assets/icon_inbox.svg';
import IconOutBox from '../../assets/icon_outbox.svg';
import AddIcon from '../../assets/plus-square.svg';

const DocumentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewContract = () => {
    navigate('/new-contract'); 
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-document-screen">
          <div className="docs-container">
              <img src={MainLogo} alt="App Logo" className="document-logo" />
              
              <div className="new-contract-area" onClick={handleNewContract}>
                <Button className='new-contract'>
                    <img src={AddIcon} alt="Add New Contract" />
                    <Text Component={'p'}>Новый договор</Text>
                </Button>
              </div>
          </div>
          
        <div className="new-contract-section">
          <InlineButtons mode="plain" className='docs-buttons'>
            <InlineButtons.Item className='docs-button'>
              <img src={IconInbox} alt="Inbox Icon" />
              <Text weight='3'>Входящие</Text>
            </InlineButtons.Item>
            <InlineButtons.Item className='docs-button'>
              <img src={IconOutBox} alt="Outbox Icon" />
              <Text weight='3'>Исходящие</Text>
            </InlineButtons.Item>
          </InlineButtons>
        </div>
      </FixedLayout>
    </AppRoot>
  );
};

export default DocumentPage;