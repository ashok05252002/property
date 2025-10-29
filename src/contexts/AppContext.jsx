import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currency, setCurrency] = useState('OMR');
  const [role, setRole] = useState('Admin'); // 'Admin' or 'User'

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleRole = () => {
    setRole(prev => prev === 'Admin' ? 'User' : 'Admin');
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage, isSidebarOpen, toggleSidebar, currency, setCurrency, role, toggleRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
