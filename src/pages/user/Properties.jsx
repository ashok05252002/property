import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { properties as mockProperties } from '../../data/mockData';
import PropertyCard from '../../components/properties/PropertyCard';
import Pagination from '../../components/ui/Pagination';
import FilterSidebar from '../../components/user/FilterSidebar';
import { List, LayoutGrid } from 'lucide-react';
import Button from '../../components/ui/Button';

const UserProperties = () => {
  const { t } = useTranslation();
  const [properties] = useState(mockProperties.filter(p => p.status === 'Available'));
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('newest_first');

  const itemsPerPage = viewMode === 'grid' ? 9 : 10;

  useEffect(() => {
    let sorted = [...filteredProperties];
    if (sortOption === 'price_low_to_high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_high_to_low') {
      sorted.sort((a, b) => b.price - a.price);
    } else { // newest_first (default)
      sorted.reverse();
    }
    setFilteredProperties(sorted);
    setCurrentPage(1);
  }, [sortOption]);

  const currentProperties = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredProperties.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredProperties, itemsPerPage]);

  const handleFilterChange = (filters) => {
    let result = properties;
    
    if (filters.keyword) {
      result = result.filter(p => 
        p.project.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    if (filters.type && filters.type !== 'All') {
      result = result.filter(p => p.type === filters.type);
    }
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      result = result.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    setFilteredProperties(result);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar onFilterChange={handleFilterChange} allProperties={properties} />
        </div>
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
            <h2 className="text-lg font-medium">
              {t('showing_results', { count: filteredProperties.length, total: properties.length })}
            </h2>
            <div className="flex items-center gap-4">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold py-2 px-3"
              >
                <option value="newest_first">{t('newest_first')}</option>
                <option value="price_low_to_high">{t('price_low_to_high')}</option>
                <option value="price_high_to_low">{t('price_high_to_low')}</option>
              </select>
              <div className="hidden sm:flex items-center bg-gray-200 rounded-lg p-1">
                <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}><LayoutGrid className="w-5 h-5"/></Button>
                <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}><List className="w-5 h-5"/></Button>
              </div>
            </div>
          </div>
          
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {currentProperties.map(prop => <PropertyCard key={prop.id} property={prop} viewType="user" />)}
          </div>

          <Pagination
            className="mt-12"
            currentPage={currentPage}
            totalCount={filteredProperties.length}
            pageSize={itemsPerPage}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProperties;
