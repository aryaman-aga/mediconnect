import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import './App.css'

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

function GuestRoute({ children }) {
  const { user } = useAuth()
  if (user) {
    return <Navigate to={user.role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard'} replace />
  }
  return children
}

function AppLayout() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route
            path="/login"
            element={<GuestRoute><Login /></GuestRoute>}
          />
          <Route
            path="/register"
            element={<GuestRoute><Register /></GuestRoute>}
          />
          <Route
            path="/patient/dashboard"
            element={<ProtectedRoute role="PATIENT"><PatientDashboard /></ProtectedRoute>}
          />
          <Route
            path="/doctor/dashboard"
            element={<ProtectedRoute role="DOCTOR"><DoctorDashboard /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppLayout />
        <Analytics />
      </ToastProvider>
    </AuthProvider>
  )
}
