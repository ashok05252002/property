import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { properties as mockProperties } from '../data/mockData';
import { Plus, List, LayoutGrid, Eye, Edit, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import { Card } from '../components/ui/Card';
import PropertyCard from '../components/properties/PropertyCard';
import { formatCurrency } from '../lib/utils';
import { useAppContext } from '../contexts/AppContext';
import Modal from '../components/ui/Modal';
import { faker } from '@faker-js/faker';

const Properties = () => {
  const { t } = useTranslation();
  const { currency } = useAppContext();
  const [properties, setProperties] = useState(mockProperties);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'view'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const itemsPerPage = viewMode === 'grid' ? 8 : 10;

  const currentProperties = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return properties.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, properties, viewMode]);

  const openModal = (type, property = null) => {
    setModalType(type);
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedProperty(null);
  };
  
  const handleSaveProperty = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (modalType === 'add') {
      const newProperty = {
        ...data,
        id: faker.string.uuid(),
        code: `PROP-${faker.number.int({ min: 1000, max: 9999 })}`,
        imageUrl: `https://picsum.photos/seed/${faker.string.alphanumeric(10)}/400/300`,
        price: parseFloat(data.price),
        area: parseInt(data.area),
      };
      setProperties(prev => [newProperty, ...prev]);
      setToast({ show: true, message: t('property_added_successfully') });
    } else if (modalType === 'edit') {
      setProperties(prev => prev.map(p => p.id === data.id ? { ...p, ...data, price: parseFloat(data.price), area: parseInt(data.area) } : p));
    }
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
    closeModal();
  };

  return (
    <>
      {toast.show && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast.message}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('properties')} / {t('properties', { lng: 'ar' })}</h1>
          <p className="text-gray-500">{t('manage_your_properties')}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-200 rounded-lg p-1">
            <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}><LayoutGrid className="w-5 h-5"/></Button>
            <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}><List className="w-5 h-5"/></Button>
          </div>
          <Button onClick={() => openModal('add')}>
            <Plus className="me-2 h-4 w-4" /> {t('add_property')}
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProperties.map(prop => <PropertyCard key={prop.id} property={prop} onEdit={() => openModal('edit', prop)} onView={() => openModal('view', prop)} />)}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['property_code', 'developer', 'project_name', 'price', 'status', 'actions'].map(h => 
                    <th key={h} className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t(h)}</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProperties.map(prop => (
                  <tr key={prop.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prop.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.developer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(prop.price, currency)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${prop.status === 'Sold' ? 'bg-red-100 text-red-800' : prop.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                       <Button variant="ghost" size="sm" onClick={() => openModal('view', prop)}><Eye className="w-4 h-4"/></Button>
                       <Button variant="ghost" size="sm" onClick={() => openModal('edit', prop)}><Edit className="w-4 h-4"/></Button>
                       <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4"/></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Pagination
          className="mt-6"
          currentPage={currentPage}
          totalCount={properties.length}
          pageSize={itemsPerPage}
          onPageChange={page => setCurrentPage(page)}
        />
        
      <Modal isOpen={isModalOpen} onClose={closeModal} title={t(`${modalType}_property`)}>
          {modalType === 'view' ? (
            <div>
              <img src={selectedProperty.imageUrl} alt={selectedProperty.project} className="w-full h-48 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-bold">{selectedProperty.project}</h3>
              <p className="text-gray-600">{selectedProperty.developer}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div><span className="font-semibold">{t('price')}:</span> {formatCurrency(selectedProperty.price, currency)}</div>
                <div><span className="font-semibold">{t('status')}:</span> {selectedProperty.status}</div>
                <div><span className="font-semibold">{t('type')}:</span> {selectedProperty.type}</div>
                <div><span className="font-semibold">{t('area')}:</span> {selectedProperty.area} m²</div>
                <div><span className="font-semibold">{t('location')}:</span> {selectedProperty.location}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProperty}>
               <input type="hidden" name="id" defaultValue={selectedProperty?.id} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('project_name')}</label>
                    <input type="text" name="project" defaultValue={selectedProperty?.project} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700">{t('developer')}</label>
                    <input type="text" name="developer" defaultValue={selectedProperty?.developer} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
                    <input type="number" name="price" defaultValue={selectedProperty?.price} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('area')}</label>
                    <input type="number" name="area" defaultValue={selectedProperty?.area} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('type')}</label>
                    <select name="type" defaultValue={selectedProperty?.type} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                      <option>Villa</option>
                      <option>Apartment</option>
                      <option>Townhouse</option>
                      <option>Penthouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('status')}</label>
                    <select name="status" defaultValue={selectedProperty?.status} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm">
                      <option>Available</option>
                      <option>Booked</option>
                      <option>Sold</option>
                    </select>
                  </div>
               </div>
               <div className="mt-6 flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={closeModal}>{t('cancel')}</Button>
                  <Button type="submit">{t('save')}</Button>
               </div>
            </form>
          )}
      </Modal>
    </>
  );
};

export default Properties;
