import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Users, Handshake, CalendarClock, PlusCircle, UserPlus, FileSignature, Receipt } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import DashboardCard from '../components/ui/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { properties, leads, deals, payments } from '../data/mockData';
import { cn, formatDate, formatCurrency } from '../lib/utils';

const salesData = [
  { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 }, { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 }, { name: 'May', sales: 6000 }, { name: 'Jun', sales: 5500 },
];

const collectionsData = [
  { name: 'Jan', collections: 2400 }, { name: 'Feb', collections: 1398 }, { name: 'Mar', collections: 9800 },
  { name: 'Apr', collections: 3908 }, { name: 'May', collections: 4800 }, { name: 'Jun', collections: 3800 },
];

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const totalCollected = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
  const totalOutstanding = payments.reduce((sum, p) => sum + parseFloat(p.remaining), 0);

  const openModal = (title, data, columns) => {
    setModalContent({ title, data, columns });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const dashboardItems = [
    { title: 'total_properties', value: properties.length, icon: Building2, onClick: () => openModal(t('total_properties'), properties, ['code', 'developer', 'project', 'price', 'status']) },
    { title: 'active_leads', value: leads.filter(l => l.status !== 'Lost').length, icon: Users, onClick: () => openModal(t('active_leads'), leads, ['leadId', 'buyerName', 'contact', 'salesperson', 'status']) },
    { title: 'confirmed_deals', value: deals.filter(d => d.status === 'Confirmed').length, icon: Handshake, onClick: () => openModal(t('confirmed_deals'), deals, ['dealId', 'buyer', 'property', 'price', 'status']) },
    { title: 'upcoming_emi_payments', value: payments.filter(p => p.status === 'Pending').length, icon: CalendarClock, onClick: () => openModal(t('upcoming_emi_payments'), payments, ['paymentId', 'buyer', 'dealId', 'amount', 'date', 'status']) },
  ];
  
  const quickShortcuts = [
    { label: 'add_property', icon: PlusCircle },
    { label: 'add_lead', icon: UserPlus },
    { label: 'generate_estimation', icon: FileSignature },
    { label: 'record_payment', icon: Receipt },
  ];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardItems.map(item => (
          <DashboardCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 xl:grid-cols-3">
         <Card className="xl:col-span-2">
           <CardHeader>
             <CardTitle>{t('monthly_sales')} / <span className="font-cairo">{t('monthly_sales', {lng: 'ar'})}</span></CardTitle>
           </CardHeader>
           <CardContent>
             <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sales" stroke="#C0A062" fill="#D4B98A" />
                </AreaChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
         
         <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('quick_shortcuts')} / <span className="font-cairo">{t('quick_shortcuts', {lng: 'ar'})}</span></CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {quickShortcuts.map(shortcut => (
                        <button key={shortcut.label} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gold-light hover:text-white transition-colors">
                            <shortcut.icon className="w-8 h-8 mb-2 text-gold"/>
                            <span className="text-xs text-center font-medium">{t(shortcut.label)}</span>
                        </button>
                    ))}
                </CardContent>
            </Card>
         </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent?.title}>
        {modalContent && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {modalContent.columns.map(col => (
                    <th key={col} scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modalContent.data.slice(0, 10).map((item) => (
                  <tr key={item.id}>
                    {modalContent.columns.map(col => (
                      <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {col.toLowerCase().includes('date') ? formatDate(item[col]) : 
                         col.toLowerCase().includes('price') || col.toLowerCase().includes('amount') ? formatCurrency(item[col]) : 
                         item[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
