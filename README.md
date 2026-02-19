# Gym Subscription Management System

MERN stack project with full CRUD, JWT auth, role-based access.

## Structure

```
gym/
├── frontend/    # React app (Vite)
└── backend/     # Node.js + Express + MongoDB
```

## Setup

### Backend
```bash
cd backend
npm install
# Create .env (or copy .env.example) - set MONGODB_URI, JWT_SECRET
npm run seed    # Creates admin user: admin@gym.com / admin123
npm run dev     # Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
# Optional: Add hero-bg.png to frontend/public/ for Home/Classes background
npm run dev     # Runs on http://localhost:3000
```

### MongoDB
Ensure MongoDB is running locally, or set `MONGODB_URI` in `backend/.env`.

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)

### Subscriptions
- POST /api/subscription - Create (user purchase)
- GET /api/subscription - List (user: own, admin: all)
- PUT /api/subscription/:id
- DELETE /api/subscription/:id
- GET /api/subscription/plans
- POST /api/subscription/plans (admin)
- PUT /api/subscription/plans/:id (admin)
- DELETE /api/subscription/plans/:id (admin)

### Reports, Settings, Users
- GET /api/reports
- GET /api/reports/stats (admin)
- GET /api/settings, PUT /api/settings (admin)
- GET /api/users (admin), PUT/DELETE /api/users/:id (admin)

## JWT Flow
1. Register/Login → token in response
2. Token stored in localStorage
3. Axios interceptor adds `Authorization: Bearer <token>` to requests
4. ProtectedRoute & RoleGuard verify token/role on frontend
5. Backend middleware verifies JWT on each protected route

## Default Admin
- Email: admin@gym.com
- Password: admin123
