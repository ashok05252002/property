import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { properties as mockProperties } from '../../data/mockData';
import { formatCurrency } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';
import { MapPin, BedDouble, Bath, Maximize, CheckCircle, Phone, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';
import InquiryModal from '../../components/user/InquiryModal';
import ImageLightbox from '../../components/user/ImageLightbox';

const amenityIcons = {
    'Swimming Pool': '🌊',
    'Gym': '🏋️',
    'Parking': '🚗',
    'Security': '🛡️',
    'Balcony': '🏞️',
    'Garden': '🌳',
};

const PropertyDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { currency } = useAppContext();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLightboxOpen, setLightboxOpen] = useState(false);
    
    const property = mockProperties.find(p => p.id === id);

    if (!property) {
        return <div className="text-center py-20">Property not found.</div>;
    }
    
    const [activeImage, setActiveImage] = useState(property.gallery[0]);

    return (
        <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    {/* Gallery */}
                    <div>
                        <div className="relative group">
                            <img src={activeImage} alt="Main property view" className="w-full h-[500px] object-cover rounded-lg shadow-lg mb-4"/>
                            <div 
                                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                onClick={() => setLightboxOpen(true)}
                            >
                                <Maximize className="w-12 h-12 text-white"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {property.gallery.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt={`Thumbnail ${index+1}`} 
                                    className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all ${activeImage === img ? 'ring-2 ring-gold ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details Tabs */}
                    <div className="mt-12 border rounded-lg bg-white shadow-sm">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">{t('property_details')}</h2>
                            <p className="text-gray-600 leading-relaxed">{property.description}</p>
                        </div>
                        <div className="p-6 border-t">
                            <h2 className="text-2xl font-bold mb-4">{t('amenities')}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.amenities.map(amenity => (
                                    <div key={amenity} className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500"/>
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="p-6 border-t">
                            <h2 className="text-2xl font-bold mb-4">{t('floor_plan')}</h2>
                            <img src={property.floorPlanUrl} alt="Floor plan" className="w-full rounded-lg border"/>
                        </div>
                        <div className="p-6 border-t">
                            <h2 className="text-2xl font-bold mb-4">{t('location')}</h2>
                            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Map Placeholder for {property.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg border">
                            <h1 className="text-3xl font-bold">{property.project}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-2"><MapPin className="w-5 h-5 text-gold"/> {property.location}</p>
                            
                            <div className="text-3xl font-bold text-gold my-6">
                                {formatCurrency(property.price, currency)}
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center border-y py-4">
                                <div>
                                    <BedDouble className="w-6 h-6 mx-auto text-gold"/>
                                    <p className="mt-1 text-sm font-semibold">{property.bedrooms} {t('bedrooms')}</p>
                                </div>
                                <div>
                                    <Bath className="w-6 h-6 mx-auto text-gold"/>
                                    <p className="mt-1 text-sm font-semibold">{property.bathrooms} {t('bathrooms')}</p>
                                </div>
                                <div>
                                    <Maximize className="w-6 h-6 mx-auto text-gold"/>
                                    <p className="mt-1 text-sm font-semibold">{property.area} m²</p>
                                </div>
                            </div>

                            <Button onClick={() => setModalOpen(true)} className="w-full mt-6" size="lg">{t('inquire_now')}</Button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg border">
                            <h3 className="text-xl font-bold mb-4">{t('agent_information')}</h3>
                            <div className="flex items-center gap-4">
                                <img src="https://i.pravatar.cc/150?u=agent1" alt="Agent" className="w-16 h-16 rounded-full"/>
                                <div>
                                    <p className="font-bold">John Doe</p>
                                    <p className="text-sm text-gray-500">RealtyOS Agent</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-gold"/> john.doe@realtyos.com</p>
                                <p className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-gold"/> +968 9876 5432</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <InquiryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} property={property} />
        <ImageLightbox isOpen={isLightboxOpen} onClose={() => setLightboxOpen(false)} images={property.gallery} />
        </>
    );
};

export default PropertyDetails;
