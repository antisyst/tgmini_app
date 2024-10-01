import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoot, FixedLayout, Text, TabsList, Avatar, Button } from '@telegram-apps/telegram-ui';
import './NewContractPage.scss';
import ArrowIcon from '../../assets/arrow.svg';

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'active' | 'archive' | 'all'>('active');
  const [contracts, setContracts] = useState<any[]>([]);

  const handleBack = () => {
    navigate('/documents');
  };

  const handleTabClick = (tab: 'active' | 'archive' | 'all') => {
    setSelectedTab(tab);
  };

  // Mock data for contracts (simplified)
  const demoContracts = [
    { id: '1', name: 'Contract 1', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Contract 2', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Contract 3', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Contract 4', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Contract 5', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', name: 'Contract 6', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Contract 7', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', name: 'Contract 8', avatar: 'https://i.pravatar.cc/150?img=8' },
  ];

  useEffect(() => {
    // Use the demo contract data
    setContracts(demoContracts);
  }, [selectedTab]);

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="incoming-layout">
          <div className="header">
            <Button className="back-button" onClick={handleBack}>
              <img src={ArrowIcon} alt="Back" />
            </Button>
            <Text className="header-text">Входящие</Text>
          </div>
          <div className="tabs-section">
            <TabsList className='tabs-list'>
              <TabsList.Item 
                onClick={() => handleTabClick('active')} 
                selected={selectedTab === 'active'}
                className={`tabs-item ${selectedTab === 'active' ? 'selected' : ''}`}>
                  Активные
              </TabsList.Item>
              <TabsList.Item 
                onClick={() => handleTabClick('archive')} 
                selected={selectedTab === 'archive'}
                className={`tabs-item ${selectedTab === 'archive' ? 'selected' : ''}`}>
                  Архив
              </TabsList.Item>
              <TabsList.Item 
                onClick={() => handleTabClick('all')}
                selected={selectedTab === 'all'}
                className={`tabs-item ${selectedTab === 'all' ? 'selected' : ''}`}>
                  Все
              </TabsList.Item>
            </TabsList>
          </div>
          <div className="content">
            <div className='contract-list'>
              {contracts.map(contract => (
                <div key={contract.id} className="contract-item">
                  <div className="first-side">
                    <Text Component={'span'}>{contract.name}</Text>
                  </div>
                  <div className="contract-detail">
                    <Avatar src={contract.avatar} size={28} />
                    <Text Component={'span'}>{contract.name}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FixedLayout>
    </AppRoot>
  );
};

export default NewContractPage;
