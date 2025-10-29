import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Building2, Users, FileBarChart, Handshake, Banknote, BarChart3, UserCog, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'dashboard' },
  { to: '/properties', icon: Building2, label: 'properties' },
  { to: '/leads', icon: Users, label: 'leads' },
  { to: '/estimation', icon: FileBarChart, label: 'estimation' },
  { to: '/deals', icon: Handshake, label: 'deals' },
  { to: '/payments', icon: Banknote, label: 'payments' },
  { to: '/reports', icon: BarChart3, label: 'reports' },
  { to: '/users', icon: UserCog, label: 'users' },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const { isSidebarOpen, toggleSidebar, language } = useAppContext();

  return (
    <aside className={cn(
      "fixed top-0 start-0 z-40 h-screen bg-white border-e border-gray-200 transition-all duration-300",
      isSidebarOpen ? 'w-64' : 'w-20'
    )}>
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <span className={cn("font-bold text-xl text-gold", !isSidebarOpen && "hidden")}>RealtyOS</span>
         <button onClick={toggleSidebar} className="text-gray-600 hover:text-gold">
            {isSidebarOpen ? (language === 'ar' ? <ChevronsRight/> : <ChevronsLeft/>) : (language === 'ar' ? <ChevronsLeft/> : <ChevronsRight/>)}
        </button>
      </div>
      <nav className="py-4">
        <ul>
          {navItems.map(item => (
            <li key={item.label} className="px-4 py-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-lg text-gray-700 hover:bg-gold-light hover:text-white transition-colors duration-200",
                    isActive ? "bg-gold text-white" : "",
                    !isSidebarOpen && "justify-center"
                  )
                }
              >
                <item.icon className="w-6 h-6" />
                <span className={cn("ms-3", !isSidebarOpen && "hidden")}>{t(item.label)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
