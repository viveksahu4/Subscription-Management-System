import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageTransitionProvider } from './context/PageTransitionContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';
import Loader from './components/Loader';
import { useAuth } from './context/AuthContext';

// Public pages
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Calculators from './pages/Calculators';
import InfoPage from './pages/InfoPage';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
import DietCounseling from './pages/DietCounseling';
import Workout from './pages/Workout';
import Nutrition from './pages/Nutrition';
import Spa from './pages/Spa';
import Swimming from './pages/Swimming';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// User pages
import UserDashboard from './pages/user/Dashboard';
import MySubscriptions from './pages/user/MySubscriptions';
import Purchase from './pages/user/Purchase';
import Profile from './pages/user/Profile';
import UserReports from './pages/user/Reports';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageSubscriptions from './pages/admin/ManageSubscriptions';
import AdminReports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// 404
import NotFound from './pages/NotFound';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <PageTransitionProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="classes" element={<Classes />} />
        <Route path="classes/:slug" element={<ClassDetail />} />
        <Route path="diet" element={<DietCounseling />} />
        <Route path="workout" element={<Workout />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="spa" element={<Spa />} />
        <Route path="swimming" element={<Swimming />} />
        <Route path="calculators" element={<Calculators />} />
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="subscriptions" element={<ProtectedRoute><MySubscriptions /></ProtectedRoute>} />
        <Route path="purchase" element={<ProtectedRoute><Purchase /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute><UserReports /></ProtectedRoute>} />

        <Route path="admin" element={<ProtectedRoute><RoleGuard roles={['admin']}><AdminDashboard /></RoleGuard></ProtectedRoute>} />
        <Route path="admin/users" element={<ProtectedRoute><RoleGuard roles={['admin']}><ManageUsers /></RoleGuard></ProtectedRoute>} />
        <Route path="admin/subscriptions" element={<ProtectedRoute><RoleGuard roles={['admin']}><ManageSubscriptions /></RoleGuard></ProtectedRoute>} />
        <Route path="admin/reports" element={<ProtectedRoute><RoleGuard roles={['admin']}><AdminReports /></RoleGuard></ProtectedRoute>} />
        <Route path="admin/settings" element={<ProtectedRoute><RoleGuard roles={['admin']}><Settings /></RoleGuard></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </PageTransitionProvider>
  );
};

export default App;
