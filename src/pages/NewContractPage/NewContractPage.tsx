import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoot, Button, FixedLayout, Text, Caption, Input, Cell, Avatar, Modal } from '@telegram-apps/telegram-ui';
import { motion, AnimatePresence } from 'framer-motion';
import './NewContractPage.scss';
import ArrowIcon from '../../assets/arrow.svg';
import SearchIcon from '../../assets/search.svg';
import CloseIcon from '../../assets/banner_close.svg';
import ContactUserProfile from '../../assets/contact_user.jpg';
import SelectedContactProfile from '../../assets/selected_contact.jpg';

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    navigate('/next-page');
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="new-contract-layout">
          <div className="header">
            <Button onClick={handleBack} className="back-button">
              <img src={ArrowIcon} alt="Back" />
            </Button>
            <Text Component="h1" className="header-text">
              Новый договор
            </Text>
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
          <div className='contacts-section'>
            <div className="search-field">
              <Input placeholder="Поиск контакта" before={<img src={SearchIcon} />} className='search-input' />
            </div>
            <div className="contact-users">
              <Cell
                before={<Avatar src={ContactUserProfile} size={28} />}
                after={<img src={ArrowIcon} className='user-arrow' />}
                subtitle='@profilename'
                className='cell-item'
                onClick={handleOpenModal}
              />
              <Cell
                before={<Avatar src={ContactUserProfile} size={28} />}
                after={<img src={ArrowIcon} className='user-arrow' />}
                subtitle='@profilename'
                className='cell-item'
                onClick={handleOpenModal}
              />
              <Cell
                before={<Avatar src={ContactUserProfile} size={28} />}
                after={<img src={ArrowIcon} className='user-arrow' />}
                subtitle='@profilename'
                className='cell-item'
                onClick={handleOpenModal}
              />
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
            <Button onClick={handleCloseModal} className="modal-close-button">
               Отмена
            </Button>
          </div>
        <div className="modal-content">
          <Avatar src={SelectedContactProfile} size={96} className="selected-user-avatar" />
          <Text className="selected-username">@profilename</Text>
          <Button onClick={handleContinue} className="continue-button">
            Продолжить
          </Button>
        </div>
      </Modal>
    </AppRoot>
  );
};

export default NewContractPage;
