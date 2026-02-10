
import React, { useState } from 'react';
import { db, KEYS } from '../db';
import { User, Role } from '../types';
import { Mail, Lock, User as UserIcon, LogIn, ChevronLeft } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = db.get<User>(KEYS.USERS);
    const user = users.find(u => u.email === email);
    
    if (user) {
      db.setCurrentUser(user);
      onLoginSuccess(user);
    } else {
      setError('Invalid credentials or user not found');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const users = db.get<User>(KEYS.USERS);
    if (users.some(u => u.email === email)) {
      setError('User already exists with this email');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      avatar: `https://picsum.photos/seed/${name}/200`
    };

    db.addItem(KEYS.USERS, newUser);
    db.setCurrentUser(newUser);
    onLoginSuccess(newUser);
  };

  const goBack = () => {
    window.location.reload(); // Simplest way to return to landing state if managed via state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating Back Button */}
      <button 
        onClick={goBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-slate-500 hover:text-white transition-colors group"
      >
        <div className="bg-slate-800 p-2 rounded-xl group-hover:bg-blue-600 transition-all">
          <ChevronLeft size={20} className="text-white" />
        </div>
        <span className="text-sm font-bold">Back to Home</span>
      </button>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20 mb-6">
            <span className="text-3xl font-black text-white">C</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">CampVerse</h1>
          <p className="text-slate-500 font-medium">Join the student revolution.</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
          <div className="flex mb-10 bg-slate-900/50 p-1.5 rounded-2xl">
            <button 
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${!isRegistering ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              SIGN IN
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${isRegistering ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              JOIN NOW
            </button>
          </div>

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Your Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-blue-500/50 rounded-[20px] py-4 pl-12 pr-6 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-blue-500/50 rounded-[20px] py-4 pl-12 pr-6 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                  placeholder="name@university.edu"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Secret Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-blue-500/50 rounded-[20px] py-4 pl-12 pr-6 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isRegistering && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Account Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-blue-500/50 rounded-[20px] py-4 px-6 text-white outline-none appearance-none font-bold tracking-tight cursor-pointer"
                >
                  <option value={Role.STUDENT}>Student</option>
                  <option value={Role.FACULTY}>Faculty</option>
                  <option value={Role.ADMIN}>Admin</option>
                </select>
              </div>
            )}

            {error && <p className="text-red-400 text-xs text-center font-bold bg-red-400/5 py-3 rounded-xl border border-red-400/10">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-3 group text-base"
            >
              <span>{isRegistering ? 'CREATE ACCOUNT' : 'ENTER CAMPVERSE'}</span>
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {!isRegistering && (
            <div className="mt-10 pt-10 border-t border-slate-700/30">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-center mb-6">Quick Access Demo</p>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => {setEmail('admin@campverse.edu'); setPassword('admin');}} className="flex flex-col items-center p-3 bg-slate-900/50 rounded-2xl hover:bg-blue-600/10 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-black text-white">ADMIN</span>
                </button>
                <button onClick={() => {setEmail('sarah@campverse.edu'); setPassword('faculty');}} className="flex flex-col items-center p-3 bg-slate-900/50 rounded-2xl hover:bg-blue-600/10 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-black text-white">FACULTY</span>
                </button>
                <button onClick={() => {setEmail('john@campverse.edu'); setPassword('student');}} className="flex flex-col items-center p-3 bg-slate-900/50 rounded-2xl hover:bg-blue-600/10 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-black text-white">STUDENT</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
