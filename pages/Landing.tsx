
import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  Megaphone, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Users, 
  MessageSquare,
  Zap
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="font-black text-xl">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampVerse</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#community" className="hover:text-blue-600 transition-colors">Community</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onLogin}
              className="px-6 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8 animate-bounce">
            <Zap size={14} className="text-blue-600" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">New: Hackathon 2025 Live Now</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
            The Digital Pulse of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Your University.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium mb-12 leading-relaxed">
            Lost a phone? Want to sell a textbook? Or just need the latest campus news? 
            CampVerse brings your entire college ecosystem into one powerful, unified platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 group"
            >
              <span>Join CampVerse Today</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-[24px] font-black border border-slate-200 hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Floating Feature Cards (Static Display) */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto opacity-70 scale-95 md:scale-100">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-orange-50 p-3 rounded-2xl text-orange-600"><Search size={24} /></div>
              <div className="text-left"><p className="text-xs font-bold text-slate-400">LOST & FOUND</p><p className="font-bold text-slate-800">54 Items Listed</p></div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-green-50 p-3 rounded-2xl text-green-600"><ShoppingBag size={24} /></div>
              <div className="text-left"><p className="text-xs font-bold text-slate-400">MARKETPLACE</p><p className="font-bold text-slate-800">$1.2k Revenue</p></div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Megaphone size={24} /></div>
              <div className="text-left"><p className="text-xs font-bold text-slate-400">NOTICES</p><p className="font-bold text-slate-800">12 Updates Today</p></div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-purple-50 p-3 rounded-2xl text-purple-600"><Globe size={24} /></div>
              <div className="text-left"><p className="text-xs font-bold text-slate-400">GLOBAL</p><p className="font-bold text-slate-800">3,000+ Students</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Grid */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Everything you need to thrive.</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">One account, infinite possibilities. Built by students, for students.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Smart Lost & Found</h3>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium">Lost your keys in the cafeteria? Upload a photo and let our campus-wide search network find it for you in minutes.</p>
              <ul className="space-y-3 text-sm font-bold text-slate-400">
                <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-blue-600 rounded-full"></div><span>Photo Verification</span></li>
                <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-blue-600 rounded-full"></div><span>Real-time Alerts</span></li>
              </ul>
            </div>

            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Student Marketplace</h3>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium">Sell textbooks, dorm furniture, or electronics safely within the student community. Verified campus-only buyers.</p>
              <ul className="space-y-3 text-sm font-bold text-slate-400">
                <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"></div><span>No Listing Fees</span></li>
                <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"></div><span>In-App Chat</span></li>
              </ul>
            </div>

            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Academic Portal</h3>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium">Track your GPA, view your personalized timetable, and manage your attendance. Everything integrated with university data.</p>
              <ul className="space-y-3 text-sm font-bold text-slate-400">
                <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-indigo-600 rounded-full"></div><span>GPA Calculator</span></li>
                <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-indigo-600 rounded-full"></div><span>Exam Schedules</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="community" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 tracking-tighter">Loved by thousands of students.</h2>
            <div className="space-y-8">
              <div className="flex space-x-4">
                <div className="bg-blue-600/20 p-4 rounded-2xl text-blue-400 self-start"><Users size={24} /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Verified Community</h4>
                  <p className="text-slate-400 font-medium">Only university students with a valid @edu email can join, ensuring a safe and trusted environment.</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="bg-purple-600/20 p-4 rounded-2xl text-purple-400 self-start"><MessageSquare size={24} /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Anonymous Feedback</h4>
                  <p className="text-slate-400 font-medium">Your voice matters. Share insights anonymously with faculty to improve campus life.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-12 shadow-2xl relative z-10">
              <p className="text-2xl font-medium italic mb-8">"CampVerse completely changed how I interact with my campus. I sold all my freshmen year books in 2 days and found my lost Airpods in the same week!"</p>
              <div className="flex items-center space-x-4">
                <img src="https://i.pravatar.cc/100?u=jane" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Student" />
                <div>
                  <p className="font-bold">Jane Cooper</p>
                  <p className="text-sm text-blue-200">Senior Student, Engineering</p>
                </div>
              </div>
            </div>
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-[80px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-24 px-6 bg-slate-50 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Ready to join the verse?</h2>
        <button 
          onClick={onGetStarted}
          className="px-12 py-6 bg-blue-600 text-white rounded-[32px] font-black shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all text-xl"
        >
          Sign Up for Free
        </button>
        <div className="mt-20 border-t border-slate-200 pt-12 text-slate-400 text-sm font-bold flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-6 w-6 bg-blue-600 rounded text-white flex items-center justify-center text-[10px] font-black">C</div>
            <span>© 2025 CampVerse. All rights reserved.</span>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
