import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppRoot,
  FixedLayout,
  Input,
  Button,
  Caption,
  Headline,
  Text,
  Spinner
} from '@telegram-apps/telegram-ui';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import checkIcon from '../../assets/checked.svg';
import errorIcon from '../../assets/wrong.svg';
import './RegistrationPage.scss';
import axios from 'axios';

const validateName = (name: string) => {
  const wordCount = name.trim().split(/\s+/).length;
  return (wordCount === 2 || wordCount === 3) && /^[A-ZА-ЯЁ][a-zа-яё]+(\s[A-ZА-ЯЁ][a-zа-яё]+)+$/.test(name);
};

const validatePhoneNumber = (number: string) => /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(number);
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const hapticFeedback = useHapticFeedback();
  const containerRef = useRef<HTMLDivElement>(null);

  const { initData } = retrieveLaunchParams();

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(1);
    let formatted = '+7';

    if (digits.length > 0) {
      formatted += ' (' + digits.slice(0, 3);
    }
    if (digits.length >= 4) {
      formatted += ') ' + digits.slice(3, 6);
    }
    if (digits.length >= 7) {
      formatted += '-' + digits.slice(6, 8);
    }
    if (digits.length >= 9) {
      formatted += '-' + digits.slice(8, 10);
    }

    return formatted;
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    switch (field) {
      case 'name':
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: !validateName(value),
        }));
        break;
      case 'phone':
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          phone: !validatePhoneNumber(value),
        }));
        break;
      case 'email':
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: !validateEmail(value),
        }));
        break;
      default:
        break;
    }
  };

  const handleFocus = (field: string) => {
    if (field === 'phone' && !formData.phone.startsWith('+7')) {
      setFormData((prevData) => ({
        ...prevData,
        phone: '+7',
      }));
    }
  };

  const handleBlur = (field: string) => {
    if (field === 'phone' && formData.phone === '+7') {
      setFormData((prevData) => ({
        ...prevData,
        phone: '',
      }));
    }
  };

  const handleSubmit = async () => {
    const errors = {
      name: !validateName(formData.name),
      phone: !validatePhoneNumber(formData.phone),
      email: !validateEmail(formData.email),
    };
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      hapticFeedback.notificationOccurred('error');
    } else {
      setLoading(true);
      hapticFeedback.impactOccurred('medium');
      try {
        const userId = initData?.user?.id;
        if (!userId) {
          console.error('User ID not found in initData');
          setLoading(false);
          return;
        }

        await axios.post('/user/data', {
          personalData: formData.name,
          telegramId: userId, 
          phone: formData.phone,
          email: formData.email,
        });

        navigate('/documents');
      } catch (error) {
        console.error('Error during registration:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.blur) {
        activeElement.blur();
      }
    }
  };

  const getStatusIcon = (hasError: boolean, value: string, field: string) => {
    if (field === 'phone' && (value === '+7' || value === '')) {
      return null;
    }

    return (
      <motion.img
        src={hasError ? errorIcon : checkIcon}
        alt={hasError ? 'Error' : 'Checked'}
        className="status-icon"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    );
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen" onClick={handleContainerClick}>
        <div className='register-layout' ref={containerRef}>
          <div className='register-content'>
            <Headline weight="3" Component={'h1'}>Регистрация</Headline>
          </div>
          <div className="form-body">
            <div className="form-item">
              <Caption weight="3" Component="span" className="input-label">
                Введите вашу Ф.И.О
              </Caption>
              <div className="form-input-wrapper">
                <Input
                  placeholder="Иванов Иван Иванович"
                  className={`form-input ${formErrors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.currentTarget.value)}
                  after={formData.name && getStatusIcon(formErrors.name, formData.name, 'name')}
                />
              </div>
              {formErrors.name && (
                <Caption level="1" Component="p" style={{ color: 'red' }}>
                  Ошибка
                </Caption>
              )}
            </div>
            <div className="form-item">
              <Caption weight="3" Component="span" className="input-label">
                Введите ваш номер телефона
              </Caption>
              <div className="form-input-wrapper">
                <Input
                  placeholder="+7 (000) 000-00-00"
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.currentTarget.value)}
                  onFocus={() => handleFocus('phone')}
                  onBlur={() => handleBlur('phone')}
                  after={getStatusIcon(formErrors.phone, formData.phone, 'phone')}
                />
              </div>
              {formErrors.phone && (
                <Caption level="1" Component="p" style={{ color: 'red' }}>
                  Ошибка
                </Caption>
              )}
            </div>
            <div className="form-item">
              <Caption weight="3" Component="span" className="input-label">
                Введите ваш e-mail
              </Caption>
              <div className="form-input-wrapper">
                <Input
                  placeholder="e-mail"
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.currentTarget.value)}
                  after={formData.email && getStatusIcon(formErrors.email, formData.email, 'email')}
                />
              </div>
              {formErrors.email && (
                <Caption level="1" Component="p" style={{ color: 'red' }}>
                  Ошибка
                </Caption>
              )}
            </div>
          </div>
        </div>
        <FixedLayout vertical="bottom" className="bottom-data">
          <div className="agree-data">
            <Text Component="p" className='agree-content'>
              Нажимая на кнопку “Продолжить” я даю согласие на  <span>  обработку персональных данных </span>
            </Text>
          </div>
          <Button
            className="start-button"
            style={{ background: '#1375FA', height: '58px' }}
            onClick={handleSubmit}
          >
            {loading ? <Spinner size="m" className='spinner' /> : 'Начать'}
          </Button>
        </FixedLayout>
      </FixedLayout>
    </AppRoot>
  );
};

export default RegistrationPage;