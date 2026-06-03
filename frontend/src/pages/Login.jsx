import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { MedicalCrossIcon, DoctorIcon, PatientIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon } from '../components/Icons'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [role, setRole] = useState(null)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (r) => { setRole(r); setStep(2) }

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { ...form, role })
      login(res.data.data)
      toast.success(`Welcome back, ${res.data.data.name}!`)
      navigate(role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">
            <MedicalCrossIcon size={22} /> MediConnect
          </div>
          <h2>Your health journey starts here</h2>
          <p>Connect with top doctors and manage your healthcare — all in one place.</p>
          <div className="auth-features">
            <div className="auth-feature"><CheckIcon size={15} /> Verified, licensed physicians</div>
            <div className="auth-feature"><CheckIcon size={15} /> Instant appointment booking</div>
            <div className="auth-feature"><CheckIcon size={15} /> Secure and private</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          {step === 1 ? (
            <>
              <div className="auth-header">
                <h1>Welcome Back</h1>
                <p>Choose your account type to continue</p>
              </div>
              <div className="role-cards">
                <button className="role-card" onClick={() => handleRoleSelect('PATIENT')}>
                  <span className="role-icon"><PatientIcon size={26} /></span>
                  <span className="role-title">I'm a Patient</span>
                  <span className="role-desc">Book appointments &amp; manage your health</span>
                  <span className="role-arrow"><ArrowRightIcon size={18} /></span>
                </button>
                <button className="role-card" onClick={() => handleRoleSelect('DOCTOR')}>
                  <span className="role-icon"><DoctorIcon size={26} /></span>
                  <span className="role-title">I'm a Doctor</span>
                  <span className="role-desc">Manage appointments &amp; connect with patients</span>
                  <span className="role-arrow"><ArrowRightIcon size={18} /></span>
                </button>
              </div>
              <p className="auth-switch">
                Don't have an account? <Link to="/register">Sign up free</Link>
              </p>
            </>
          ) : (
            <>
              <button className="back-btn" onClick={() => setStep(1)}>
                <ArrowLeftIcon size={16} /> Back
              </button>
              <div className="auth-header">
                <div className="role-badge">
                  {role === 'PATIENT'
                    ? <><PatientIcon size={14} /> Patient</>
                    : <><DoctorIcon size={14} /> Doctor</>
                  }
                </div>
                <h1>Sign In</h1>
                <p>Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-stack">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      autoComplete="current-password"
                    />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                  </div>
                  <div className="demo-hint">
                    <strong>Demo:</strong> patient@mediconnect.com / password123
                  </div>
                  <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </div>
              </form>

              <p className="auth-switch">
                Don't have an account? <Link to="/register">Create one free</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
