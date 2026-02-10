
import React, { useState, useEffect } from 'react';
import { db, KEYS } from '../db';
import { Feedback, User } from '../types';
import { MessageSquare, Star, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FeedbackProps {
  user: User;
}

const FeedbackPage: React.FC<FeedbackProps> = ({ user }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [category, setCategory] = useState<Feedback['category']>('Academics');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    setFeedbacks(db.get<Feedback>(KEYS.FEEDBACK));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      category,
      rating,
      comment,
      date: new Date().toISOString(),
      isAnonymous
    };
    db.addItem(KEYS.FEEDBACK, newFeedback);
    setFeedbacks(db.get<Feedback>(KEYS.FEEDBACK));
    // Reset
    setComment(''); setRating(5);
  };

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const chartData = [
    { name: 'Infrastructure', value: feedbacks.filter(f => f.category === 'Infrastructure').length },
    { name: 'Academics', value: feedbacks.filter(f => f.category === 'Academics').length },
    { name: 'Canteen', value: feedbacks.filter(f => f.category === 'Canteen').length },
    { name: 'Sports', value: feedbacks.filter(f => f.category === 'Sports').length },
    { name: 'Other', value: feedbacks.filter(f => f.category === 'Other').length },
  ].filter(d => d.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <MessageSquare size={120} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Share Your Voice</h2>
          <p className="text-slate-500 mb-8 font-medium">Help us make CampVerse even better. Your feedback matters.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Feedback Area</label>
              <div className="flex flex-wrap gap-2">
                {['Infrastructure', 'Academics', 'Canteen', 'Sports', 'Other'].map(cat => (
                  <button 
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      category === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star size={24} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Details</label>
              <textarea 
                required
                rows={4}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 ring-blue-500/20 resize-none"
                placeholder="What can we improve?"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="w-5 h-5 rounded-lg accent-blue-600"
              />
              <span className="text-sm font-bold text-slate-600">Post Anonymously</span>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition-all">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold">Feedback Insights</h3>
              <p className="text-xs text-slate-500 font-medium">Global campus statistics</p>
            </div>
            <BarChart3 className="text-blue-500" />
          </div>
          
          {chartData.length > 0 ? (
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', backgroundColor: '#0f172a', border: 'none', color: '#fff'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-600">
              <PieChartIcon size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-bold">No feedback data yet</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {chartData.map((d, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="h-2 w-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-1">{d.name}</p>
                  <p className="text-sm font-black">{d.value} Reports</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm max-h-[400px] overflow-y-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Reports</h3>
          <div className="space-y-4">
            {feedbacks.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{f.category}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(f.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-sm text-slate-700 italic">"{f.comment}"</p>
                <p className="text-[10px] text-slate-400 mt-3 font-bold">
                  Posted by {f.isAnonymous ? 'Anonymous Member' : 'Campus User'} • {new Date(f.date).toLocaleDateString()}
                </p>
              </div>
            ))}
            {feedbacks.length === 0 && <p className="text-center text-slate-400 text-sm py-10">No feedback submitted yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
