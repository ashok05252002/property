import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';

const AdminModeSwitcher = () => {
  const { toggleRole } = useAppContext();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-5 end-5 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={toggleRole}
        className="bg-gold text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gold-dark transition-all duration-300"
        aria-label={t('admin_mode')}
      >
        <Shield className="w-7 h-7" />
      </button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 end-0 w-max bg-gray-800 text-white text-xs rounded-md px-3 py-1.5 shadow-lg"
          >
            {t('switch_to_admin_panel')} / {t('switch_to_admin_panel', {lng: 'ar'})}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminModeSwitcher;
