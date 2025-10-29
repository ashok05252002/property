import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const salesBySalesperson = [
    { name: 'John', sales: 12 },
    { name: 'Jane', sales: 19 },
    { name: 'Mike', sales: 8 },
    { name: 'Sarah', sales: 15 },
];

const Reports = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{t('reports')} / {t('reports', { lng: 'ar' })}</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{t('sales_by_salesperson')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={salesBySalesperson}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#C0A062" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export default Reports;
