import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { payments as mockPayments, deals } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { faker } from '@faker-js/faker';

const Payments = () => {
    const { t } = useTranslation();
    const [payments, setPayments] = useState(mockPayments);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleSavePayment = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const selectedDeal = deals.find(d => d.dealId === data.dealId);

        const newPayment = {
            ...data,
            id: faker.string.uuid(),
            paymentId: `PAY-${faker.number.int({ min: 1000, max: 9999 })}`,
            date: new Date(),
            status: 'Paid',
            buyer: selectedDeal.buyer,
            property: selectedDeal.property,
            remaining: 0, // Mock value
        };
        setPayments(prev => [newPayment, ...prev]);
        setToast({ show: true, message: t('payment_recorded_successfully') });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
        setModalOpen(false);
    };

    const columns = [
        { key: 'paymentId', header: 'payment_id', sortable: true },
        { key: 'buyer', header: 'buyer_name', sortable: true },
        { key: 'dealId', header: 'deal_id', sortable: true },
        { key: 'amount', header: 'amount', sortable: true, type: 'currency' },
        { key: 'date', header: 'date', sortable: true, type: 'date' },
        { key: 'mode', header: 'mode', sortable: true },
        { key: 'status', header: 'status', sortable: true },
    ];

    const filterableColumns = [
        { key: 'mode', label: 'mode' },
        { key: 'status', label: 'status' },
    ];

    const searchableColumns = ['paymentId', 'buyer', 'dealId'];

    return (
        <div>
            {toast.show && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {toast.message}
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{t('payments')} / {t('payments', { lng: 'ar' })}</h1>
                <Button onClick={() => setModalOpen(true)}>
                    <Plus className="me-2 h-4 w-4" /> {t('record_payment')}
                </Button>
            </div>
            <DataTable 
                data={payments} 
                columns={columns}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
            />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={t('record_payment')}>
                <form onSubmit={handleSavePayment}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{t('deal_id')}</label>
                            <select name="dealId" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                {deals.map(d => <option key={d.id} value={d.dealId}>{d.dealId} ({d.buyer})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('amount')}</label>
                            <input type="number" name="amount" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('mode')}</label>
                            <select name="mode" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                <option>Cash</option>
                                <option>Bank Transfer</option>
                                <option>Online</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>{t('cancel')}</Button>
                        <Button type="submit">{t('save')}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Payments;
