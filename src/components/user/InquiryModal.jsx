import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const InquiryModal = ({ isOpen, onClose, property }) => {
    const { t } = useTranslation();
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        setToast({ show: true, message: t('inquiry_sent_successfully') });
        e.target.reset();
        setTimeout(() => {
            setToast({ show: false, message: '' });
            onClose();
        }, 2000);
    };

    return (
        <>
            {toast.show && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100]">
                    {toast.message}
                </div>
            )}
            <Modal isOpen={isOpen} onClose={onClose} title={`${t('inquire_now')} - ${property?.project}`}>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('full_name')}</label>
                        <input type="text" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                        <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('phone_number')}</label>
                        <input type="tel" id="phone" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('message')}</label>
                        <textarea id="message" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>{t('cancel')}</Button>
                        <Button type="submit">{t('submit')}</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default InquiryModal;
