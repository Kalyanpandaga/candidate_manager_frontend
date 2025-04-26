# Candidates Management System - Frontend

Frontend application for managing candidates with authentication and protected dashboard.

## Tech Stack

- React.js (Vite)
- React Router
- JS-Cookie for Token Storage
- CSS3 for Styling
- Fetch API for HTTP requests

## Features

- Login and Signup Pages
- JWT Token stored in Cookies
- Protected Routes (Dashboard accessible only after login)
- View Candidates in Table
- Filtering, Searching, Pagination
- Logout functionality

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Kalyanpandaga/candidate_manager_frontend
cd candidate_manager_frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
VITE_API_BASE_URL=your_backend_base_url
```

4. Start the development server

```bash
npm run dev
```

Frontend will run on: [http://localhost:5173](http://localhost:5173)

## Important Features

- **ProtectedRoute Component**:

  - Checks if JWT token exists
  - Redirects to Login if not authenticated

- **Login Flow**:

  - Fetch API call to `/auth/login`
  - On success, save token in cookie
  - Navigate to Dashboard

- **Logout**:
  - Remove token and user info from cookies
  - Redirect to Login page

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000
# For production:
# VITE_API_BASE_URL=your_production_url
```

## Deployment

- Deployed on Render
- Environment variables set in Render dashboard
- CORS handled by backend
