import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Help from './components/pages/Help';
import FAQ from './components/pages/FAQ';
import Contact from './components/pages/Contact';

// Protected Pages
import Map from './components/map/Map';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';

// Volunteer Management
import VolunteerList from './components/volunteers/VolunteerList';
import VolunteerProfile from './components/volunteers/VolunteerProfile';
import AddVolunteer from './components/volunteers/AddVolunteer';

// Elderly Management
import ElderlyList from './components/elderly/ElderlyList';
import ElderlyProfile from './components/elderly/ElderlyProfile';
import AddElderly from './components/elderly/AddElderly';

// Visit Management
import VisitList from './components/visits/VisitList';
import AddVisit from './components/visits/AddVisit';
import VisitHistory from './components/visits/VisitHistory';

// Admin Pages
import Settings from './components/admin/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/map" element={<PrivateRoute><Map /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Volunteer Routes */}
          <Route path="/volunteers" element={<PrivateRoute><VolunteerList /></PrivateRoute>} />
          <Route path="/volunteers/add" element={<PrivateRoute><AddVolunteer /></PrivateRoute>} />
          <Route path="/volunteers/:id" element={<PrivateRoute><VolunteerProfile /></PrivateRoute>} />

          {/* Elderly Routes */}
          <Route path="/elderly" element={<PrivateRoute><ElderlyList /></PrivateRoute>} />
          <Route path="/elderly/add" element={<PrivateRoute><AddElderly /></PrivateRoute>} />
          <Route path="/elderly/:id" element={<PrivateRoute><ElderlyProfile /></PrivateRoute>} />

          {/* Visit Routes */}
          <Route path="/visits" element={<PrivateRoute><VisitList /></PrivateRoute>} />
          <Route path="/visits/add" element={<PrivateRoute><AddVisit /></PrivateRoute>} />
          <Route path="/visits/history" element={<PrivateRoute><VisitHistory /></PrivateRoute>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 