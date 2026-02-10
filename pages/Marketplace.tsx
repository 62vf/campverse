
import React, { useState, useEffect } from 'react';
import { db, KEYS } from '../db';
import { MarketItem, User } from '../types';
import { Plus, Tag, Search, ShoppingBag, ExternalLink, CheckCircle2 } from 'lucide-react';

interface MarketplaceProps {
  user: User;
}

const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Item Form
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setItems(db.get<MarketItem>(KEYS.MARKET));
  }, []);

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MarketItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      price: parseFloat(price),
      description,
      sellerId: user.id,
      sellerName: user.name,
      status: 'Available',
      date: new Date().toISOString(),
      imageUrl: `https://picsum.photos/seed/${title}/400/300`
    };
    db.addItem(KEYS.MARKET, newItem);
    setItems(db.get<MarketItem>(KEYS.MARKET));
    setShowModal(false);
    setTitle(''); setPrice(''); setDescription('');
  };

  // Fix: Explicitly provide the generic type MarketItem to ensure 'status' property is recognized
  const markAsSold = (id: string) => {
    db.updateItem<MarketItem>(KEYS.MARKET, id, { status: 'Sold' });
    setItems(db.get<MarketItem>(KEYS.MARKET));
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search textbooks, calculators, furniture..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 ring-blue-500/10 transition-all"
          />
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus size={18} />
          <span>Sell Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-white/50">
                <p className="text-blue-600 font-black text-sm">${item.price}</p>
              </div>
              {item.status === 'Sold' && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">Sold Out</div>
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {item.sellerName.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{item.sellerName}</span>
                </div>
                {item.sellerId === user.id && item.status === 'Available' ? (
                  <button 
                    onClick={() => markAsSold(item.id)}
                    className="flex items-center space-x-1 text-green-500 hover:text-green-600 font-bold text-[10px] bg-green-50 px-2 py-1 rounded-lg"
                  >
                    <CheckCircle2 size={12} />
                    <span>Mark Sold</span>
                  </button>
                ) : (
                  <button className="text-blue-600 font-bold text-[10px] hover:underline flex items-center space-x-1">
                    <span>Contact Seller</span>
                    <ExternalLink size={10} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="bg-slate-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No items found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or be the first to sell something!</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-10">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Sell Something Cool</h3>
              <p className="text-slate-400 text-sm mb-8 font-medium">Clear out your dorm and make some extra cash.</p>
              <form onSubmit={handlePostItem} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Item Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-blue-500/20" placeholder="e.g. iPad Pro with Magic Keyboard" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Price ($)</label>
                  <input required type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-blue-500/20" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Description</label>
                  <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-blue-500/20 resize-none" placeholder="Describe the condition, usage, etc..." />
                </div>
                <div className="flex space-x-3 pt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 font-bold bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all">List for Sale</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
