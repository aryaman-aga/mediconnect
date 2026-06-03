import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { MedicalCrossIcon } from './Icons'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setMenuOpen(false)
  }

  const dashboardPath = user?.role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard'

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon"><MedicalCrossIcon size={22} /></span>
          <span className="logo-text">MediConnect</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>
            Find Doctors
          </NavLink>

          {user ? (
            <>
              <NavLink to={dashboardPath} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
              <div className="navbar-user">
                <span className="user-avatar">{user.name?.[0]?.toUpperCase()}</span>
                <span className="user-name">{user.name?.split(' ')[0]}</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                Sign Up Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
