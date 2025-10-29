import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { formatCurrency } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';
import { Eye, Edit, Trash2, MapPin, BedDouble, Bath } from 'lucide-react';
import Button from '../ui/Button';

const PropertyCard = ({ property, onView, onEdit, viewType = 'admin' }) => {
  const { t } = useTranslation();
  const { currency } = useAppContext();

  const renderAdminActions = () => (
    <div className="flex w-full justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onView}><Eye className="w-4 h-4"/></Button>
        <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="w-4 h-4"/></Button>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4"/></Button>
    </div>
  );

  const renderUserActions = () => (
    <Link to={`/properties/${property.id}`} className="w-full">
        <Button className="w-full">{t('view_details')}</Button>
    </Link>
  );

  return (
    <Card className="flex flex-col group overflow-hidden">
      <div className="relative">
        <img src={property.imageUrl} alt={property.project} className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" />
        <span className={`absolute top-2 end-2 px-2 py-1 text-xs font-semibold rounded-full text-white ${property.status === 'Sold' ? 'bg-red-500' : property.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {property.status}
        </span>
      </div>
      <CardContent className="pt-4 flex-grow">
        <p className="text-sm text-gray-500">{property.developer}</p>
        <h3 className="font-bold text-lg truncate">{property.project}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 truncate"><MapPin className="w-4 h-4 text-gold"/> {property.location}</p>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-2"><BedDouble className="w-5 h-5 text-gold"/> {property.bedrooms}</span>
            <span className="flex items-center gap-2"><Bath className="w-5 h-5 text-gold"/> {property.bathrooms}</span>
            <span className="flex items-center gap-2">{property.area} m²</span>
        </div>

        <div className="mt-4 text-xl font-bold text-gold">
          {formatCurrency(property.price, currency)}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {viewType === 'admin' ? renderAdminActions() : renderUserActions()}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
