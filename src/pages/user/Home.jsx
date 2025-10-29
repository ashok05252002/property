import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { properties as mockProperties, developers as mockDevelopers, testimonials as mockTestimonials } from '../../data/mockData';
import PropertyCard from '../../components/properties/PropertyCard';
import TestimonialCard from '../../components/user/TestimonialCard';
import Button from '../../components/ui/Button';
import SectionHeader from '../../components/ui/SectionHeader';
import { Search, Building, Star, ShieldCheck } from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();
    const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 4);
    const topDevelopers = mockDevelopers.slice(0, 4);

    const whyChooseUsItems = [
      { icon: Building, title: 'wide_range_of_properties', description: 'we_offer_a_vast_selection_of_verified_properties' },
      { icon: Star, title: 'expert_guidance', description: 'our_experienced_agents_provide_personalized_support' },
      { icon: ShieldCheck, title: 'transparent_deals', description: 'we_ensure_a_clear_and_secure_transaction_process' },
    ];

    const sectionVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-center space-y-6 px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">{t('find_your_dream_home')}</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{t('trusted_by_thousands')}</p>
                    <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white rounded-md shadow-lg">
                            <input type="text" placeholder={t('location')} className="md:col-span-2 p-3 border-0 focus:ring-0 text-gray-700 rounded-md" />
                            <select className="p-3 border-0 focus:ring-0 text-gray-700 rounded-md">
                                <option>{t('property_type')}</option>
                                <option>Villa</option>
                                <option>Apartment</option>
                            </select>
                            <Button className="w-full h-full rounded-md" size="lg">
                                <Search className="w-6 h-6 me-2"/> {t('search')}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Why Choose Us */}
            <motion.section 
              className="container mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
                <SectionHeader title={t('why_choose_us')} subtitle={t('trusted_by_thousands')} />
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {whyChooseUsItems.map((item, index) => (
                        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="inline-block p-4 bg-gold-light rounded-full mb-4">
                                <item.icon className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t(item.title)}</h3>
                            <p className="text-gray-500">{t(item.description)}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Featured Properties */}
            <motion.section 
              className="container mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
                <SectionHeader title={t('featured_properties')} subtitle={t('find_your_dream_home')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                    {featuredProperties.map(prop => <PropertyCard key={prop.id} property={prop} viewType="user" />)}
                </div>
                <div className="text-center mt-12">
                    <Link to="/properties">
                        <Button size="lg" variant="outline">{t('view_all_properties')}</Button>
                    </Link>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section 
              className="bg-gray-50 py-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title={t('testimonials')} subtitle={t('what_our_clients_say')} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {mockTestimonials.map(testimonial => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
                    </div>
                </div>
            </motion.section>

            {/* Top Developers */}
            <motion.section 
              className="container mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
                <SectionHeader title={t('our_top_developers')} />
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {topDevelopers.map(dev => (
                        <div key={dev.id} className="flex justify-center">
                            <img src={dev.logoUrl} alt={dev.name} className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"/>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
              className="container mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-gold rounded-lg text-white p-12 text-center">
                <h2 className="text-3xl font-bold mb-2">{t('ready_to_find_your_home')}</h2>
                <p className="mb-6">{t('browse_our_properties_or_get_in_touch_with_us_today')}</p>
                <div className="flex justify-center gap-4">
                  <Link to="/properties"><Button size="lg" variant="secondary">{t('browse_properties')}</Button></Link>
                  <Link to="/contact"><Button size="lg" variant="outline">{t('contact_us')}</Button></Link>
                </div>
              </div>
            </motion.section>
        </div>
    );
};

export default Home;
