
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
import Landing from './pages/Landing';
import Sidebar from './components/Sidebar';
import { Bell, LogOut, User as UserIcon } from 'lucide-react';

type ViewState = 'landing' | 'auth' | 'app';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<ViewState>('landing');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = db.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setView('app');
    }
    setIsLoaded(true);
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setView('app');
  };

  const handleLogout = () => {
    db.setCurrentUser(null);
    setCurrentUser(null);
    setView('landing');
  };

  if (!isLoaded) return <div className="h-screen flex items-center justify-center bg-slate-50">Loading...</div>;

  // View Controller
  if (view === 'landing') {
    return <Landing 
      onGetStarted={() => setView('auth')} 
      onLogin={() => setView('auth')} 
    />;
  }

  if (view === 'auth' && !currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    if (!currentUser) return null;
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
    <div className="flex h-screen bg-slate-50 overflow-hidden animate-in fade-in duration-700">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={currentUser!.role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200/50 px-8 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">{activeTab.replace('_', ' ')}</h2>
          <div className="flex items-center space-x-6">
            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all relative group">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none">{currentUser!.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{currentUser!.role}</p>
              </div>
              <div className="relative group cursor-pointer">
                <img 
                  src={currentUser!.avatar || `https://ui-avatars.com/api/?name=${currentUser!.name}`} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:scale-105 transition-transform"
                />
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
