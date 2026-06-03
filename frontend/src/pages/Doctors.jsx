import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import {
  StarIcon, HospitalIcon, CalendarIcon, DollarIcon,
  SearchIcon, DoctorIcon, XIcon, ChevronLeftIcon, ChevronRightIcon,
} from '../components/Icons'
import './Doctors.css'

const SPECIALTIES = [
  'All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics',
  'Dermatology', 'Psychiatry', 'Gynecology', 'General Practice',
]

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const empty = 5 - full
  return (
    <span className="star-rating">
      {Array.from({ length: full }).map((_, i) => (
        <StarIcon key={`f${i}`} size={14} filled style={{ color: '#f59e0b' }} />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <StarIcon key={`e${i}`} size={14} filled={false} style={{ color: '#f59e0b' }} />
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  )
}

function DoctorCard({ doctor, onBook }) {
  const { user } = useAuth()
  const isPatient = user?.role === 'PATIENT'

  return (
    <div className="doctor-card">
      <div className="dc-header">
        <div className="dc-avatar">
          {doctor.imageUrl
            ? <img src={doctor.imageUrl} alt={doctor.name} />
            : <span><DoctorIcon size={28} /></span>
          }
          <span className={`dc-status ${doctor.available ? 'available' : 'unavailable'}`} />
        </div>
        <div className="dc-info">
          <h3 className="dc-name">{doctor.name}</h3>
          <div className="dc-specialty badge badge-blue">{doctor.specialty}</div>
        </div>
      </div>

      <div className="dc-meta">
        <div className="dc-meta-item">
          <span className="dc-meta-icon"><HospitalIcon size={14} /></span>
          <span>{doctor.hospital || 'Private Practice'}</span>
        </div>
        <div className="dc-meta-item">
          <span className="dc-meta-icon"><CalendarIcon size={14} /></span>
          <span>{doctor.experience} yrs experience</span>
        </div>
        <div className="dc-meta-item">
          <span className="dc-meta-icon"><DollarIcon size={14} /></span>
          <span>{doctor.consultationFee || '$100'}</span>
        </div>
      </div>

      <div className="dc-rating-row">
        <StarRating rating={doctor.rating || 0} />
        <span className="dc-reviews">({doctor.reviewCount} reviews)</span>
      </div>

      {doctor.bio && (
        <p className="dc-bio">{doctor.bio.slice(0, 100)}{doctor.bio.length > 100 ? '...' : ''}</p>
      )}

      <div className="dc-footer">
        {doctor.available
          ? <span className="badge badge-success">Available</span>
          : <span className="badge badge-gray">Unavailable</span>
        }
        {isPatient && doctor.available && (
          <button className="btn btn-primary btn-sm" onClick={() => onBook(doctor)}>Book Now</button>
        )}
        {!user && (
          <a href="/login" className="btn btn-outline btn-sm">Book Now</a>
        )}
      </div>
    </div>
  )
}

function BookingModal({ doctor, onClose, onSuccess }) {
  const toast = useToast()
  const [form, setForm] = useState({ appointmentDate: '', appointmentTime: '', reason: '' })
  const [loading, setLoading] = useState(false)

  const timeSlots = doctor.availableSlots?.length
    ? doctor.availableSlots
    : ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM']

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.appointmentDate || !form.appointmentTime || !form.reason) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      await api.post('/appointments', { doctorId: doctor.id, ...form })
      toast.success('Appointment booked successfully!')
      onSuccess()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book Appointment</h2>
          <button className="modal-close" onClick={onClose}><XIcon size={18} /></button>
        </div>

        <div className="modal-doctor-info">
          <div className="modal-avatar">
            {doctor.imageUrl
              ? <img src={doctor.imageUrl} alt={doctor.name} />
              : <DoctorIcon size={24} />
            }
          </div>
          <div>
            <div className="modal-doctor-name">{doctor.name}</div>
            <div className="modal-doctor-spec">{doctor.specialty} &middot; {doctor.hospital}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              min={minDate}
              value={form.appointmentDate}
              onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time Slot</label>
            <div className="slot-grid">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`slot-btn ${form.appointmentTime === slot ? 'selected' : ''}`}
                  onClick={() => setForm({ ...form, appointmentTime: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Brief description of your concern..."
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || 'All')
  const [page, setPage] = useState(0)
  const [pagination, setPagination] = useState(null)
  const [booking, setBooking] = useState(null)

  const fetchDoctors = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, size: 12 })
      if (search) params.set('search', search)
      if (specialty && specialty !== 'All') params.set('specialty', specialty)
      const res = await api.get(`/doctors?${params}`)
      setDoctors(res.data.data.content)
      setPagination(res.data.data)
    } catch {
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }, [page, search, specialty])

  useEffect(() => { fetchDoctors() }, [fetchDoctors])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    setSearchParams({ search, specialty: specialty === 'All' ? '' : specialty })
  }

  return (
    <div className="doctors-page">
      <div className="doctors-hero">
        <div className="container">
          <h1>Find Your Doctor</h1>
          <p>Browse our network of verified healthcare professionals</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <span className="search-icon"><SearchIcon size={18} /></span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, specialty, or hospital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      <div className="container doctors-content">
        <div className="specialty-filters">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              className={`filter-pill ${specialty === s ? 'active' : ''}`}
              onClick={() => { setSpecialty(s); setPage(0) }}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="page-loading"><div className="spinner" /></div>
        ) : doctors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><DoctorIcon size={48} style={{ color: 'var(--color-text-muted)' }} /></div>
            <h3>No doctors found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="doctors-grid">
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} onBook={setBooking} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="pagination">
                <button className="btn btn-ghost btn-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                  <ChevronLeftIcon size={16} /> Previous
                </button>
                <span className="page-info">Page {page + 1} of {pagination.totalPages}</span>
                <button className="btn btn-ghost btn-sm" disabled={pagination.last} onClick={() => setPage(page + 1)}>
                  Next <ChevronRightIcon size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {booking && (
        <BookingModal doctor={booking} onClose={() => setBooking(null)} onSuccess={fetchDoctors} />
      )}
    </div>
  )
}
