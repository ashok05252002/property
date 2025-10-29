import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const FilterSidebar = ({ onFilterChange, allProperties }) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        keyword: '',
        type: 'All',
        bedrooms: 'Any',
        priceRange: [0, 1000000],
    });
    
    const maxPrice = Math.max(...allProperties.map(p => p.price), 1000000);

    useEffect(() => {
        setFilters(prev => ({ ...prev, priceRange: [0, maxPrice] }));
    }, [maxPrice]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e) => {
        setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            keyword: '',
            type: 'All',
            bedrooms: 'Any',
            priceRange: [0, maxPrice],
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const propertyTypes = ['All', ...new Set(allProperties.map(p => p.type))];
    const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-28">
            <h3 className="text-xl font-bold mb-4">{t('filter_properties')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">{t('keyword')}</label>
                    <input type="text" name="keyword" value={filters.keyword} onChange={handleInputChange} placeholder={t('project_name') + ', ' + t('location')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                    <label className="text-sm font-medium">{t('property_type')}</label>
                    <select name="type" value={filters.type} onChange={handleInputChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm">
                        {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium">{t('bedrooms')}</label>
                    <select name="bedrooms" value={filters.bedrooms} onChange={handleInputChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm">
                        {bedroomOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium">{t('price_range')}</label>
                    <input type="range" min="0" max={maxPrice} value={filters.priceRange[1]} onChange={handlePriceChange} className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold" />
                    <div className="text-xs text-gray-500 text-center mt-1">Up to {new Intl.NumberFormat().format(filters.priceRange[1])}</div>
                </div>
                <div className="flex gap-2 pt-2">
                    <Button type="submit" className="w-full">{t('search')}</Button>
                    <Button type="button" variant="outline" className="w-full" onClick={handleReset}>{t('reset_filters')}</Button>
                </div>
            </form>
        </div>
    );
};

export default FilterSidebar;
