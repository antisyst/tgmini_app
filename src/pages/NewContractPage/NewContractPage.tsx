import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoot, Button, FixedLayout, Textarea, Text, Checkbox, Avatar, Input, Modal } from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ArrowIcon from '../../assets/arrow.svg';
import './NewContractPage.scss';

// Utility functions moved from utils
const getFormattedDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};

const getFormattedDateForBackend = (date: string): string => {
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}`;
};

const validateDate = (input: string): boolean => {
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!datePattern.test(input)) {
    return false;
  }
  const [day, month, year] = input.split('.').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
};

// Detect if the user is on iOS
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

const NewContractPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedContact } = location.state || {};

  const [obligation1, setObligation1] = useState('');
  const [obligation2, setObligation2] = useState('');
  const [responsibility1, setResponsibility1] = useState('');
  const [responsibility2, setResponsibility2] = useState('');
  const [selectedParty, setSelectedParty] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({
    obligation1: false,
    obligation2: false,
    responsibility1: false,
    responsibility2: false,
    date: false,
  });
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const hapticFeedback = useHapticFeedback();
  
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDate(getFormattedDate(new Date()));
  }, []);

  const handleBack = () => {
    hapticFeedback.impactOccurred('medium');
    if (currentStep === 1) {
      navigate(-1);
    } else {
      setCurrentStep(1);
    }
  };

  const handleContinue = async () => {
    hapticFeedback.impactOccurred('medium');
    let hasError = false;
    const newErrors = { obligation1: false, obligation2: false, responsibility1: false, responsibility2: false, date: false };

    if (currentStep === 1) {
      if (obligation1.trim() === '') {
        newErrors.obligation1 = true;
        hasError = true;
      }
      if (!selectedParty && obligation2.trim() === '') {
        newErrors.obligation2 = true;
        hasError = true;
      }

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      setErrors(newErrors);
      setCurrentStep(2);
    } else {
      if (responsibility1.trim() === '') {
        newErrors.responsibility1 = true;
        hasError = true;
      }
      if (!selectedParty && responsibility2.trim() === '') {
        newErrors.responsibility2 = true;
        hasError = true;
      }
      if (!validateDate(date)) {
        newErrors.date = true;
        hasError = true;
      }

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      try {
        const userId = retrieveLaunchParams()?.initData?.user?.id;
        const payload = {
          senderId: `@${userId}`,
          recieverId: selectedContact.telegram_id,
          senderDuty: obligation1,
          recieverDuty: obligation2 || 'N/A',
          senderResponsobility: responsibility1,
          recieverResponsobility: responsibility2 || 'N/A',
          agreementDate: getFormattedDateForBackend(date),
        };

        const response = await axios.post(`http://localhost:8000/contract/generate_pdf`, payload);

        const { deal_id, pdf_path } = response.data.data;

        navigate('/preview', { state: { pdfPath: pdf_path, dealId: deal_id, selectedContact } });
      } catch (error) {
        console.error('Failed to generate PDF:', error);
      }
    }
  };

  const handleFocus = (field: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleCheckboxChange = () => {
    hapticFeedback.impactOccurred('medium');
    if (!selectedParty) {
      if (currentStep === 1) {
        setObligation2('');
        setErrors((prev) => ({ ...prev, obligation2: false }));
      } else {
        setResponsibility2('');
        setErrors((prev) => ({ ...prev, responsibility2: false }));
      }
    }
    setSelectedParty(!selectedParty);
  };

  const openDateModal = () => {
    hapticFeedback.impactOccurred('medium');
    setTempDate(date);
    setIsDateModalOpen(true);

    // Auto-focus the date input to show the picker dropdown immediately
    setTimeout(() => {
      dateInputRef.current?.focus();
    }, 300); // Adding a slight delay for the modal to open properly
  };

  const closeDateModal = () => {
    hapticFeedback.impactOccurred('medium');
    setIsDateModalOpen(false);
  };

  const saveDate = () => {
    hapticFeedback.impactOccurred('medium');
    if (validateDate(tempDate)) { 
      setDate(tempDate);
      setErrors((prevErrors) => ({ ...prevErrors, date: false }));
      setIsDateModalOpen(false);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, date: true }));
    }
  };

  return (
     <AppRoot>
      <FixedLayout vertical="top" className="full-obl-screen">
        <div className="obligations-layout">
          <div className="header-container">
            <Button onClick={handleBack} className="back-button">
              <img src={ArrowIcon} alt="Back" />
            </Button>
            <Text className="header-text">
              {currentStep === 1 ? 'Обязанности сторон' : 'Ответственность сторон'}
            </Text>
          </div>
          <div className="progress-bar-container">
            <div
              style={{
                backgroundColor: currentStep >= 1 ? '#1375FA' : '#DDEAFE',
                width: '100%',
                height: '4px',
              }}
            ></div>
            <div
              style={{
                backgroundColor: currentStep >= 2 ? '#1375FA' : '#DDEAFE',
                width: '100%',
                height: '4px',
              }}
            ></div>
          </div>
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <motion.div
                key="step1"
                initial="initial"
                animate="animate"
                exit="exit"
                className="stage-form-body"
                variants={{ initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 } }}
                transition={{ duration: 0.2 }}
              >
                <div className="form-body-item first">
                  <Text className="area-label">Обязанность стороны 1 (Вы)</Text>
                  <Textarea
                    placeholder="Введите обязанность стороны 1"
                    value={obligation1}
                    onChange={(e) => setObligation1(e.currentTarget.value)}
                    onFocus={() => handleFocus('obligation1')}
                    className="textarea"
                    status={errors.obligation1 ? 'error' : 'default'}
                    inputMode="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </div>
                <div className="form-body-item second">
                  <Text className="area-label">Обязанность стороны 2</Text>
                  <Textarea
                    placeholder="Введите обязанность стороны 2"
                    value={obligation2}
                    onChange={(e) => setObligation2(e.currentTarget.value)}
                    onFocus={() => handleFocus('obligation2')}
                    className="textarea"
                    disabled={selectedParty}
                    status={errors.obligation2 ? 'error' : 'default'}
                    inputMode="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </div>
                <div className="checkbox-container">
                  <label>
                    <Checkbox checked={selectedParty} onChange={handleCheckboxChange} />
                    <Text Component={'p'}>
                      Заполнит{' '}
                      {selectedContact ? (
                        <div className='user-info'>
                          <Avatar src={selectedContact.avatar_url} size={20} />
                          <Text Component={'span'}>{selectedContact.telegram_id}</Text>
                        </div>
                      ) : (
                        '@profilename'
                      )}
                    </Text>
                  </label>
                </div>
                <FixedLayout vertical="bottom" className="bottom">
                  <Button onClick={handleContinue} className="continue-button">
                    Продолжить
                  </Button>
                </FixedLayout>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{ initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 } }}
                transition={{ duration: 0.2 }}
                className="stage-form-body"
              >
                <div className="form-body-item">
                  <Text className="area-label">Ответственность стороны 1 (Вы)</Text>
                  <Textarea
                    placeholder="Введите ответственность стороны 1"
                    value={responsibility1}
                    onChange={(e) => setResponsibility1(e.currentTarget.value)}
                    onFocus={() => handleFocus('responsibility1')}
                    className="textarea"
                    status={errors.responsibility1 ? 'error' : 'default'}
                    inputMode="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </div>
                <div className="form-body-item">
                  <Text className="area-label">Ответственность стороны 2</Text>
                  <Textarea
                    placeholder="Введите ответственность стороны 2"
                    value={responsibility2}
                    onChange={(e) => setResponsibility2(e.currentTarget.value)}
                    onFocus={() => handleFocus('responsibility2')}
                    className="textarea"
                    disabled={selectedParty}
                    status={errors.responsibility2 ? 'error' : 'default'}
                    inputMode="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </div>
                <div className="checkbox-container">
                  <label>
                    <Checkbox checked={selectedParty} onChange={handleCheckboxChange} />
                    <Text Component={'p'}>
                      Заполнит{' '}
                      {selectedContact ? (
                        <div className='user-info'>
                          <Avatar src={selectedContact.avatar_url} size={20} />
                          <Text Component={'span'}>{selectedContact.telegram_id}</Text>
                        </div>
                      ) : (
                        '@profilename'
                      )}
                    </Text>
                  </label>
                </div>
                <div className="form-body-item">
                  <Text className="area-label">Дата окончания договора</Text>
                  <div className="form-input">
                    <Input
                      type="text"
                      value={date}
                      onClick={openDateModal}
                      readOnly
                      className={`input date-input ${errors.date ? 'error' : ''}`}
                    />
                  </div>
                  {errors.date && (
                    <Text style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                      Пожалуйста, введите правильную дату в формате дд.мм.гггг.
                    </Text>
                  )}
                </div>
                <FixedLayout vertical="bottom" className="bottom">
                  <Button onClick={handleContinue} className="continue-button">
                    Завершить
                  </Button>
                </FixedLayout>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FixedLayout>

      <Modal
        open={isDateModalOpen}
        onOpenChange={setIsDateModalOpen}
        nested={true}
        overlayComponent={<div className="modal-overlay"></div>}
        modal={true}
        className="modal"
      >
        <div className="modal-header">
          <Button onClick={closeDateModal} className="modal-close-button">
            Отмена
          </Button>
        </div>
        <div className="modal-content">
          <Text className="modal-title">Выберите дату окончания</Text>

          {/* Conditionally render native iOS spinner-style date picker */}
          {isIOS() ? (
            <Input
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              ref={dateInputRef} // Attach the ref to focus it
              className="ios-date-picker"
            />
          ) : (
            <Input
              type="text"
              value={tempDate}
              onChange={handleDateChange}
              className="custom-date-picker"
              placeholder="дд.мм.гггг"
              maxLength={10}
            />
          )}

          <FixedLayout vertical='bottom' className='bottom'>
            <Button onClick={saveDate} className="save-button">
              Сохранить
            </Button>
          </FixedLayout>
        </div>
      </Modal>
    </AppRoot>
  );
};

export default NewContractPage;
