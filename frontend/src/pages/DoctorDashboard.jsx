import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import {
  CalendarIcon, ClockIcon, HourglassIcon, CheckCircleIcon, TrophyIcon,
  StarIcon, ClipboardIcon, MailIcon, HospitalIcon, DollarIcon, GraduationCapIcon,
  DoctorIcon, PatientIcon,
} from '../components/Icons'
import './Dashboard.css'

const statusBadge = {
  PENDING:   { cls: 'badge-warning', label: 'Pending' },
  CONFIRMED: { cls: 'badge-success', label: 'Confirmed' },
  CANCELLED: { cls: 'badge-danger',  label: 'Cancelled' },
  COMPLETED: { cls: 'badge-gray',    label: 'Completed' },
}

function AppointmentRow({ appt, onStatusChange }) {
  const badge = statusBadge[appt.status] || statusBadge.PENDING
  const canAct = appt.status === 'PENDING'

  return (
    <div className="appt-card">
      <div className="appt-doctor">
        <div className="appt-avatar appt-avatar-patient">
          <PatientIcon size={22} />
        </div>
        <div className="appt-info">
          <div className="appt-name">{appt.patientName}</div>
          <div className="appt-spec">{appt.reason}</div>
        </div>
        <span className={`badge ${badge.cls}`}>{badge.label}</span>
      </div>

      <div className="appt-details">
        <div className="appt-detail"><CalendarIcon size={14} /><span>{appt.appointmentDate}</span></div>
        <div className="appt-detail"><ClockIcon size={14} /><span>{appt.appointmentTime}</span></div>
      </div>

      {canAct && (
        <div className="appt-actions">
          <button className="btn btn-success btn-sm" onClick={() => onStatusChange(appt.id, 'CONFIRMED')}>Confirm</button>
          <button className="btn btn-ghost btn-sm" onClick={() => onStatusChange(appt.id, 'COMPLETED')}>Mark Done</button>
          <button className="btn btn-danger btn-sm" onClick={() => onStatusChange(appt.id, 'CANCELLED')}>Decline</button>
        </div>
      )}
      {appt.status === 'CONFIRMED' && (
        <button className="btn btn-ghost btn-sm" onClick={() => onStatusChange(appt.id, 'COMPLETED')}>
          Mark as Completed
        </button>
      )}
    </div>
  )
}

const profileFields = [
  { Icon: MailIcon,          label: 'Email',      field: 'email' },
  { Icon: HospitalIcon,      label: 'Hospital',   field: 'hospital' },
  { Icon: DollarIcon,        label: 'Fee',        field: 'consultationFee' },
  { Icon: CalendarIcon,      label: 'Experience', field: 'experience', format: v => v ? `${v} years` : '—' },
  { Icon: GraduationCapIcon, label: 'Education',  field: 'education' },
]

