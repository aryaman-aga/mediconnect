# MediConnect — Full-Stack Doctor-Patient Booking Platform

A production-ready doctor-patient appointment booking platform built with:
- **Frontend**: React 18 + Vite + React Router v6 + Axios + Plain CSS
- **Backend**: Java 17 + Spring Boot 3.2 + Spring Security + Spring Data MongoDB
- **Auth**: JWT (jjwt 0.11.5), stateless, role-based
- **Database**: MongoDB Atlas
- **Deployment**: Render (backend) + Netlify (frontend)

---

## Quick Start

### Prerequisites
- Java 17+
- Node.js 20+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd backend
# Set environment variables (or create application-local.yml)
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/mediconnect"
export JWT_SECRET="your-base64-encoded-secret"

mvn spring-boot:run
# API runs on http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL if needed
npm run dev
# App runs on http://localhost:3000
```

### Demo Credentials
After the app seeds the database on first run:
- **Patient**: `patient@mediconnect.com` / `password123`
- **Any seeded doctor**: `sarah.johnson@mediconnect.com` / `password123`

---

## Project Structure

```
project/
├── backend/
│   └── src/main/java/com/mediconnect/
│       ├── config/          # SecurityConfig, CORS
│       ├── controller/      # Auth, Doctor, Patient, Appointment, Health
│       ├── dto/             # Request / Response DTOs
│       ├── exception/       # GlobalExceptionHandler, custom exceptions
│       ├── model/           # User, Doctor, Patient, Appointment, enums
│       ├── repository/      # Spring Data MongoDB repos
│       ├── security/        # JwtUtil, JwtAuthFilter, UserDetailsServiceImpl
│       ├── service/         # Business logic
│       └── component/       # DataSeeder
├── frontend/
│   └── src/
│       ├── api/             # axios.js with interceptors
│       ├── components/      # Navbar, Footer, LoadingSpinner
│       ├── context/         # AuthContext, ToastContext
│       └── pages/           # Home, Doctors, Login, Register, Dashboards
├── render.yaml              # Render deployment config
├── netlify.toml             # Netlify deployment config
└── README.md
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | Public | Register patient or doctor |
| POST | `/api/auth/login` | Public | Login (role-validated) |
| GET | `/api/doctors` | Public | List/search doctors (paginated) |
| GET | `/api/doctors/{id}` | Public | Get doctor by ID |
| GET | `/api/doctors/me` | Doctor | Get own profile |
| PUT | `/api/doctors/me` | Doctor | Update own profile |
| GET | `/api/patients/me` | Patient | Get own profile |
| PUT | `/api/patients/me` | Patient | Update own profile |
| POST | `/api/appointments` | Patient | Book appointment |
| GET | `/api/appointments/patient` | Patient | Get own appointments |
| GET | `/api/appointments/doctor` | Doctor | Get own appointments |
| PATCH | `/api/appointments/{id}/status` | Authenticated | Update appointment status |
| DELETE | `/api/appointments/{id}` | Patient | Cancel appointment |
| GET | `/api/health` | Public | Health check |

## Deployment

### Render (Backend)
1. Create a new Web Service on Render
2. Set environment variables: `MONGODB_URI`, `JWT_SECRET`, `ALLOWED_ORIGINS`
3. Build: `cd backend && mvn clean package -DskipTests`
4. Start: `java -jar backend/target/mediconnect-backend-1.0.0.jar`

### Netlify (Frontend)
1. Connect your repo to Netlify
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set env var: `VITE_API_URL` pointing to your Render backend URL

## Running Tests

```bash
cd backend
mvn test
```

The test suite uses an embedded MongoDB and covers:
- Auth: register, login, role validation, duplicate email
- Doctors: list, profile access, auth guards
- Appointments: booking, duplicate slot detection, status updates
