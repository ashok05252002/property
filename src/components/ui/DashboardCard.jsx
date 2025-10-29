import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { cn } from '../../lib/utils';

const DashboardCard = ({ title, value, icon: Icon, description, onClick }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Card onClick={onClick} className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {t(title)} / <span className="font-cairo">{t(title, { lng: 'ar' })}</span>
        </CardTitle>
        <Icon className="h-5 w-5 text-gold" />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", isArabic && 'text-right')}>{value}</div>
        {description && <p className={cn("text-xs text-muted-foreground", isArabic && 'text-right')}>{description}</p>}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
