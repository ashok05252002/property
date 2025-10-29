import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deals as mockDeals, payments as mockPayments } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatDate, formatCurrency } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';
import Login from './Login';

const MyDeals = () => {
  const { t } = useTranslation();
  const { currency } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mocking deals for a specific user
  const userDeals = mockDeals.slice(0, 3);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('my_deals')} / {t('my_deals', {lng: 'ar'})}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {userDeals.map(deal => {
              const dealPayments = mockPayments.filter(p => p.dealId === deal.dealId);
              const totalPaid = dealPayments.reduce((acc, p) => acc + parseFloat(p.amount), 0);
              const remainingBalance = parseFloat(deal.price) - totalPaid;
              const paidPercentage = (totalPaid / parseFloat(deal.price)) * 100;

              return (
                <div key={deal.id} className="border rounded-lg p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <h3 className="font-bold text-lg">{t('deal_details')}</h3>
                      <div className="mt-4 space-y-2 text-sm">
                        <p><strong className="font-medium">{t('deal_id')}:</strong> {deal.dealId}</p>
                        <p><strong className="font-medium">{t('property')}:</strong> {deal.property}</p>
                        <p><strong className="font-medium">{t('price')}:</strong> {formatCurrency(deal.price, currency)}</p>
                        <p><strong className="font-medium">{t('status')}:</strong> <span className={`font-semibold ${deal.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{deal.status}</span></p>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="font-bold text-lg">{t('payment_schedule')}</h3>
                      <div className="mt-4">
                        <div className="mb-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>{t('total_paid')}: {formatCurrency(totalPaid, currency)}</span>
                            <span>{t('remaining_balance')}: {formatCurrency(remainingBalance, currency)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div className="bg-gold h-2.5 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
                          </div>
                        </div>
                        <div className="overflow-x-auto max-h-40">
                          <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-start font-medium text-gray-500">{t('payment_id')}</th>
                                <th className="px-4 py-2 text-start font-medium text-gray-500">{t('amount')}</th>
                                <th className="px-4 py-2 text-start font-medium text-gray-500">{t('date')}</th>
                                <th className="px-4 py-2 text-start font-medium text-gray-500">{t('status')}</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                              {dealPayments.map(p => (
                                <tr key={p.id}>
                                  <td className="px-4 py-2">{p.paymentId}</td>
                                  <td className="px-4 py-2">{formatCurrency(p.amount, currency)}</td>
                                  <td className="px-4 py-2">{formatDate(p.date)}</td>
                                  <td className="px-4 py-2"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{p.status}</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyDeals;
