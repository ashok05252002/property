import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Leads from './pages/Leads';
import Estimation from './pages/Estimation';
import Deals from './pages/Deals';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Home from './pages/user/Home';
import UserProperties from './pages/user/Properties';
import PropertyDetails from './pages/user/PropertyDetails';
import Developers from './pages/user/Developers';
import Contact from './pages/user/Contact';
import MyDeals from './pages/user/MyDeals';
import { AppProvider, useAppContext } from './contexts/AppContext';

const AdminRoutes = () => (
  <AdminLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/estimation" element={<Estimation />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </AdminLayout>
);

const UserRoutes = () => (
  <UserLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<UserProperties />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/my-deals" element={<MyDeals />} />
    </Routes>
  </UserLayout>
);

const AppContent = () => {
  const { role } = useAppContext();

  return (
    <Router>
      {role === 'Admin' ? <AdminRoutes /> : <UserRoutes />}
    </Router>
  );
}

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
