// //src/components/Navbar.jsx
// import { NavLink, Link } from "react-router-dom";

// const Navbar = () => {
//   const base =
//     "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
//   const active = "text-slate-900";

//   return (
//     <nav className="bg-white/80 backdrop-blur border-b border-slate-100 sticky top-0 z-30">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
//         {/* Logo */}
//         <NavLink to="/" className="flex items-center gap-2">
//           <span className="text-xl font-extrabold bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-400 bg-clip-text text-transparent">
//             Campverse
//           </span>
//         </NavLink>

//         {/* Links */}
//         <div className="hidden md:flex items-center gap-6">
//         <NavLink
//             to="/college-management"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             College Management
//           </NavLink>
//           <NavLink
//             to="/lost-found"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Lost &amp; Found
//           </NavLink>
//           <NavLink
//             to="/notices"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Notice Board
//           </NavLink>
//           <NavLink
//             to="/marketplace"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Marketplace
//           </NavLink>
//           <NavLink
//             to="/feedback"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Feedback
//           </NavLink>
          
//         </div>

//         {/* Right buttons */}
//         <div className="flex items-center gap-3">
//           <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs">
//             🔔
//           </button>
//           <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs">
//             🔍
//           </button>

//           {/* Login */}
//           <Link
//             to="/login"
//             className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx - Only Search + Bell Active
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import api from "./api/client";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const isLoggedIn = !!localStorage.getItem("campverse_token");
  
  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout/");
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("campverse_token");
    localStorage.removeItem("campverse_user");
    navigate("/login");
  };

  const base = "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
  const active = "text-slate-900";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Global search logic
      console.log("Searching for:", searchQuery);
      setShowSearch(false);
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-30 dark:bg-slate-900/90 dark:border-slate-600">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-400 bg-clip-text text-transparent">
            Campverse
          </span>
        </NavLink>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/college-management"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            College Management
          </NavLink>
          <NavLink
            to="/lost-found"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Lost & Found
          </NavLink>
          <NavLink
            to="/notices"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Notice Board
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/feedback"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Feedback
          </NavLink>
        </div>

        {/* Right buttons - ACTIVE */}
        <div className="flex items-center gap-3 relative">
          {/* Bell Icon - ACTIVE */}
          <div className="relative group">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:scale-110 hover:transition-all duration-300 cursor-pointer"
              title="Notifications (4 new)"
            >
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">4</span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-lg py-3 px-4 z-50 dark:bg-slate-900/95 dark:border-slate-700 dark:text-slate-200">
                <h4 className="font-bold text-sm mb-2 pb-2 border-b border-slate-200 dark:border-slate-700">Notifications</h4>
                <div className="space-y-2 text-xs">
                  <div>New exam schedule posted</div>
                  <div>Lost item: Black backpack found</div>
                  <div>New textbook listing</div>
                  <div>Your feedback approved</div>
                </div>
              </div>
            )}
          </div>

          {/* Search Icon - ACTIVE */}
          <div className="relative group">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:scale-110 hover: transition-all duration-300 cursor-pointer"
              title="Search everything"
            >
              🔍
            </button>

            {/* Search Dropdown */}
            {showSearch && (
              <form onSubmit={handleSearch} className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-lg py-3 px-4 z-50 dark:bg-slate-900/95 dark:border-slate-700">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lost items, notices..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-200"
                  autoFocus
                />
              </form>
            )}
          </div>

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold shadow-sm hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
