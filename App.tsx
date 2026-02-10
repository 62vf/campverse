
import React, { useState, useEffect } from 'react';
import { db } from './db';
import { User, Role } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LostFound from './pages/LostFound';
import NoticeBoard from './pages/NoticeBoard';
import Marketplace from './pages/Marketplace';
import FeedbackPage from './pages/FeedbackPage';
import CollegeMgmt from './pages/CollegeMgmt';
import AdminPanel from './pages/AdminPanel';
import Sidebar from './components/Sidebar';
import { Bell, LogOut, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = db.getCurrentUser();
    if (user) setCurrentUser(user);
    setIsLoaded(true);
  }, []);

  const handleLogout = () => {
    db.setCurrentUser(null);
    setCurrentUser(null);
  };

  if (!isLoaded) return <div className="h-screen flex items-center justify-center bg-slate-50">Loading...</div>;

  if (!currentUser) {
    return <Login onLoginSuccess={setCurrentUser} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={currentUser} />;
      case 'lostfound': return <LostFound user={currentUser} />;
      case 'notices': return <NoticeBoard user={currentUser} />;
      case 'marketplace': return <Marketplace user={currentUser} />;
      case 'college': return <CollegeMgmt user={currentUser} />;
      case 'feedback': return <FeedbackPage user={currentUser} />;
      case 'admin': return <AdminPanel user={currentUser} />;
      default: return <Dashboard user={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={currentUser.role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace('_', ' ')}</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700 leading-tight">{currentUser.name}</p>
                <p className="text-xs text-slate-400">{currentUser.role}</p>
              </div>
              <img 
                src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}`} 
                alt="Profile" 
                className="h-9 w-9 rounded-full border border-slate-200 shadow-sm"
              />
              <button 
                onClick={handleLogout}
                className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
