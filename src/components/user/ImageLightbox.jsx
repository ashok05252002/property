import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ImageLightbox = ({ isOpen, onClose, images }) => {
  const { i18n } = useTranslation();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ direction: i18n.dir() }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl p-4"
          >
            <button
              onClick={onClose}
              className="absolute -top-2 -end-2 z-10 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={images[0]} alt="Lightbox view" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
