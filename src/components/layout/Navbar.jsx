import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Globe, User, Settings, LogOut, ChevronDown, Users } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

const currencies = ['OMR', 'AED', 'SAR', 'QAR', 'BHD', 'KWD'];

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleLanguage, isSidebarOpen, currency, setCurrency, toggleRole } = useAppContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <header className={`bg-white shadow-sm transition-all duration-300 ${isSidebarOpen ? 'lg:ms-64' : 'lg:ms-20'}`}>
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`${t('search_placeholder')} / ${t('search_placeholder', { lng: 'ar' })}`}
              className="w-full max-w-xs ps-10 pe-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-light"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <button onClick={() => setCurrencyOpen(!currencyOpen)} className="flex items-center p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <span className="font-semibold text-sm">{currency}</span>
              <ChevronDown className="w-4 h-4 ms-1" />
            </button>
            <AnimatePresence>
              {currencyOpen && (
                 <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute end-0 mt-2 w-28 bg-white rounded-lg shadow-lg border z-20"
                 >
                    <ul className="py-1">
                      {currencies.map(c => (
                        <li key={c}>
                          <button 
                            onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                            className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {c}
                          </button>
                        </li>
                      ))}
                    </ul>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <Globe className="w-6 h-6" />
          </button>
          
          <div className="relative">
            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <AnimatePresence>
              {notificationsOpen && (
                 <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute end-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20"
                 >
                    <div className="p-3 font-semibold border-b">{t('notifications')}</div>
                    <div className="p-4 text-center text-gray-500">{t('no_new_notifications')}</div>
                    <div className="p-2 text-center border-t">
                        <a href="#" className="text-sm text-gold hover:underline">{t('view_all')}</a>
                    </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
              <img
                className="h-9 w-9 rounded-full object-cover"
                src={`https://i.pravatar.cc/150?u=admin`}
                alt="User avatar"
              />
              <div className="hidden md:block text-sm text-start">
                  <p className="font-semibold">Admin User</p>
                  <p className="text-xs text-gray-500">Admin</p>
              </div>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute end-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-20"
                >
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="me-2 h-4 w-4" /> {t('profile')}
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="me-2 h-4 w-4" /> {t('settings')}
                  </a>
                   <a href="#" onClick={(e) => { e.preventDefault(); toggleRole(); setProfileOpen(false); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Users className="me-2 h-4 w-4" /> {t('user_side')}
                  </a>
                  <div className="border-t my-1"></div>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <LogOut className="me-2 h-4 w-4" /> {t('logout')}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
