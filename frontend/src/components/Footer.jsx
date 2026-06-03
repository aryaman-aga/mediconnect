import { Link } from 'react-router-dom'
import { MedicalCrossIcon, TwitterXIcon, FacebookIcon, LinkedInIcon } from './Icons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <MedicalCrossIcon size={20} />
            <span className="footer-logo-text">MediConnect</span>
          </div>
          <p className="footer-tagline">
            Connecting patients with trusted healthcare professionals — anytime, anywhere.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Twitter"><TwitterXIcon size={16} /></a>
            <a href="#" className="social-link" aria-label="Facebook"><FacebookIcon size={16} /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><LinkedInIcon size={16} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/doctors">Find Doctors</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Log In</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Specialties</h4>
          <ul>
            <li><Link to="/doctors?specialty=Cardiology">Cardiology</Link></li>
            <li><Link to="/doctors?specialty=Neurology">Neurology</Link></li>
            <li><Link to="/doctors?specialty=Pediatrics">Pediatrics</Link></li>
            <li><Link to="/doctors?specialty=Dermatology">Dermatology</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
