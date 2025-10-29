import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { properties } from '../data/mockData';
import { formatCurrency } from '../lib/utils';
import { useAppContext } from '../contexts/AppContext';

const Estimation = () => {
  const { t } = useTranslation();
  const { currency } = useAppContext();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [vatEnabled, setVatEnabled] = useState(true);

  const handlePropertySelect = (e) => {
    const prop = properties.find(p => p.id === e.target.value);
    setSelectedProperty(prop);
  };

  const price = selectedProperty ? parseFloat(selectedProperty.price) : 0;
  const discountAmount = (price * discount) / 100;
  const priceAfterDiscount = price - discountAmount;
  const vatAmount = vatEnabled ? priceAfterDiscount * 0.05 : 0;
  const total = priceAfterDiscount + vatAmount;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('estimation')} / {t('estimation', { lng: 'ar' })}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('generate_estimation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('select_property')}</label>
                <select onChange={handlePropertySelect} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                  <option value="">{t('select_a_property')}</option>
                  {properties.map(p => <option key={p.id} value={p.id}>{p.code} - {p.project}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('discount')} (%)</label>
                <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
              </div>
              <div className="flex items-center">
                <input id="vat" type="checkbox" checked={vatEnabled} onChange={e => setVatEnabled(e.target.checked)} className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold" />
                <label htmlFor="vat" className="ms-2 block text-sm text-gray-900">{t('apply_vat')} (5%)</label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('summary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between"><span>{t('price')}:</span> <span>{formatCurrency(price, currency)}</span></div>
              <div className="flex justify-between"><span>{t('discount')}:</span> <span className="text-red-600">-{formatCurrency(discountAmount, currency)}</span></div>
              <hr/>
              <div className="flex justify-between font-semibold"><span>{t('subtotal')}:</span> <span>{formatCurrency(priceAfterDiscount, currency)}</span></div>
              <div className="flex justify-between"><span>{t('vat')} (5%):</span> <span>{formatCurrency(vatAmount, currency)}</span></div>
              <hr/>
              <div className="flex justify-between text-lg font-bold"><span>{t('total')}:</span> <span>{formatCurrency(total, currency)}</span></div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('preview_pdf')}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Estimation;
