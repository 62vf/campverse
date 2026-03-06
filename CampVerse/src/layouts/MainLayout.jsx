//src/layouts/MainLayout.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage + sync with Home page toggle
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark" || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  // Sync theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-all duration-300">
     
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content - Full width with proper padding */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Global Theme Toggle - Top-right corner */}
      <button
        onClick={() => setDarkMode((d) => !d)}
        className="
          fixed top-4 right-4 z-50
          inline-flex items-center gap-2 px-4 py-2 rounded-2xl
          text-sm font-semibold border-2
          bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl
          border-slate-200/50 dark:border-slate-700/50
          text-slate-800 dark:text-slate-200
          hover:shadow-3xl hover:scale-105 hover:-translate-y-1
          transition-all duration-300
          lg:hidden
        "
        title="Toggle Dark Mode"
      >
        <span className="inline-flex h-5 w-5 rounded-full shadow-inner items-center justify-center text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-500">
          {darkMode ? "🌙" : "☀️"}
        </span>
        <span>{darkMode ? "Dark" : "Light"}</span>
      </button>
    </div>
  );
};

export default MainLayout;

