import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const UserNavbar = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'home', path: '/' },
    { label: 'properties', path: '/properties' },
    { label: 'developers', path: '/developers' },
    { label: 'contact_us', path: '/contact' },
    { label: 'my_deals', path: '/my-deals' },
  ];

  const linkClasses = ({ isActive }) =>
    cn(
      "text-gray-600 hover:text-gold transition-colors duration-300",
      isActive ? "text-gold font-semibold" : ""
    );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="font-bold text-2xl text-gold">
            RealtyOS
          </NavLink>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} className={linkClasses}>
                {t(link.label)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Globe className="w-6 h-6" />
            </button>
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-600">
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive ? "bg-gold-light text-white" : "text-gray-600 hover:bg-gray-100"
                    )
                  }
                >
                  {t(link.label)}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserNavbar;
