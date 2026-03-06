//src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CollegeManagement from "./pages/CollegeManagement";
import LostFound from "./pages/LostFound";
import Notices from "./pages/Notices";
import Marketplace from "./pages/Marketplace";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/college-management" element={<CollegeManagement />} />
      <Route path="/lost-found" element={<LostFound />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
