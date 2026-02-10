
import React, { useMemo } from 'react';
import { User, Role, LostFoundItem, Notice, MarketItem } from '../types';
import { db, KEYS } from '../db';
import { 
  Users, 
  Search, 
  ShoppingBag, 
  Megaphone,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const lostFoundItems = db.get<LostFoundItem>(KEYS.LOST_FOUND);
  const notices = db.get<Notice>(KEYS.NOTICES);
  const marketItems = db.get<MarketItem>(KEYS.MARKET);
  const users = db.get<User>(KEYS.USERS);

  const stats = [
    { label: 'Campus Notices', value: notices.length, icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Lost & Found', value: lostFoundItems.length, icon: Search, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Market Listings', value: marketItems.length, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentNotices = useMemo(() => {
    return notices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  }, [notices]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] block mb-2">Centralized Hub</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campus Overview</h1>
        </div>
        <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-[24px] shadow-sm border border-slate-100">
          <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Health</p>
            <p className="text-sm font-bold text-slate-800">Operational & Connected</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <div className={`${stat.bg} p-4 rounded-2xl`}>
                  <Icon className={stat.color} size={28} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} className="text-slate-300" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Feed Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Important Alerts Component */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Megaphone size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Critical Announcements</h3>
              <p className="text-white/70 font-medium mb-8 max-w-md">Stay updated with real-time alerts directly from the administration and faculty boards.</p>
              <div className="space-y-4">
                {recentNotices.length > 0 ? recentNotices.map((n, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start space-x-4">
                    <div className="mt-1"><AlertCircle size={18} className="text-blue-300" /></div>
                    <div>
                      <p className="font-bold text-sm leading-snug">{n.title}</p>
                      <p className="text-xs text-white/50 mt-1">{n.category} • {new Date(n.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm font-bold text-white/40 italic">No urgent notices today.</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Tasks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="bg-orange-50 p-4 rounded-full text-orange-600 mb-4"><Search size={32} /></div>
              <h4 className="font-black text-slate-900">Found something?</h4>
              <p className="text-xs text-slate-500 mt-2 mb-6">Report found items instantly to help your campus mates.</p>
              <button className="w-full py-3 bg-slate-50 hover:bg-orange-50 text-orange-600 rounded-xl text-xs font-bold transition-colors">Start Report</button>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 mb-4"><ShoppingBag size={32} /></div>
              <h4 className="font-black text-slate-900">Selling a book?</h4>
              <p className="text-xs text-slate-500 mt-2 mb-6">List your second-hand goods and reach 3,000+ students.</p>
              <button className="w-full py-3 bg-slate-50 hover:bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold transition-colors">List Item</button>
            </div>
          </div>
        </div>

        {/* Sidebar Status Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">System Activity</h3>
            <div className="space-y-8">
              {[
                { label: 'Marketplace Volume', value: marketItems.length * 12, color: 'bg-emerald-500' },
                { label: 'Notice Engagement', value: notices.length * 45, color: 'bg-blue-500' },
                { label: 'Lost Items Resolved', value: 78, color: 'bg-orange-500' }
              ].map((act, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.label}</p>
                    <p className="text-sm font-black text-slate-800">{act.value}%</p>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${act.color} rounded-full`} style={{width: `${act.value}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center space-x-3 text-slate-800">
                <CheckCircle size={20} className="text-blue-600" />
                <p className="text-sm font-bold italic">Centralized database active.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[40px] text-white">
            <h3 className="text-xl font-bold mb-6">Your Status</h3>
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-black">{user.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user.role}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">"Designed to solve problems of manual work and poor communication."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
