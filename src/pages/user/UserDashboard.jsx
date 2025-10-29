import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { properties as mockProperties, payments as mockPayments } from '../../data/mockData';
import PropertyCard from '../../components/properties/PropertyCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatDate, formatCurrency } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';

const UserDashboard = () => {
  const { t } = useTranslation();
  const { currency } = useAppContext();
  const [toast, setToast] = useState({ show: false, message: '' });

  const availableProperties = mockProperties.filter(p => p.status === 'Available').slice(0, 4);
  const userPayments = mockPayments.slice(0, 5);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setToast({ show: true, message: t('lead_submitted_successfully') });
    e.target.reset();
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className="space-y-8">
      {toast.show && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}

      {/* Available Properties Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">{t('available_properties')} / {t('available_properties', {lng: 'ar'})}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableProperties.map(prop => <PropertyCard key={prop.id} property={prop} />)}
        </div>
      </section>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Inquiry Form Section */}
        <section className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('submit_an_inquiry')} / {t('submit_an_inquiry', {lng: 'ar'})}</CardTitle>
            </CardHeader>
            <CardContent>
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
                  <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">{t('remarks')}</label>
                  <textarea id="remarks" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"></textarea>
                </div>
                <Button type="submit" className="w-full">{t('submit')}</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* My Payments Section */}
        <section className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{t('my_payments')} / {t('my_payments', {lng: 'ar'})}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('deal_id')}</th>
                      <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('amount')}</th>
                      <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('payment_date')}</th>
                      <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('status')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userPayments.length > 0 ? userPayments.map(p => (
                      <tr key={p.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">{p.dealId}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">{formatCurrency(p.amount, currency)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">{formatDate(p.date)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'Paid' ? 'bg-green-100 text-green-800' : p.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="text-center py-10 text-gray-500">{t('no_payments_found')}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
