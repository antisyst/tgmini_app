import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoot, Button, FixedLayout, Text, Input, Cell, Avatar, Modal, Spinner, Caption } from '@telegram-apps/telegram-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import axios from 'axios';
import './NewContractPage.scss';
import ArrowIcon from '../../assets/arrow.svg';
import SearchIcon from '../../assets/search.svg';
import CloseIcon from '../../assets/banner_close.svg';

interface Contact {
  telegram_id: string;
  avatar_url: string;
  full_name?: string;
}

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactsFromState = location.state?.contacts || [];
  const [contacts, setContacts] = useState<Contact[]>(contactsFromState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isContinuing, setIsContinuing] = useState<boolean>(false);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    setIsContinuing(true);
    setTimeout(() => {
      setIsContinuing(false);
      setIsModalOpen(false);
      navigate('/obligations', { state: { selectedContact } });
    }, 3000);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    try {
      const userId = retrieveLaunchParams()?.initData?.user?.id;
      const response = await axios.post(`http://localhost:8000/contact/find_contacts`, {
        telegramId: `@${userId}`,
        searchLine: query,
      });

      const foundContacts = response.data.data.contactList;
      setContacts(foundContacts);
    } catch (error) {
      console.error('Failed to search contacts:', error);
    }
  };

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="new-contract-layout">
          <div className="header">
            <Button onClick={() => navigate(-1)} className="back-button">
              <img src={ArrowIcon} alt="Back" />
            </Button>
            <Text Component="h1" className="header-text">Новый договор</Text>
            <div></div>
          </div>
          <AnimatePresence>
            {isBannerVisible && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.1 }}
                className="banner-layout"
              >
                <div className="banner-item">
                  <Caption className='content'>
                    Выберите контактное лицо, с которым вы хотите подписать договор
                  </Caption>
                  <button className="banner-close" onClick={handleCloseBanner}>
                    <img src={CloseIcon} alt="Close" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="contacts-section">
            <div className="search-field">
              <Input
                placeholder="Поиск контакта"
                value={searchQuery}
                onChange={(e) => handleSearch(e.currentTarget.value)}
                before={<img src={SearchIcon} alt="Search" />}
                className="search-input"
              />
            </div>

            <div className="contact-users">
              {contacts.length > 0 ? (
                contacts.map((contact: Contact) => (
                  <Cell
                    key={contact.telegram_id}
                    before={<Avatar src={contact.avatar_url} size={28} />}
                    after={<img src={ArrowIcon} className='user-arrow' />}
                    subtitle={contact.telegram_id}
                    className='cell-item'
                    onClick={() => handleSelectContact(contact)}
                  />
                ))
              ) : (
                <Text className="no-contacts-text">Нет доступных контактов</Text>
              )}
            </div>
          </div>
        </div>
      </FixedLayout>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        nested={true}
        overlayComponent={<div className="modal-overlay"></div>}
        modal={true}
        className="modal"
      >
        <div className="modal-header">
          <Button onClick={() => setIsModalOpen(false)} className="modal-close-button">
            Отмена
          </Button>
        </div>
        <div className="modal-content">
          {selectedContact && (
            <>
              <Avatar src={selectedContact.avatar_url} size={96} className="selected-user-avatar" />
              <Text className="selected-username">{selectedContact.telegram_id}</Text>
              <Button onClick={handleContinue} className="continue-button">
                {isContinuing ? <Spinner size="m" className='spinner'/> : 'Продолжить'}
              </Button>
            </>
          )}
        </div>
      </Modal>
    </AppRoot>
  );
};

export default NewContractPage;
