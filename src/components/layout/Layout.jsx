import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAppContext } from '../../contexts/AppContext';

const Layout = ({ children }) => {
  const { isSidebarOpen } = useAppContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ms-64' : 'lg:ms-20'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
