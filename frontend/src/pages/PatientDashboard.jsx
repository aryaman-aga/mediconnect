import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import {
  CalendarIcon, ClockIcon, ClipboardIcon, CheckCircleIcon, HospitalIcon,
  MailIcon, PhoneIcon, DropletIcon, MapPinIcon, CakeIcon, DoctorIcon, FolderIcon,
} from '../components/Icons'
import './Dashboard.css'

const statusBadge = {
  PENDING:   { cls: 'badge-warning', label: 'Pending' },
  CONFIRMED: { cls: 'badge-success', label: 'Confirmed' },
  CANCELLED: { cls: 'badge-danger',  label: 'Cancelled' },
  COMPLETED: { cls: 'badge-gray',    label: 'Completed' },
}

function AppointmentCard({ appt, onCancel }) {
  const badge = statusBadge[appt.status] || statusBadge.PENDING
  const isPast = appt.status === 'CANCELLED' || appt.status === 'COMPLETED'
  const canCancel = appt.status === 'PENDING' || appt.status === 'CONFIRMED'

  return (
    <div className={`appt-card ${isPast ? 'appt-past' : ''}`}>
      <div className="appt-doctor">
        <div className="appt-avatar">
          {appt.doctorImageUrl
            ? <img src={appt.doctorImageUrl} alt={appt.doctorName} />
            : <DoctorIcon size={24} />
          }
        </div>
        <div className="appt-info">
          <div className="appt-name">{appt.doctorName}</div>
          <div className="appt-spec">{appt.doctorSpecialty}</div>
        </div>
        <span className={`badge ${badge.cls}`}>{badge.label}</span>
      </div>

      <div className="appt-details">
        <div className="appt-detail"><CalendarIcon size={14} /><span>{appt.appointmentDate}</span></div>
        <div className="appt-detail"><ClockIcon size={14} /><span>{appt.appointmentTime}</span></div>
        <div className="appt-detail"><ClipboardIcon size={14} /><span>{appt.reason}</span></div>
      </div>

      {appt.notes && (
        <div className="appt-notes"><strong>Doctor's notes:</strong> {appt.notes}</div>
      )}

      {canCancel && (
        <button className="btn btn-ghost btn-sm appt-cancel-btn" onClick={() => onCancel(appt.id)}>
          Cancel Appointment
        </button>
      )}
    </div>
  )
}

const profileFields = [
  { Icon: MailIcon,    label: 'Email',        field: 'email' },
  { Icon: PhoneIcon,   label: 'Phone',        field: 'phone' },
  { Icon: DropletIcon, label: 'Blood Group',  field: 'bloodGroup' },
  { Icon: CakeIcon,    label: 'Date of Birth',field: 'dateOfBirth' },
  { Icon: MapPinIcon,  label: 'Address',      field: 'address' },
]

export default function PatientDashboard() {
  const { user } = useAuth()
  const toast = useToast()
  const [profile, setProfile] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [profileRes, apptRes] = await Promise.all([
        api.get('/patients/me'),
        api.get('/appointments/patient?page=0&size=50'),
      ])
      setProfile(profileRes.data.data)
      setAppointments(apptRes.data.data.content)
    } catch {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCancel = async (id) => {
    if (!confirm('Cancel this appointment?')) return
    try {
      await api.delete(`/appointments/${id}`)
      toast.success('Appointment cancelled')
      fetchData()
    } catch {
      toast.error('Failed to cancel appointment')
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await api.put('/patients/me', editForm)
      setProfile(res.data.data)
      setEditMode(false)
      toast.success('Profile updated')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const upcoming = appointments.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED')
  const past = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED')

  if (loading) return <div className="page-loading"><div className="spinner" /></div>

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="container">
          <div className="dashboard-hero-inner">
            <div>
              <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
              <p>Manage your appointments and health profile</p>
            </div>
            <Link to="/doctors" className="btn btn-white">+ Book Appointment</Link>
          </div>
        </div>
      </div>

      <div className="container dashboard-content">
        <div className="dash-stats">
          <div className="dash-stat-card">
            <div className="dash-stat-icon"><CalendarIcon size={22} /></div>
            <div>
              <div className="dash-stat-value">{upcoming.length}</div>
              <div className="dash-stat-label">Upcoming</div>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon"><CheckCircleIcon size={22} /></div>
            <div>
              <div className="dash-stat-value">{appointments.filter(a => a.status === 'COMPLETED').length}</div>
              <div className="dash-stat-label">Completed</div>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon"><HospitalIcon size={22} /></div>
            <div>
              <div className="dash-stat-value">{appointments.length}</div>
              <div className="dash-stat-label">Total Visits</div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dash-main">
            <div className="dash-section-header">
              <h2>My Appointments</h2>
              <div className="tab-pills">
                <button className={`tab-pill ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
                  Upcoming <span className="tab-count">{upcoming.length}</span>
                </button>
                <button className={`tab-pill ${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>
                  History
                </button>
              </div>
            </div>

            {activeTab === 'upcoming' && (
              upcoming.length === 0 ? (
                <div className="dash-empty">
                  <div className="empty-icon"><CalendarIcon size={40} style={{ color: 'var(--color-text-muted)' }} /></div>
                  <h3>No upcoming appointments</h3>
                  <p>Book an appointment with one of our doctors</p>
                  <Link to="/doctors" className="btn btn-primary">Browse Doctors</Link>
                </div>
              ) : (
                <div className="appts-list">
                  {upcoming.map(a => <AppointmentCard key={a.id} appt={a} onCancel={handleCancel} />)}
                </div>
              )
            )}

            {activeTab === 'past' && (
              past.length === 0 ? (
                <div className="dash-empty">
                  <div className="empty-icon"><FolderIcon size={40} style={{ color: 'var(--color-text-muted)' }} /></div>
                  <h3>No past appointments</h3>
                  <p>Your appointment history will appear here</p>
                </div>
              ) : (
                <div className="appts-list">
                  {past.map(a => <AppointmentCard key={a.id} appt={a} onCancel={handleCancel} />)}
                </div>
              )
            )}
          </div>

          <div className="dash-sidebar">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">{user?.name?.[0]}</div>
                <div>
                  <div className="profile-name">{profile?.name}</div>
                  <div className="profile-role">Patient</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditMode(!editMode); setEditForm(profile || {}) }}>
                  {editMode ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editMode ? (
                <form onSubmit={handleSaveProfile} className="profile-form">
                  {[
                    { label: 'Phone',        field: 'phone',       type: 'tel' },
                    { label: 'Date of Birth',field: 'dateOfBirth', type: 'date' },
                    { label: 'Blood Group',  field: 'bloodGroup',  type: 'text' },
                    { label: 'Address',      field: 'address',     type: 'text' },
                  ].map(({ label, field, type }) => (
                    <div key={field} className="form-group">
                      <label className="form-label">{label}</label>
                      <input
                        type={type}
                        className="form-input"
                        value={editForm[field] || ''}
                        onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary btn-sm btn-full" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              ) : (
                <div className="profile-details">
                  {profileFields.map(({ Icon, label, field }) => (
                    <div key={label} className="profile-detail">
                      <span className="pd-icon"><Icon size={15} /></span>
                      <div>
                        <div className="pd-label">{label}</div>
                        <div className="pd-value">{profile?.[field] || '—'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
