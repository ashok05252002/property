import React from 'react';
import { useTranslation } from 'react-i18next';
import { developers as mockDevelopers } from '../../data/mockData';
import { Card, CardContent } from '../../components/ui/Card';
import SectionHeader from '../../components/ui/SectionHeader';

const Developers = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <SectionHeader title={t('developers')} subtitle={t('our_top_developers')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                    {mockDevelopers.map(dev => (
                        <Card key={dev.id} className="text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <CardContent className="pt-8">
                                <img src={dev.logoUrl} alt={dev.name} className="h-20 w-auto mx-auto object-contain mb-6"/>
                                <h3 className="font-bold text-xl">{dev.name}</h3>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-3">{dev.description}</p>
                                <div className="mt-4 text-gold font-semibold border-t pt-4">{dev.projectsCount} Projects</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Developers;
