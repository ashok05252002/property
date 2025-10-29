import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { leads as mockLeads, properties } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { faker } from '@faker-js/faker';

const Leads = () => {
    const { t } = useTranslation();
    const [leads, setLeads] = useState(mockLeads);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleSaveLead = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const newLead = {
            ...data,
            id: faker.string.uuid(),
            leadId: `LEAD-${faker.number.int({ min: 1000, max: 9999 })}`,
            date: new Date(),
            status: 'New',
        };
        setLeads(prev => [newLead, ...prev]);
        setToast({ show: true, message: t('lead_added_successfully') });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
        setModalOpen(false);
    };

    const columns = [
        { key: 'leadId', header: 'lead_id', sortable: true },
        { key: 'buyerName', header: 'buyer_name', sortable: true },
        { key: 'contact', header: 'contact' },
        { key: 'email', header: 'email' },
        { key: 'salesperson', header: 'salesperson', sortable: true },
        { key: 'date', header: 'date', sortable: true, type: 'date' },
        { key: 'status', header: 'status', sortable: true },
    ];

    const filterableColumns = [
        { key: 'salesperson', label: 'salesperson' },
        { key: 'status', label: 'status' },
    ];

    const searchableColumns = ['leadId', 'buyerName', 'email', 'salesperson'];

    return (
        <div>
            {toast.show && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {toast.message}
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{t('leads')} / {t('leads', { lng: 'ar' })}</h1>
                <Button onClick={() => setModalOpen(true)}>
                    <Plus className="me-2 h-4 w-4" /> {t('add_lead')}
                </Button>
            </div>
            <DataTable 
                data={leads} 
                columns={columns}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
            />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={t('add_lead')}>
                <form onSubmit={handleSaveLead}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('buyer_name')}</label>
                            <input type="text" name="buyerName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('contact')}</label>
                            <input type="text" name="contact" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                            <input type="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('salesperson')}</label>
                            <input type="text" name="salesperson" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{t('property_preference')}</label>
                            <select name="propertyPreference" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                {properties.map(p => <option key={p.id} value={p.id}>{p.code} - {p.project}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{t('remarks')}</label>
                            <textarea name="remarks" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"></textarea>
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

export default Leads;
