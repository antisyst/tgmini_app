import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoot, FixedLayout, Text, TabsList, Avatar, Button, Modal } from '@telegram-apps/telegram-ui';
import './NewContractPage.scss';
import ArrowIcon from '../../assets/arrow.svg';
import CloseIcon from '../../assets/arrow.svg';
import BackWardIcon from '../../assets/flip-backward.svg';

// Define the ContractObject interface inside this file
export interface ContractObject {
  _id: string;
  initial_sender_id: string;
  initial_reciever_id: string;
  current_sender_id: string;
  initial_sender_duty: string;
  initial_reciever_duty: string;
  initial_sender_responsobility: string;
  initial_reciever_responsobility: string;
  agreement_date: Date;
  is_archived: boolean;
  is_sent: boolean;
  is_accepted: boolean;
  pdf_path: string;
}

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'active' | 'archive' | 'all'>('active');
  const [contracts, setContracts] = useState<ContractObject[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractObject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleBack = () => {
    navigate('/documents');
  };

  const handleTabClick = (tab: 'active' | 'archive' | 'all') => {
    setSelectedTab(tab);
  };

  const handleContractClick = (contract: ContractObject) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Mock data for contracts
  const demoContracts: ContractObject[] = [
    {
      _id: '1',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 1',
      initial_reciever_id: 'User A',
      current_sender_id: 'User 1',
      initial_sender_duty: 'Duty 1',
      initial_reciever_duty: 'Duty A',
      initial_sender_responsobility: 'Responsibility 1',
      initial_reciever_responsobility: 'Responsibility A',
      pdf_path: 'https://example.com/demo-contract-1.pdf',
      is_archived: false,
      is_sent: true,
      is_accepted: false,
    },
    {
      _id: '2',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 2',
      initial_reciever_id: 'User B',
      current_sender_id: 'User 2',
      initial_sender_duty: 'Duty 2',
      initial_reciever_duty: 'Duty B',
      initial_sender_responsobility: 'Responsibility 2',
      initial_reciever_responsobility: 'Responsibility B',
      pdf_path: 'https://example.com/demo-contract-2.pdf',
      is_archived: true,
      is_sent: true,
      is_accepted: true,
    },
    // Add six more contract items for demo purposes
    {
      _id: '3',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 3',
      initial_reciever_id: 'User C',
      current_sender_id: 'User 3',
      initial_sender_duty: 'Duty 3',
      initial_reciever_duty: 'Duty C',
      initial_sender_responsobility: 'Responsibility 3',
      initial_reciever_responsobility: 'Responsibility C',
      pdf_path: 'https://example.com/demo-contract-3.pdf',
      is_archived: false,
      is_sent: true,
      is_accepted: false,
    },
    {
      _id: '4',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 4',
      initial_reciever_id: 'User D',
      current_sender_id: 'User 4',
      initial_sender_duty: 'Duty 4',
      initial_reciever_duty: 'Duty D',
      initial_sender_responsobility: 'Responsibility 4',
      initial_reciever_responsobility: 'Responsibility D',
      pdf_path: 'https://example.com/demo-contract-4.pdf',
      is_archived: true,
      is_sent: true,
      is_accepted: true,
    },
    {
      _id: '5',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 5',
      initial_reciever_id: 'User E',
      current_sender_id: 'User 5',
      initial_sender_duty: 'Duty 5',
      initial_reciever_duty: 'Duty E',
      initial_sender_responsobility: 'Responsibility 5',
      initial_reciever_responsobility: 'Responsibility E',
      pdf_path: 'https://example.com/demo-contract-5.pdf',
      is_archived: false,
      is_sent: true,
      is_accepted: false,
    },
    {
      _id: '6',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 6',
      initial_reciever_id: 'User F',
      current_sender_id: 'User 6',
      initial_sender_duty: 'Duty 6',
      initial_reciever_duty: 'Duty F',
      initial_sender_responsobility: 'Responsibility 6',
      initial_reciever_responsobility: 'Responsibility F',
      pdf_path: 'https://example.com/demo-contract-6.pdf',
      is_archived: false,
      is_sent: true,
      is_accepted: false,
    },
    {
      _id: '7',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 7',
      initial_reciever_id: 'User G',
      current_sender_id: 'User 7',
      initial_sender_duty: 'Duty 7',
      initial_reciever_duty: 'Duty G',
      initial_sender_responsobility: 'Responsibility 7',
      initial_reciever_responsobility: 'Responsibility G',
      pdf_path: 'https://example.com/demo-contract-7.pdf',
      is_archived: false,
      is_sent: true,
      is_accepted: false,
    },
    {
      _id: '8',
      agreement_date: new Date().toISOString(),
      initial_sender_id: 'User 8',
      initial_reciever_id: 'User H',
      current_sender_id: 'User 8',
      initial_sender_duty: 'Duty 8',
      initial_reciever_duty: 'Duty H',
      initial_sender_responsobility: 'Responsibility 8',
      initial_reciever_responsobility: 'Responsibility H',
      pdf_path: 'https://example.com/demo-contract-8.pdf',
      is_archived: true,
      is_sent: true,
      is_accepted: true,
    }
  ];

  useEffect(() => {
    // Use the demo contract data instead of fetching from backend
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
                <div key={contract._id} className="contract-item" onClick={() => handleContractClick(contract)}>
                  <div className="first-side">
                    <Text Component={'span'}>Дата окончания договора</Text>
                    <Text Component={'p'}>{new Date(contract.agreement_date).toLocaleDateString()}</Text>
                  </div>
                  <div className="contract-detail">
                    <Text Component={'span'}>Кто выполняет первый:</Text>
                    <div className='breadrumbs'>
                      <div className='breadrumbs-item'>
                        <div className="user-info">
                          <Avatar src="https://i.pravatar.cc/150?img=12" size={28} />
                          <Text Component={'span'}>{contract.initial_sender_id}</Text>
                        </div>
                      </div>
                      <div className="arrow">
                        <img src={ArrowIcon} alt="" />
                      </div>
                      <div className='breadrumbs-item'>
                        <Text>Вы</Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FixedLayout>

      {selectedContract && (
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen} className="tall-modal">
          <div className="contract-modal-header">
            <Button className="close-button" onClick={closeModal}>
              <img src={CloseIcon} alt="Close" />
            </Button>
            <Text Component="h2" className='header-text'>Договор</Text>
            <div/>
          </div>
          <div className="contract-preview">
            <iframe src={selectedContract.pdf_path} width="100%" height="570px" title="PDF Preview" allowFullScreen></iframe>
            {!selectedContract.is_archived ? (
              <FixedLayout vertical='bottom' className='buttons'>
                <Button size="l" className='button-item confirm'>
                  Подтвердить исполнение
                </Button>
                <Button size="l" className='button-item fill'>
                  Не смог исполнить
                </Button>
              </FixedLayout>
            ) : (
              <FixedLayout vertical='bottom' className='buttons'>
                <Button size="l" className='button-item repeat'> <img src={BackWardIcon} alt="" /> Повторить договор</Button>
              </FixedLayout>
            )}
          </div>
        </Modal>
      )}
    </AppRoot>
  );
};

export default NewContractPage;
