
import React, { useState, useEffect } from 'react';
import { db, KEYS } from '../db';
import { User, Role } from '../types';
import { Users, Shield, Trash2, Edit3, Download, UserPlus, Search } from 'lucide-react';

interface AdminPanelProps {
  user: User;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setUsers(db.get<User>(KEYS.USERS));
  }, []);

  const deleteUser = (id: string) => {
    if (id === user.id) {
      alert("You cannot delete your own admin account!");
      return;
    }
    const updated = users.filter(u => u.id !== id);
    db.set(KEYS.USERS, updated);
    setUsers(updated);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', value: users.length, icon: Users, color: 'text-blue-500' },
          { label: 'Admins', value: users.filter(u => u.role === Role.ADMIN).length, icon: Shield, color: 'text-purple-500' },
          { label: 'Faculty', value: users.filter(u => u.role === Role.FACULTY).length, icon: Shield, color: 'text-orange-500' },
          { label: 'Students', value: users.filter(u => u.role === Role.STUDENT).length, icon: Shield, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} className={stat.color} />
              <div className="bg-slate-50 px-2 py-1 rounded text-[10px] font-black text-slate-400">SYS</div>
            </div>
            <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">User Management</h3>
            <p className="text-sm text-slate-400">Audit and manage campus accounts.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search accounts..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 ring-blue-500/10 w-64"
              />
            </div>
            <button className="bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800 transition-colors">
              <UserPlus size={18} />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center space-x-2">
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full border border-slate-200" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{u.name}</p>
                        <p className="text-[10px] text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      u.role === Role.ADMIN ? 'bg-purple-100 text-purple-600' :
                      u.role === Role.FACULTY ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="flex items-center text-[10px] font-bold text-green-500">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteUser(u.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
