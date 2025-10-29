import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Login = ({ onLogin }) => {
    const { t } = useTranslation();

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">{t('login_to_your_account')}</CardTitle>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                            <input type="email" defaultValue="buyer@example.com" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('password')}</label>
                            <input type="password" defaultValue="password" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full">{t('login')}</Button>
                        <p className="text-xs text-gray-500 text-center">{t('dont_have_an_account')}</p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
