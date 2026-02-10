
import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Megaphone, 
  ShoppingBag, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: Role;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, role }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: [Role.STUDENT, Role.FACULTY, Role.ADMIN] },
    { id: 'lostfound', icon: Search, label: 'Lost & Found', roles: [Role.STUDENT, Role.FACULTY, Role.ADMIN] },
    { id: 'notices', icon: Megaphone, label: 'Notice Board', roles: [Role.STUDENT, Role.FACULTY, Role.ADMIN] },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace', roles: [Role.STUDENT, Role.FACULTY, Role.ADMIN] },
    { id: 'college', icon: BookOpen, label: 'College Mgmt', roles: [Role.STUDENT, Role.FACULTY] },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback', roles: [Role.STUDENT, Role.FACULTY] },
    { id: 'admin', icon: ShieldCheck, label: 'Admin Panel', roles: [Role.ADMIN] },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
            <span className="font-black text-xl">C</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">CampVerse</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">University OS</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.filter(item => item.roles.includes(role)).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-500' 
                    : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-blue-400" />}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-500 font-medium mb-1">STORAGE</p>
          <div className="w-full bg-slate-700 h-1 rounded-full mb-2">
            <div className="bg-blue-500 h-full w-2/3 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400">Local JSON Storage Active</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
