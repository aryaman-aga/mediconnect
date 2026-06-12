import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { MedicalCrossIcon, DoctorIcon, PatientIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon } from '../components/Icons'
import './Login.css'
import './Register.css'

const SPECIALTIES = [
  'General Practice', 'Cardiology', 'Neurology', 'Pediatrics',
  'Orthopedics', 'Dermatology', 'Psychiatry', 'Gynecology', 'Oncology', 'Other',
]

export default function Register() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [role, setRole] = useState(null)
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    specialty: '', hospital: '', phone: '',
    dateOfBirth: '', bloodGroup: '', gender: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (r) => { setRole(r); setStep(2) }
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Min 6 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const payload = { name: form.name, email: form.email, password: form.password, role }
    if (role === 'DOCTOR') {
      Object.assign(payload, { specialty: form.specialty, hospital: form.hospital, phone: form.phone })
    } else {
      Object.assign(payload, { phone: form.phone, dateOfBirth: form.dateOfBirth, bloodGroup: form.bloodGroup, gender: form.gender })
    }

    setLoading(true)
    try {
      const res = await api.post('/auth/register', payload)
      login(res.data.data)
      toast.success('Account created! Welcome to MediConnect.')
      navigate(role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
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
          <h2>Join thousands who trust MediConnect</h2>
          <p>Create your free account and start accessing healthcare professionals today.</p>
          <div className="auth-features">
            <div className="auth-feature"><CheckIcon size={15} /> Free to create an account</div>
            <div className="auth-feature"><CheckIcon size={15} /> Book unlimited appointments</div>
            <div className="auth-feature"><CheckIcon size={15} /> Your data stays private</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          {step === 1 ? (
            <>
              <div className="auth-header">
                <h1>Create Account</h1>
                <p>How will you be using MediConnect?</p>
              </div>
              <div className="role-cards">
                <button className="role-card" onClick={() => handleRoleSelect('PATIENT')}>
                  <span className="role-icon"><PatientIcon size={26} /></span>
                  <span className="role-title">Patient</span>
                  <span className="role-desc">Book appointments with trusted doctors</span>
                  <span className="role-arrow"><ArrowRightIcon size={18} /></span>
                </button>
                <button className="role-card" onClick={() => handleRoleSelect('DOCTOR')}>
                  <span className="role-icon"><DoctorIcon size={26} /></span>
                  <span className="role-title">Doctor</span>
                  <span className="role-desc">Manage your practice and connect with patients</span>
                  <span className="role-arrow"><ArrowRightIcon size={18} /></span>
                </button>
              </div>
              <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
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
                <h1>Create Account</h1>
                <p>Fill in your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="register-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder={role === 'DOCTOR' ? 'Dr. Rajesh Sharma' : 'Aarav Patel'}
                      value={form.name}
                      onChange={set('name')}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Min 6 characters"
                      value={form.password}
                      onChange={set('password')}
                    />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Repeat password"
                      value={form.confirmPassword}
                      onChange={set('confirmPassword')}
                    />
                    {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone (optional)</label>
                  <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} />
                </div>

                {role === 'DOCTOR' ? (
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Specialty</label>
                      <select className="form-input" value={form.specialty} onChange={set('specialty')}>
                        <option value="">Select specialty</option>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Hospital / Clinic</label>
                      <input type="text" className="form-input" placeholder="City Medical Center" value={form.hospital} onChange={set('hospital')} />
                    </div>
                  </div>
                ) : (
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date of Birth</label>
                      <input type="date" className="form-input" value={form.dateOfBirth} onChange={set('dateOfBirth')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select className="form-input" value={form.gender} onChange={set('gender')}>
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Free Account'}
                </button>
              </form>

              <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
