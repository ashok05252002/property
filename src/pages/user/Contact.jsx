import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Phone, Mail, MapPin } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SectionHeader title={t('contact_us')} subtitle={t('get_in_touch')} />
            <div className="mt-12 grid md:grid-cols-5 gap-12">
                <div className="md:col-span-3">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{t('send_message')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('full_name')}</label>
                                        <input type="text" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                                        <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('message')}</label>
                                    <textarea id="message" rows="5" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"></textarea>
                                </div>
                                <Button type="submit" className="w-full" size="lg">{t('send_message')}</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-light text-white rounded-full flex items-center justify-center">
                                <MapPin className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Muscat, Oman</h3>
                                <p className="text-gray-600">123 Al Khuwair St, Muscat</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-light text-white rounded-full flex items-center justify-center">
                                <Phone className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-gray-600">+968 1234 5678</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gold-light text-white rounded-full flex items-center justify-center">
                                <Mail className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <p className="text-gray-600">info@realtyos.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Map Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
