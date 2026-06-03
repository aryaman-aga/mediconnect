import { Link } from 'react-router-dom'
import {
  HeartIcon, BrainIcon, BabyIcon, BoneIcon, MicroscopeIcon, StethoscopeIcon,
  DoctorIcon, StarIcon, LightningIcon,
} from '../components/Icons'
import './Home.css'

const specialties = [
  { Icon: HeartIcon,      name: 'Cardiology',       desc: 'Heart & Vascular' },
  { Icon: BrainIcon,      name: 'Neurology',         desc: 'Brain & Nerves' },
  { Icon: BabyIcon,       name: 'Pediatrics',        desc: 'Child Health' },
  { Icon: BoneIcon,       name: 'Orthopedics',       desc: 'Bones & Joints' },
  { Icon: MicroscopeIcon, name: 'Dermatology',       desc: 'Skin Care' },
  { Icon: StethoscopeIcon,name: 'General Practice',  desc: 'Primary Care' },
]

const steps = [
  { num: '01', title: 'Find Your Doctor',    desc: 'Browse our network of verified specialists by specialty, location, or name.' },
  { num: '02', title: 'Book a Slot',         desc: "Choose a convenient date and time from the doctor's available schedule." },
  { num: '03', title: 'Get Consultation',    desc: 'Attend your appointment and receive professional medical care.' },
]

const stats = [
  { value: '500+', label: 'Verified Doctors' },
  { value: '50K+', label: 'Happy Patients' },
  { value: '30+',  label: 'Specialties' },
  { value: '4.9',  label: 'Average Rating' },
]

function StarRow({ count = 5 }) {
  return (
    <span className="hcs-stars">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} size={14} filled style={{ color: '#f59e0b' }} />
      ))}
    </span>
  )
}

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <LightningIcon size={14} /> Book instantly — no waiting lists
            </div>
            <h1 className="hero-title">
              Your Health, Our <span className="hero-highlight">Priority</span>
            </h1>
            <p className="hero-subtitle">
              Connect with top-rated doctors across every specialty. Schedule appointments in seconds and receive the care you deserve.
            </p>
            <div className="hero-actions">
              <Link to="/doctors" className="btn btn-white btn-lg">Find a Doctor</Link>
              <Link to="/register" className="btn btn-lg hero-signup-btn">Get Started Free</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <div className="hc-header">
                <div className="hc-avatar"><DoctorIcon size={28} /></div>
                <div>
                  <div className="hc-name">Dr. Sarah Johnson</div>
                  <div className="hc-specialty">Cardiologist</div>
                </div>
                <div className="hc-badge">Available</div>
              </div>
              <div className="hc-slots">
                <div className="hc-slot active">9:00 AM</div>
                <div className="hc-slot">10:30 AM</div>
                <div className="hc-slot">2:00 PM</div>
                <div className="hc-slot">3:30 PM</div>
              </div>
              <button className="btn btn-primary btn-full">Book Appointment</button>
            </div>
            <div className="hero-card hero-card-stat">
              <StarRow />
              <div className="hcs-text">"Best healthcare platform I've ever used!"</div>
              <div className="hcs-author">— Maria K., Patient</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="specialties-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Specialty</h2>
            <p>Find the right specialist for your needs</p>
          </div>
          <div className="specialties-grid">
            {specialties.map(({ Icon, name, desc }) => (
              <Link key={name} to={`/doctors?specialty=${encodeURIComponent(name)}`} className="specialty-card">
                <div className="specialty-icon"><Icon size={28} /></div>
                <div className="specialty-name">{name}</div>
                <div className="specialty-desc">{desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2>How MediConnect Works</h2>
            <p>Get healthcare in three simple steps</p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-text">
              <h2>Ready to take charge of your health?</h2>
              <p>Join thousands of patients who trust MediConnect for their healthcare needs.</p>
            </div>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-white btn-lg">Create Free Account</Link>
              <Link to="/doctors" className="btn btn-lg cta-outline-btn">Browse Doctors</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
