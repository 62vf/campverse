
import React, { useState, useEffect } from 'react';
import { db, KEYS } from '../db';
import { LostFoundItem, User } from '../types';
import { Plus, Search, MapPin, Calendar, CheckCircle2, Package, Clock } from 'lucide-react';

interface LostFoundProps {
  user: User;
}

const LostFound: React.FC<LostFoundProps> = ({ user }) => {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Lost' | 'Found'>('All');

  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<'Lost' | 'Found'>('Lost');
  const [location, setLocation] = useState('');

  useEffect(() => {
    setItems(db.get<LostFoundItem>(KEYS.LOST_FOUND));
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: LostFoundItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description: desc,
      type,
      category: 'General',
      location,
      date: new Date().toISOString(),
      status: 'Open',
      postedBy: user.name,
      contact: user.email,
      imageUrl: `https://picsum.photos/seed/${title}/300`
    };
    db.addItem(KEYS.LOST_FOUND, newItem);
    setItems(db.get<LostFoundItem>(KEYS.LOST_FOUND));
    setShowModal(false);
    setTitle(''); setDesc(''); setLocation('');
  };

  // Fix: Explicitly provide the generic type LostFoundItem to ensure 'status' property is recognized
  const markResolved = (id: string) => {
    db.updateItem<LostFoundItem>(KEYS.LOST_FOUND, id, { status: 'Resolved' });
    setItems(db.get<LostFoundItem>(KEYS.LOST_FOUND));
  };

  const filteredItems = typeFilter === 'All' ? items : items.filter(i => i.type === typeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {['All', 'Lost', 'Found'].map(t => (
            <button 
              key={t}
              onClick={() => setTypeFilter(t as any)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
        >
          <Plus size={18} />
          <span>Report Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                  item.type === 'Lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}>
                  {item.type}
                </span>
              </div>
              {item.status === 'Resolved' && (
                <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 size={32} className="text-white mb-2" />
                    <span className="text-white font-black uppercase text-xs tracking-widest">Returned & Resolved</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-2 text-slate-400">
                  <MapPin size={16} />
                  <span className="text-xs font-bold">{item.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-xs font-bold">{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {item.postedBy.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Reported by {item.postedBy}</span>
                </div>
                {item.status === 'Open' && item.postedBy === user.name && (
                  <button 
                    onClick={() => markResolved(item.id)}
                    className="text-blue-600 font-black text-xs hover:underline"
                  >
                    Mark as Found
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <Package size={64} className="text-slate-200 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800">Clear as day!</h3>
            <p className="text-slate-400 mt-2">No lost or found items reported in this category.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-10">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Report Item</h3>
              <form onSubmit={handlePost} className="space-y-6">
                <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-2">
                  <button type="button" onClick={() => setType('Lost')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${type === 'Lost' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'text-slate-500'}`}>Lost Something</button>
                  <button type="button" onClick={() => setType('Found')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${type === 'Found' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'text-slate-500'}`}>Found Something</button>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">What did you lose/find?</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-blue-500/20" placeholder="e.g. Silver AirPods Case" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Last Seen Location</label>
                  <input required value={location} onChange={e => setLocation(e.target.value)} className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-blue-500/20" placeholder="e.g. Central Library, 3rd Floor" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Additional Details</label>
                  <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-blue-500/20 resize-none" placeholder="Color, brand, identifying marks..." />
                </div>
                <div className="flex space-x-3 pt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 font-bold bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all">Submit Report</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;
