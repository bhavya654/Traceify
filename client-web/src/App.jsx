import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Investigator from './pages/Investigator';
import InvestigationWorkspace from './pages/InvestigationWorkspace';
import ReportGenerator from './pages/ReportGenerator';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/investigate" element={<Investigator />} />
        <Route path="/workspace" element={<InvestigationWorkspace />} />
        <Route path="/reports" element={<ReportGenerator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
