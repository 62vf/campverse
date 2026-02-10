
import React, { useState, useEffect } from 'react';
import { db, KEYS } from '../db';
import { Notice, User, Role } from '../types';
import { Plus, Megaphone, Calendar, Tag, ShieldAlert, Trash2 } from 'lucide-react';

interface NoticeBoardProps {
  user: User;
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ user }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  
  // New Notice Form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Notice['category']>('Academic');
  const [priority, setPriority] = useState<Notice['priority']>('Medium');

  useEffect(() => {
    setNotices(db.get<Notice>(KEYS.NOTICES));
  }, []);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: Notice = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      category,
      priority,
      postedBy: user.name,
      date: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    db.addItem(KEYS.NOTICES, newNotice);
    setNotices(db.get<Notice>(KEYS.NOTICES));
    setShowModal(false);
    // Reset form
    setTitle(''); setContent('');
  };

  const deleteNotice = (id: string) => {
    const updated = notices.filter(n => n.id !== id);
    db.set(KEYS.NOTICES, updated);
    setNotices(updated);
  };

  const filteredNotices = filter === 'All' ? notices : notices.filter(n => n.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {['All', 'Academic', 'Event', 'Administrative', 'Emergency'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {(user.role === Role.ADMIN || user.role === Role.FACULTY) && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            <span>Post Notice</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotices.map(notice => (
          <div key={notice.id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                notice.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {notice.priority}
              </span>
              {(user.role === Role.ADMIN || notice.postedBy === user.name) && (
                <button onClick={() => deleteNotice(notice.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{notice.title}</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">{notice.content}</p>
            
            <div className="pt-6 border-t border-slate-100 mt-auto grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] font-semibold">{new Date(notice.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Tag size={14} />
                <span className="text-[10px] font-semibold">{notice.category}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                {notice.postedBy.charAt(0)}
              </div>
              <span className="text-[10px] font-bold text-slate-600">{notice.postedBy}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">Create Campus Notice</h3>
                <Megaphone className="text-blue-600" size={24} />
              </div>
              <form onSubmit={handlePostNotice} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Title</label>
                  <input 
                    required 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-500/20"
                    placeholder="e.g. End Semester Results"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Content</label>
                  <textarea 
                    required 
                    rows={4}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-500/20 resize-none"
                    placeholder="Provide details about the announcement..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Category</label>
                    <select 
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none"
                    >
                      <option>Academic</option>
                      <option>Event</option>
                      <option>Administrative</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Priority</label>
                    <select 
                      value={priority}
                      onChange={e => setPriority(e.target.value as any)}
                      className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 font-bold bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all">Post Announcement</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
