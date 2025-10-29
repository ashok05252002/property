import React from 'react';
import { useTranslation } from 'react-i18next';
import { Construction } from 'lucide-react';

const ComingSoon = ({ pageName }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <Construction className="w-24 h-24 mb-4 text-gold" />
      <h1 className="text-3xl font-bold text-gray-700">{t(pageName)}</h1>
      <p className="mt-2 text-lg">This page is under construction.</p>
      <p>هذه الصفحة تحت الإنشاء.</p>
    </div>
  );
};

export default ComingSoon;
