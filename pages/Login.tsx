
import React, { useState } from 'react';
import { db, KEYS } from '../db';
import { User, Role } from '../types';
import { Mail, Lock, User as UserIcon, LogIn } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20 mb-6">
            <span className="text-3xl font-black text-white">C</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CampVerse</h1>
          <p className="text-slate-400">The Ultimate Campus Management Platform</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="flex mb-8 bg-slate-900/50 p-1 rounded-xl">
            <button 
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${!isRegistering ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${isRegistering ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all"
                  placeholder="name@university.edu"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isRegistering && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-blue-500 rounded-xl py-3 px-4 text-white outline-none appearance-none"
                >
                  <option value={Role.STUDENT}>Student</option>
                  <option value={Role.FACULTY}>Faculty</option>
                  <option value={Role.ADMIN}>Admin</option>
                </select>
              </div>
            )}

            {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>{isRegistering ? 'Create Account' : 'Sign In Now'}</span>
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {!isRegistering && (
            <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
              <p className="text-slate-400 text-sm">Demo Accounts:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <button onClick={() => {setEmail('admin@campverse.edu'); setPassword('admin');}} className="text-[10px] bg-slate-900 px-3 py-1 rounded-full text-blue-400 border border-slate-700 hover:border-blue-400 transition-colors">Admin</button>
                <button onClick={() => {setEmail('sarah@campverse.edu'); setPassword('faculty');}} className="text-[10px] bg-slate-900 px-3 py-1 rounded-full text-blue-400 border border-slate-700 hover:border-blue-400 transition-colors">Faculty</button>
                <button onClick={() => {setEmail('john@campverse.edu'); setPassword('student');}} className="text-[10px] bg-slate-900 px-3 py-1 rounded-full text-blue-400 border border-slate-700 hover:border-blue-400 transition-colors">Student</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
