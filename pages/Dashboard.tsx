
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
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const lostFoundCount = db.get<LostFoundItem>(KEYS.LOST_FOUND).length;
  const notices = db.get<Notice>(KEYS.NOTICES);
  const marketCount = db.get<MarketItem>(KEYS.MARKET).length;
  const usersCount = db.get<User>(KEYS.USERS).length;

  const recentNotices = useMemo(() => {
    return notices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  }, [notices]);

  const stats = [
    { label: 'Campus Notices', value: notices.length, icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Lost & Found', value: lostFoundCount, icon: Search, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Market Listings', value: marketCount, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: usersCount, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const chartData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 19 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 22 },
    { name: 'Fri', count: 30 },
    { name: 'Sat', count: 10 },
    { name: 'Sun', count: 8 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 font-medium">Here's what's happening on campus today.</p>
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <TrendingUp size={18} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Activity</p>
            <p className="text-sm font-bold text-slate-800">+12% from yesterday</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group cursor-pointer overflow-hidden relative">
              <div className={`absolute top-0 right-0 p-3 ${stat.bg} rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all`}>
                <ArrowUpRight size={16} className={stat.color} />
              </div>
              <div className={`${stat.bg} p-3 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={stat.color} size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Campus Engagement</h3>
            <select className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#2563eb' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Notices */}
        <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl shadow-slate-900/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Latest Notices</h3>
            <Megaphone size={20} className="text-slate-500" />
          </div>
          <div className="space-y-6">
            {recentNotices.length > 0 ? (
              recentNotices.map((notice) => (
                <div key={notice.id} className="group cursor-pointer">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${notice.priority === 'High' ? 'bg-red-500' : 'bg-blue-400'}`}></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{notice.category}</span>
                  </div>
                  <h4 className="font-bold group-hover:text-blue-400 transition-colors line-clamp-1">{notice.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed opacity-70">{notice.content}</p>
                  <div className="flex items-center mt-3 text-[10px] text-slate-500">
                    <Clock size={12} className="mr-1" />
                    <span>{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No recent notices.</p>
            )}
          </div>
          <button className="w-full mt-10 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">
            View All Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
