import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDestinations from './pages/admin/AdminDestinations';
import AdminPackages from './pages/admin/AdminPackages';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminInquiries from './pages/admin/AdminInquiries';

function PublicPage({ children }) {
  return <Layout>{children}</Layout>;
}

function AdminPage({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<PublicPage><Home /></PublicPage>} />
          <Route path="/about" element={<PublicPage><About /></PublicPage>} />
          <Route path="/packages" element={<PublicPage><Packages /></PublicPage>} />
          <Route path="/destinations" element={<PublicPage><Destinations /></PublicPage>} />
          <Route path="/destinations/:slug" element={<PublicPage><DestinationDetail /></PublicPage>} />
          <Route path="/gallery" element={<PublicPage><Gallery /></PublicPage>} />
          <Route path="/testimonials" element={<PublicPage><Testimonials /></PublicPage>} />
          <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage><AdminDashboard /></AdminPage>} />
          <Route path="/admin/destinations" element={<AdminPage><AdminDestinations /></AdminPage>} />
          <Route path="/admin/packages" element={<AdminPage><AdminPackages /></AdminPage>} />
          <Route path="/admin/gallery" element={<AdminPage><AdminGallery /></AdminPage>} />
          <Route path="/admin/testimonials" element={<AdminPage><AdminTestimonials /></AdminPage>} />
          <Route path="/admin/inquiries" element={<AdminPage><AdminInquiries /></AdminPage>} />

          {/* 404 */}
          <Route path="*" element={<PublicPage><NotFound /></PublicPage>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
