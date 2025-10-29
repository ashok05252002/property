import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';
import AdminModeSwitcher from '../ui/AdminModeSwitcher';

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <UserNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <AdminModeSwitcher />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
