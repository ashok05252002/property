import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { users as mockUsers } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { faker } from '@faker-js/faker';

const Users = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState(mockUsers);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleSaveUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const newUser = {
            ...data,
            id: faker.string.uuid(),
        };
        setUsers(prev => [newUser, ...prev]);
        setToast({ show: true, message: t('user_added_successfully') });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
        setModalOpen(false);
    };

    const columns = [
        { key: 'id', header: 'user_id', sortable: true },
        { key: 'name', header: 'name', sortable: true },
        { key: 'email', header: 'email', sortable: true },
        { key: 'role', header: 'role', sortable: true },
        { key: 'status', header: 'status', sortable: true },
    ];

    const filterableColumns = [
        { key: 'role', label: 'role' },
        { key: 'status', label: 'status' },
    ];

    const searchableColumns = ['id', 'name', 'email'];

    return (
        <div>
            {toast.show && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {toast.message}
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{t('users')} / {t('users', { lng: 'ar' })}</h1>
                <Button onClick={() => setModalOpen(true)}>
                    <Plus className="me-2 h-4 w-4" /> {t('add_user')}
                </Button>
            </div>
            <DataTable 
                data={users} 
                columns={columns}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
            />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={t('add_user')}>
                <form onSubmit={handleSaveUser}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
                            <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                            <input type="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('role')}</label>
                            <select name="role" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                <option>Admin</option>
                                <option>Sales</option>
                                <option>Finance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('status')}</label>
                            <select name="status" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                                <option>Active</option>
                                <option>Inactive</option>
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

export default Users;