export default function DoctorDashboard() {
  const { user } = useAuth()
  const toast = useToast()
  const [profile, setProfile] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [profileRes, apptRes] = await Promise.all([
        api.get('/doctors/me'),
        api.get('/appointments/doctor?page=0&size=50'),
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

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status })
      toast.success(`Appointment ${status.toLowerCase()}`)
      fetchData()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await api.put('/doctors/me', editForm)
      setProfile(res.data.data)
      setEditMode(false)
      toast.success('Profile updated')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const pending   = appointments.filter(a => a.status === 'PENDING')
  const confirmed = appointments.filter(a => a.status === 'CONFIRMED')
  const completed = appointments.filter(a => a.status === 'COMPLETED')
  const cancelled = appointments.filter(a => a.status === 'CANCELLED')
  const filtered  = activeTab === 'pending' ? pending : activeTab === 'confirmed' ? confirmed : [...completed, ...cancelled]

  if (loading) return <div className="page-loading"><div className="spinner" /></div>

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="container">
          <div className="dashboard-hero-inner">
            <div>
              <h1>Welcome, {user?.name?.split(' ').slice(0, 2).join(' ')}</h1>
              <p>Manage your appointments and patient consultations</p>
            </div>
            <div className="doc-availability">
              <span className={`avail-dot ${profile?.available ? 'available' : ''}`} />
              <span>{profile?.available ? 'Available for appointments' : 'Currently unavailable'}</span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={async () => {
                  try {
                    const res = await api.put('/doctors/me', { available: !profile?.available })
                    setProfile(res.data.data)
                    toast.success(`You are now ${res.data.data.available ? 'available' : 'unavailable'}`)
                  } catch { toast.error('Failed to update') }
                }}
              >
                Toggle
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container dashboard-content">
        <div className="dash-stats">
          {[
            { Icon: HourglassIcon,   value: pending.length,   label: 'Pending' },
            { Icon: CheckCircleIcon, value: confirmed.length, label: 'Confirmed' },
            { Icon: TrophyIcon,      value: completed.length, label: 'Completed' },
            { Icon: StarIcon,        value: profile?.rating?.toFixed(1) || '—', label: 'Rating', filled: true },
          ].map(({ Icon, value, label, filled }) => (
            <div key={label} className="dash-stat-card">
              <div className="dash-stat-icon">
                {filled !== undefined
                  ? <StarIcon size={22} filled={filled} style={{ color: '#f59e0b' }} />
                  : <Icon size={22} />
                }
              </div>
              <div>
                <div className="dash-stat-value">{value}</div>
                <div className="dash-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dash-main">
            <div className="dash-section-header">
              <h2>Appointments</h2>
              <div className="tab-pills">
                {[
                  { key: 'pending',   label: `Pending (${pending.length})` },
                  { key: 'confirmed', label: `Confirmed (${confirmed.length})` },
                  { key: 'completed', label: 'History' },
                ].map(t => (
                  <button key={t.key} className={`tab-pill ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="dash-empty">
                <div className="empty-icon"><ClipboardIcon size={40} style={{ color: 'var(--color-text-muted)' }} /></div>
                <h3>No appointments here</h3>
                <p>Appointments will appear as patients book with you</p>
              </div>
            ) : (
              <div className="appts-list">
                {filtered.map(a => <AppointmentRow key={a.id} appt={a} onStatusChange={handleStatusChange} />)}
              </div>
            )}
          </div>

          <div className="dash-sidebar">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar doc-avatar">
                  {profile?.imageUrl
                    ? <img src={profile.imageUrl} alt={profile.name} />
                    : <DoctorIcon size={24} />
                  }
                </div>
                <div>
                  <div className="profile-name">{profile?.name}</div>
                  <div className="profile-role">{profile?.specialty}</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditMode(!editMode); setEditForm(profile || {}) }}>
                  {editMode ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editMode ? (
                <form onSubmit={handleSaveProfile} className="profile-form">
                  {[
                    { label: 'Phone',            field: 'phone',           type: 'text' },
                    { label: 'Hospital',          field: 'hospital',        type: 'text' },
                    { label: 'Consultation Fee',  field: 'consultationFee', type: 'text' },
                    { label: 'Bio',               field: 'bio',             type: 'textarea' },
                  ].map(({ label, field, type }) => (
                    <div key={field} className="form-group">
                      <label className="form-label">{label}</label>
                      {type === 'textarea'
                        ? <textarea className="form-input" rows={3} value={editForm[field] || ''} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })} />
                        : <input type={type} className="form-input" value={editForm[field] || ''} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })} />
                      }
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary btn-sm btn-full" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              ) : (
                <div className="profile-details">
                  {profileFields.map(({ Icon, label, field, format }) => (
                    <div key={label} className="profile-detail">
                      <span className="pd-icon"><Icon size={15} /></span>
                      <div>
                        <div className="pd-label">{label}</div>
                        <div className="pd-value">{format ? format(profile?.[field]) : (profile?.[field] || '—')}</div>
                      </div>
                    </div>
                  ))}
                  {profile?.bio && (
                    <div className="profile-bio">
                      <div className="pd-label">About</div>
                      <div className="pd-value">{profile.bio}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
