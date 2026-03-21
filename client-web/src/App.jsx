import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Investigator from './pages/Investigator';
import InvestigationWorkspace from './pages/InvestigationWorkspace';
import ReportGenerator from './pages/ReportGenerator';
import AppDashboard from './pages/AppDashboard';
import AppTransfer from './pages/AppTransfer';
import AppSuccess from './pages/AppSuccess';
import AppHistory from './pages/AppHistory';
import AppProfile from './pages/AppProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/investigate" element={<Investigator />} />
        <Route path="/workspace" element={<InvestigationWorkspace />} />
        <Route path="/reports" element={<ReportGenerator />} />
        <Route path="/app" element={<AppDashboard />} />
        <Route path="/app/transfer" element={<AppTransfer />} />
        <Route path="/app/success" element={<AppSuccess />} />
        <Route path="/app/history" element={<AppHistory />} />
        <Route path="/app/profile" element={<AppProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
