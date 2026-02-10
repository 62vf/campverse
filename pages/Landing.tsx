
import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  Megaphone, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  MessageSquare,
  Zap,
  GraduationCap
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="font-black text-xl">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampVerse</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-500">
            <a href="#about" className="hover:text-blue-600 transition-colors">Introduction</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#team" className="hover:text-blue-600 transition-colors">Our Team</a>
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
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              Enter Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Matching Slide 1 */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-10" 
            alt="Campus Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50 to-slate-50"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter italic">
            CampVerse
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            A modern web-based campus management system designed to solve challenges 
            of manual work and poor communication in academic environments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center space-x-3"
            >
              <span>Get Started Now</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Presenter Credits - Matching Slide 1 */}
          <div id="team" className="mt-20 pt-12 border-t border-slate-200 max-w-xl mx-auto">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Presented By</p>
            <div className="grid grid-cols-3 gap-4">
              {['Khushi Sharma', 'Jyoti', 'Kalpana Sharma'].map((name, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm font-bold text-slate-800 italic">{i + 1}. {name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section - Matching Slide 3 */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video bg-blue-100 rounded-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1523050335102-c6744ef81ec7?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Student Interaction" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 hidden lg:block">
              <p className="text-3xl font-black text-blue-600">100%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Digitalized Platform</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Modern Academic Solution</h2>
            <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
              <p>In the modern academic environment, students and faculty often face challenges in accessing timely information and staying connected.</p>
              <p>CampVerse provides a single digital platform for campus-related activities, designed to eliminate inefficient physical notice boards and fragmented marketplaces.</p>
              <ul className="space-y-3 pt-4">
                {['Centralization of Services', 'Improved Accessibility', 'Reduced Manual Workload'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-800">
                    <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black">{i+1}</div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Matching Slide 4 */}
      <section id="features" className="py-24 px-6 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Features of CampVerse</h2>
            <p className="text-slate-400 font-medium">Streamlining every aspect of your college experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards following Slide 4 visual style */}
            {[
              { 
                title: 'Lost & Found Management', 
                desc: 'Report, track and recover items digitally with photo verification.', 
                icon: Search, 
                color: 'bg-orange-500',
                img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Digital Notice Board', 
                desc: 'Real-time updates for announcements, exams and campus events.', 
                icon: Megaphone, 
                color: 'bg-blue-500',
                img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Second Hand Goods Marketplace', 
                desc: 'Turn your old books and items into cash within the community.', 
                icon: ShoppingBag, 
                color: 'bg-emerald-500',
                img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'College Management', 
                desc: 'Student records, attendance, fees and timetable at your fingertips.', 
                icon: GraduationCap, 
                color: 'bg-indigo-500',
                img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Student Feedback System', 
                desc: 'Anonymous platform to improve courses, faculty and facilities.', 
                icon: MessageSquare, 
                color: 'bg-purple-500',
                img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Administration Control', 
                desc: 'Comprehensive dashboard for record management and content moderation.', 
                icon: ShieldCheck, 
                color: 'bg-rose-500',
                img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800'
              }
            ].map((feature, i) => (
              <div key={i} className="group relative bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={feature.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt={feature.title} />
                </div>
                <div className="p-8">
                  <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages - Slide 12 */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-slate-900 mb-16">Why Choose CampVerse?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'User Friendly', value: 'Simple & Intuitive' },
              { label: 'Accessible', value: 'Anywhere, Any Device' },
              { label: 'Easy Data', value: 'Local Storage Sync' },
              { label: 'Cost Effective', value: 'No Infrastructure' }
            ].map((adv, i) => (
              <div key={i} className="space-y-2">
                <p className="text-3xl font-black text-blue-600">{adv.label}</p>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{adv.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">C</div>
            <span className="font-bold text-slate-800 tracking-tight">CampVerse</span>
          </div>
          <div className="text-xs font-bold text-slate-400">
            Created for Project Submission • 2025
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
