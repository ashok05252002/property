import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { deals as mockDeals, leads, properties } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { faker } from '@faker-js/faker';

const Deals = () => {
    const { t } = useTranslation();
    const [deals, setDeals] = useState(mockDeals);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleSaveDeal = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const newDeal = {
            ...data,
            id: faker.string.uuid(),
            dealId: `DEAL-${faker.number.int({ min: 1000, max: 9999 })}`,
            status: 'Pending',
        };
        setDeals(prev => [newDeal, ...prev]);
        setToast({ show: true, message: t('deal_added_successfully') });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
        setModalOpen(false);
    };

    const columns = [
        { key: 'dealId', header: 'deal_id', sortable: true },
        { key: 'buyer', header: 'buyer_name', sortable: true },
        { key: 'property', header: 'property_code', sortable: true },
        { key: 'price', header: 'price', sortable: true, type: 'currency' },
        { key: 'salesperson', header: 'salesperson', sortable: true },
        { key: 'startDate', header: 'start_date', sortable: true, type: 'date' },
        { key: 'status', header: 'status', sortable: true },
    ];

    const filterableColumns = [
        { key: 'salesperson', label: 'salesperson' },
        { key: 'status', label: 'status' },
    ];

    const searchableColumns = ['dealId', 'buyer', 'property', 'salesperson'];

    return (
        <div>
            {toast.show && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {toast.message}
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{t('deals')} / {t('deals', { lng: 'ar' })}</h1>
                <Button onClick={() => setModalOpen(true)}>
                    <Plus className="me-2 h-4 w-4" /> {t('add_deal')}
                </Button>
            </div>
            <DataTable 
                data={deals} 
                columns={columns}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
            />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={t('add_deal')}>
                <form onSubmit={handleSaveDeal}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('buyer')}</label>
                            <select name="buyer" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                {leads.map(l => <option key={l.id} value={l.buyerName}>{l.buyerName}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('property')}</label>
                            <select name="property" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                {properties.map(p => <option key={p.id} value={p.code}>{p.code}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
                            <input type="number" name="price" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('initial_payment')}</label>
                            <input type="number" name="initialPayment" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('start_date')}</label>
                            <input type="date" name="startDate" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('end_date')}</label>
                            <input type="date" name="endDate" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">{t('salesperson')}</label>
                            <input type="text" name="salesperson" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
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

export default Deals;
