import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkersList from './pages/worker/WorkersList';
import WorkerProfile from './pages/worker/WorkerProfile';
import WorkerSetup from './pages/worker/WorkerSetup';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import JobsList from './pages/worker/JobsList';
import JobDetails from './pages/job/JobDetails';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CreateJob from './pages/customer/CreateJob';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Temporary dummy dashboard for Admin
const AdminDashboard = () => <div className="pt-24 px-8 text-center"><h1 className="text-3xl font-display">Admin Dashboard</h1></div>;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            {/* Public Worker Routes */}
            <Route path="workers" element={<WorkersList />} />
            <Route path="worker/:id" element={<WorkerProfile />} />
            <Route path="jobs" element={<JobsList />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            
            {/* Protected Worker Routes */}
            <Route path="worker/profile/setup" element={
              <ProtectedRoute allowedRoles={['worker']}>
                <WorkerSetup />
              </ProtectedRoute>
            } />
            <Route path="worker/dashboard" element={
              <ProtectedRoute allowedRoles={['worker']}>
                <WorkerDashboard />
              </ProtectedRoute>
            } />

            {/* Protected Customer Routes */}
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } />
            <Route path="jobs/create" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CreateJob />
              </ProtectedRoute>
            } />

            {/* Protected Admin Routes */}
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
