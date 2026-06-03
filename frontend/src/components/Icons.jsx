const svg = (path, opts = {}) => {
  const { viewBox = '0 0 24 24', fill = 'none', stroke = 'currentColor', strokeWidth = '1.8' } = opts
  return ({ size = 20, className = '', style = {} }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {path}
    </svg>
  )
}

export const MedicalCrossIcon = svg(
  <>
    <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </>
)

export const StethoscopeIcon = svg(
  <>
    <path d="M6 4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V6a2 2 0 0 0-2-2" />
    <path d="M16 14a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
    <line x1="12" y1="10" x2="12" y2="14" />
  </>
)

export const HeartIcon = svg(
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
)

export const BrainIcon = svg(
  <>
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v1.5" />
    <path d="M3 9a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V9z" />
    <path d="M9 10a3 3 0 0 0 6 0" />
    <path d="M12 10v9" />
  </>
)

export const BabyIcon = svg(
  <>
    <circle cx="12" cy="6" r="3" />
    <path d="M7 14c0-2.76 2.24-5 5-5s5 2.24 5 5v2H7v-2z" />
    <path d="M4 20h16" />
  </>
)

export const BoneIcon = svg(
  <>
    <path d="M18.5 5.5a3 3 0 0 1 0 4.24L9.24 18.96a3 3 0 1 1-4.24-4.24l9.26-9.22a3 3 0 0 1 4.24 0z" />
    <path d="M5.5 5.5a3 3 0 0 0 4.24 0" />
    <path d="M18.5 18.5a3 3 0 0 1-4.24 0" />
  </>
)

export const MicroscopeIcon = svg(
  <>
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14H4s-.5-1.7 2-3.5" />
    <path d="M10 2l4.3 4.3" />
    <path d="M7.2 4.2L12 9" />
  </>
)

export const DoctorIcon = svg(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M16 13v3m0 3v-3m0 0h3m-3 0h-3" />
  </>
)

export const PatientIcon = svg(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
)

export const StarIcon = ({ size = 16, filled = true, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export const SearchIcon = svg(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>
)

export const CalendarIcon = svg(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
)

export const ClockIcon = svg(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
)

export const HospitalIcon = svg(
  <>
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4 8 4v14" />
    <path d="M9 21v-4h6v4" />
    <path d="M10 10h4" />
    <path d="M12 8v4" />
  </>
)

export const DollarIcon = svg(
  <>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </>
)

export const ClipboardIcon = svg(
  <>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </>
)

export const MailIcon = svg(
  <>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </>
)

export const PhoneIcon = svg(
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.13-1.13a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
)

export const DropletIcon = svg(
  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
)

export const MapPinIcon = svg(
  <>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </>
)

export const GraduationCapIcon = svg(
  <>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </>
)

export const TrophyIcon = svg(
  <>
    <polyline points="8 20 8 16 4 16" />
    <polyline points="16 20 16 16 20 16" />
    <line x1="12" y1="20" x2="12" y2="16" />
    <path d="M4 8H2V4h20v4h-2" />
    <path d="M4 8a8 8 0 0 0 16 0" />
  </>
)

export const HourglassIcon = svg(
  <>
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </>
)

export const CheckCircleIcon = svg(
  <>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </>
)

export const CheckIcon = svg(<polyline points="20 6 9 17 4 12" />)

export const XIcon = svg(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
)

export const InfoIcon = svg(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </>
)

export const AlertTriangleIcon = svg(
  <>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </>
)

export const ArrowRightIcon = svg(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>
)

export const ArrowLeftIcon = svg(
  <>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </>
)

export const ChevronLeftIcon = svg(<polyline points="15 18 9 12 15 6" />)
export const ChevronRightIcon = svg(<polyline points="9 18 15 12 9 6" />)

export const FolderIcon = svg(
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
)

export const LightningIcon = svg(
  <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
)

export const CakeIcon = svg(
  <>
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 21h16" />
    <path d="M12 3v8" />
    <path d="M9 6c0 1.66 1.34 3 3 3s3-1.34 3-3" />
  </>
)

export const WaveIcon = svg(
  <path d="M2 12c1.5-3 3.5-3 5 0s3.5 3 5 0 3.5-3 5 0" />
)

export const TwitterXIcon = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export const FacebookIcon = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export const LinkedInIcon = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
