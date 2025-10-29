import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const UserFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-2xl text-gold mb-4">RealtyOS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('we_offer_a_vast_selection_of_verified_properties')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-gold"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-gold"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-gold"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-gold"><Linkedin /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">{t('quick_links')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/properties" className="text-gray-400 hover:text-gold">{t('properties')}</Link></li>
              <li><Link to="/developers" className="text-gray-400 hover:text-gold">{t('developers')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold">{t('contact_us')}</Link></li>
              <li><Link to="/my-deals" className="text-gray-400 hover:text-gold">{t('my_deals')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">{t('contact_us')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 me-3 mt-1 text-gold" />
                <span>123 Al Khuwair St, Muscat, Oman</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 me-3 mt-1 text-gold" />
                <span>info@realtyos.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 me-3 mt-1 text-gold" />
                <span>+968 1234 5678</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">{t('newsletter')}</h4>
            <p className="text-gray-400 text-sm mb-4">{t('subscribe_to_our_newsletter')}</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder={t('enter_your_email')}
                className="w-full py-2 px-3 rounded-l-md text-gray-800 focus:outline-none"
              />
              <Button type="submit" className="rounded-l-none">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} RealtyOS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
