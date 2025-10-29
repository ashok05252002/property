import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={cn('flex list-none items-center justify-center', className)}
    >
      <li
        className={cn('mx-1', {
          'pointer-events-none text-gray-400': currentPage === 1
        })}
      >
        <button onClick={onPrevious} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5"/>
        </button>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="mx-1">&#8230;</li>;
        }

        return (
          <li
            key={index}
            className={cn('mx-1', {
              '': pageNumber === currentPage
            })}
          >
            <button onClick={() => onPageChange(pageNumber)} className={cn('flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100', { 'bg-gold text-white hover:bg-gold-dark': pageNumber === currentPage })}>
                {pageNumber}
            </button>
          </li>
        );
      })}
      <li
        className={cn('mx-1', {
          'pointer-events-none text-gray-400': currentPage === lastPage
        })}
      >
        <button onClick={onNext} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100">
            <ChevronRight className="w-5 h-5"/>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
