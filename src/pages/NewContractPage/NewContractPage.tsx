import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoot, FixedLayout, Text, TabsList, Avatar, Button, Modal } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { ContractObject } from '@/interfaces/ContractObject';
import './NewContractPage.scss';
import ArrowIcon from '../../assets/arrow.svg';
import CloseIcon from '../../assets/arrow.svg';
import BackWardIcon from '../../assets/flip-backward.svg';

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

  const handleConfirmExecution = () => {
    // Simulate contract execution confirmation
    console.log(`Contract ${selectedContract?._id} confirmed as executed.`);
    setIsModalOpen(false);
  };

  const handleFailedExecution = () => {
    // Simulate contract execution failure
    console.log(`Contract ${selectedContract?._id} failed to execute.`);
    setIsModalOpen(false);
  };

  const handleRepeatContract = () => {
    navigate('/new-contract', { state: { prefillData: selectedContract } });
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Simulate fetching contracts for UI testing
    const mockContracts: ContractObject[] = [
      {
        _id: '123',
        agreement_date: '2023-09-15',
        initial_sender_id: 'User123',
        pdf_path: 'https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf',
        is_archived: false,
      },
      {
        _id: '124',
        agreement_date: '2023-09-20',
        initial_sender_id: 'User456',
        pdf_path: 'https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf',
        is_archived: true,
      },
    ];

    setContracts(mockContracts);
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
                <Button size="l" onClick={handleConfirmExecution} className='button-item confirm'>
                  Подтвердить исполнение
                </Button>
                <Button size="l" onClick={handleFailedExecution} className='button-item fill'>
                  Не смог исполнить
                </Button>
              </FixedLayout>
            ) : (
              <FixedLayout vertical='bottom' className='buttons'>
               <Button size="l" onClick={handleRepeatContract} className='button-item repeat'> 
                 <img src={BackWardIcon} alt="" /> Повторить договор
               </Button>
              </FixedLayout>
            )}
          </div>
        </Modal>
      )}
    </AppRoot>
  );
};

export default NewContractPage;
