# MediConnect Rebuild - Claude Opus Instructions

You are Claude Opus, an expert full-stack engineer and solutions architect. Your task is to perfectly replicate the "MediConnect" project—a full-stack doctor-patient appointment booking platform.

The goal is to recreate this application with the **exact same parameters, features, colors, and fonts** but with more **optimized code, better architectural patterns, and structured perfectly for deployment.**

## Reference Website:
You MUST refer to this live website for the exact design, UX, and aesthetic feel: "https://medicarebeta.netlify.app/". Use this as your absolute baseline for the UI.

## Execution Context & Permissions (CRITICAL):
### Deep Reading:
You MUST read all `.md` files (like `README.md`, `PROJECT_HANDBOOK.md`, `agent.md`) provided in this repository in extreme detail before writing a single line of code. Do not skim.

### Thought Process:
Think deeply like a proper senior developer. Take as much time as you need to map out the architecture, edge cases, data flows, and UI states before executing. Do not rush.

### Access:
You have full access to all the files in this repository. Please read, download, and analyze anything you need.

### Testing:
You are expected to write tests for all API endpoints to ensure the backend is robust and flawless before integrating with the frontend.

### Proactivity:
If you identify any areas for improvement (e.g., UI/UX enhancements, security loopholes, performance bottlenecks), proactively suggest them and integrate them into your solution.

---

## 1. Tech Stack Requirements

### Frontend:
- React 18/19 + Vite
- React Router v6 or v7
- Context API for global auth state (No Redux needed)
- Axios for API calls (with Interceptors)
- Plain CSS for styling (Scoping via CSS Modules or standard imports is fine, but follow the exact design tokens below)

### Backend:
- Java 17 + Spring Boot 3/4
- Spring Security (configured for stateless APIs, no WebSecurityConfigurerAdapter)
- Spring Data MongoDB
- JWT (0.11.5) for authentication

### Database:
- MongoDB Atlas

### Deployment Environments:
- Backend: Render (Docker or native Java runtime)
- Frontend: Netlify / Vercel
- Provide proper configuration files (`render.yaml`, `netlify.toml`, `vercel.json` if necessary)

---

## 2. Frontend Design Strategy (Light Theme & Gradients)

The frontend is a clean, modern Single Page Application (SPA). For this rebuild, strictly enforce a **Light Theme** throughout the application, but **incorporate sleek gradient backgrounds** exactly as they appear in the original design and the reference website.

### Design Aesthetics & Guidelines:
- **Backgrounds & Gradients:** Use light, clean bases (`#ffffff`, `#f8fafc`), but apply the beautiful gradient backgrounds.
- **Accents:** Use Primary Blue (`#2563eb`) for primary buttons, active states, and highlights.
- **Cards & Containers:** Wrap content in clean white cards with soft, subtle shadows and light borders.
- **Typography:** Use the `Plus Jakarta Sans` font family.
- **Feedback:** Include toast notifications for API success/errors.

### Exact CSS Tokens to Use:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #eff6ff;

  --color-bg: #f8fafc;
  --color-card: #ffffff;

  --color-text: #0f172a;
  --color-text-muted: #64748b;

  --color-border: #e2e8f0;

  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;

  --gradient-primary: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  --gradient-light: linear-gradient(to right, #eff6ff, #ffffff);
}

body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 3. Core Architecture & Features

### Authentication Flow
1. JWT-based stateless authentication.
2. Token is stored securely in `localStorage` on the client.
3. Axios interceptor automatically attaches `Authorization: Bearer <token>`.
4. Two-step login process:
   - Step 1: User selects role (Doctor or Patient).
   - Step 2: Form appears. Backend ensures role matches.

### Database Models
- User
- Doctor
- Patient
- Appointment

---

## 4. Key Improvements & Optimizations

1. Environment Variables
2. Server-Side Authorization
3. Robust Request Validation
4. Security Configuration
5. Database Indexing
6. Frontend Error Handling
7. Pagination

---

## 5. Step-by-Step Implementation Guide

### Step 1: Deep Context Gathering
- Read the README.md, PROJECT_HANDBOOK.md, agent.md and any existing code files.
- Visit the reference website and study the gradients, spacing, and layout.
- Formulate a mental map of the architecture.

### Step 2: Backend Setup & Configuration
- Initialize a Spring Boot project.
- Create application.yml.
- Setup MongoDB configuration.
- Implement SecurityFilterChain and CORS policy.

### Step 3: Database Models & Repositories
- Create document models.
- Create Spring Data repositories.
- Add an idempotent DataSeeder.

### Step 4: Security & JWT Implementation
- Create JwtUtil.
- Implement JwtAuthFilter.
- Create UserDetailsServiceImpl.

### Step 5: Services and Controllers
- Implement endpoints with robust validation.
- Test all API endpoints.

### Step 6: Frontend Foundation
- Setup Vite + React.
- Configure index.css.
- Configure api/axios.js.
- Setup AuthContext.jsx.

### Step 7: Frontend UI & Pages
- Implement routing.
- Implement Navbar.jsx and Footer.jsx.
- Implement Home.jsx, Doctors.jsx, Login.jsx, Register.jsx, PatientDashboard.jsx, DoctorDashboard.jsx.

### Step 8: Deployment Configuration
- Provide render.yaml.
- Provide netlify.toml.

By following these instructions meticulously, you will produce a production-ready, perfectly replicated version of MediConnect. Please begin.
