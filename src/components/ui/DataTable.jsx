import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { cn, formatDate, formatCurrency } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';
import Pagination from './Pagination';

const DataTable = ({ data, columns, filterableColumns, searchableColumns }) => {
  const { t } = useTranslation();
  const { currency } = useAppContext();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const itemsPerPage = 10;

  const filteredAndSortedData = useMemo(() => {
    let sortedData = [...data];

    // Filtering
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        sortedData = sortedData.filter(item => item[key] === filters[key]);
      }
    });

    // Searching
    if (searchTerm) {
      sortedData = sortedData.filter(item =>
        searchableColumns.some(column =>
          String(item[column]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortedData;
  }, [data, sortConfig, searchTerm, filters]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredAndSortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredAndSortedData]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === 'ascending') return <ChevronUp className="w-4 h-4 ms-1" />;
    return <ChevronDown className="w-4 h-4 ms-1" />;
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getFilterOptions = (key) => {
    return [...new Set(data.map(item => item[key]))];
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 border-b flex flex-wrap items-center gap-4">
          <div className="relative grow">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full ps-10 pe-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-light"
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          {filterableColumns.map(col => (
            <select 
              key={col.key}
              onChange={(e) => handleFilterChange(col.key, e.target.value)}
              className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-light py-2 px-3"
            >
              <option value="">{t('all')} {t(col.label)}</option>
              {getFilterOptions(col.key).map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => col.sortable && requestSort(col.key)}
                  >
                    <span className="flex items-center">
                      {t(col.header)} / {t(col.header, { lng: 'ar' })}
                      {col.sortable && getSortIcon(col.key)}
                    </span>
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">{t('actions')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTableData.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {col.render ? col.render(item) :
                       col.type === 'date' ? formatDate(item[col.key]) :
                       col.type === 'currency' ? formatCurrency(item[col.key], currency) :
                       item[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    {/* Action buttons go here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          className="p-4 border-t"
          currentPage={currentPage}
          totalCount={filteredAndSortedData.length}
          pageSize={itemsPerPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </CardContent>
    </Card>
  );
};

// These are placeholders, you can replace them with your Card components
const Card = ({ children, className }) => <div className={cn("bg-white rounded-xl border shadow-sm", className)}>{children}</div>;
const CardContent = ({ children, className }) => <div className={cn("p-6", className)}>{children}</div>;


export default DataTable;
