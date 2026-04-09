import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion  as _motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#020617] text-white">
        
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <_motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Home />
              </_motion.div>
            }
          />

          <Route
            path="/dashboard"
            element={
              <_motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Dashboard />
              </_motion.div>
            }
          />

          <Route
            path="/transactions"
            element={
              <_motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Transactions />
              </_motion.div>
            }
          />

           <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}