# 🎯 Activity Tracker — Production-Ready Full-Stack Web Application

A modern, production-ready, full-stack **Activity Tracker** web application engineered with **React (Vite) + Tailwind CSS**, **Node.js + Express.js**, and **MongoDB (Mongoose)**. Designed with a minimal, professional aesthetic (white + blue + dark accents), smooth animations, glassmorphism cards, and mobile-first responsiveness.

---

## ⚡ QUICK START: How to Run on Your System

You have **two simple ways** to run the website on your computer:

### 🌟 Method A: The 1-Click Way (Easiest for Windows)

In your file explorer, open:
`C:\Users\sarthak\.gemini\antigravity\scratch\activity-tracker`

1. Double-click **`start-all.bat`**.
2. Two terminal windows will open (one for the Backend API on port 5000, one for the Frontend on port 5173).
3. Open your browser and go to:
   👉 **`http://localhost:5173`**

---

### 💻 Method B: Using PowerShell / Terminal Commands

If you prefer using the terminal (e.g., inside VS Code), follow these steps:

#### 1. Add Node.js to your terminal PATH (Fixes `'node' is not recognized`)
In your PowerShell terminal, run this once:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

#### 2. Start the Backend Server (Terminal 1)
```powershell
cd "C:\Users\sarthak\.gemini\antigravity\scratch\activity-tracker\backend"
node src/server.js
```
*(If `node` still says not recognized, run: `& "C:\Program Files\nodejs\node.exe" src/server.js`)*

✅ You should see:
```text
[Server] Activity Tracker API running on port 5000 in development mode
[MongoDB] Fallback in-memory MongoDB initialized at: mongodb://...
```
*(The backend includes an automatic embedded MongoDB engine, so it runs **100% out of the box** even if you don't have MongoDB installed on your computer!)*

#### 3. Start the Frontend Server (Terminal 2)
Open a new terminal tab in VS Code and run:
```powershell
cd "C:\Users\sarthak\.gemini\antigravity\scratch\activity-tracker\frontend"
npm.cmd run dev
```

✅ You should see:
```text
VITE ready in 600 ms
➜  Local:   http://localhost:5173/
```

#### 4. Open the App in Your Browser
Visit **[http://localhost:5173](http://localhost:5173)**!

---

## 🌟 Key Features

### 🔐 User Authentication & Security
- **JWT (JSON Web Token) Authentication**: Secure token-based access with expiration and refresh handling.
- **Password Security**: Bcryptjs salt hashing with pre-save triggers.
- **Input Validation**: Sanitization and validation via `express-validator` on all auth and CRUD endpoints.
- **Protected Routes**: Middleware verifying token authorization on private APIs.

### 📋 Kanban Task Management Board
- **Three Core Columns**:
  - **To Do**: Today's active tasks with Title, Description, Priority (Low / Medium / High), Category, Due Date & Time.
  - **Done**: Completed tasks with automated completion timestamps (`completedAt`), strikethrough styling, and celebratory confetti.
  - **Planned**: Scheduled future tasks for any selected date/month.
- **Drag & Drop**: Native drag-and-drop between columns with smooth hover states and instant database updates.
- **One-Click Actions**: Single-click completion toggle, instant task editing, and safe deletion.

### 🔍 Discovery & Organization
- **Real-Time Search**: Search tasks instantly across titles and descriptions.
- **Multi-Factor Filters**: Filter by Priority (`Low`, `Medium`, `High`), Category (`Work`, `Personal`, `Fitness`, `Study`, `Finance`, `Health`, `Other`), and Status.
- **Multi-Field Sorting**: Sort by Due Date, Date Created, Priority, or Alphabetical title.
- **Progress Tracking**: Real-time progress bar reflecting completion percentage.

### 📅 Calendar Scheduling View
- Interactive monthly grid view displaying scheduled commitments and dead-lines.
- Highlighted current day, task counters, and color-coded priority pills on each day cell.
- Date Agenda drawer with one-click quick scheduling for any specific day.

### 📊 Productivity & Activity Overview
- **7-Day Trend Chart**: Visual comparison of tasks completed vs tasks created over the past week.
- **Category Breakdown**: Dynamic percentage bars showing workload distribution across categories.
- **Priority Distribution**: Metric cards measuring urgency breakdowns (High, Medium, Low).
- **Productivity Status**: Velocity tracking and streak encouragement.

### 🎨 Design & Extras
- **Dark / Light Mode**: Seamless dark and light themes with persistent local storage.
- **Glassmorphism UI**: Backdrop blur cards, modern borders, and micro-interactions.
- **Export Features**:
  - **CSV Export**: Instant download of task history formatted for spreadsheets.
  - **PDF Export**: Formatted executive report with summaries and data tables via `jspdf` & `jspdf-autotable`.
- **Reminder Notifications**: Browser Notification API integration with in-app toast alerts for upcoming and overdue tasks.
- **Local Storage Cache**: Caches user session, token, and theme preferences.
- **Docker Support**: Preconfigured `Dockerfile` for both tiers and `docker-compose.yml` orchestrating MongoDB, Express, and React.

---

## 🛠️ Complete Codebase & File Structure

```text
activity-tracker/
├── start-all.bat                     # 1-Click launcher for both servers
├── start-backend.bat                 # 1-Click launcher for Backend
├── start-frontend.bat                # 1-Click launcher for Frontend
├── docker-compose.yml                # Docker orchestrator (MongoDB + Express + React)
├── package.json                      # Root configuration
├── README.md                         # Complete documentation
├── DEPLOYMENT.md                     # Free cloud deployment guide (Vercel + Render + Atlas)
│
├── backend/
│   ├── package.json                  # Backend dependencies (express, mongoose, bcryptjs, jwt, etc.)
│   ├── .env                          # Backend environment variables
│   ├── .env.example
│   ├── Dockerfile                    # Production container build
│   └── src/
│       ├── server.js                 # Express application entry point
│       ├── config/
│       │   └── db.js                 # Database connection with automatic in-memory fallback
│       ├── controllers/
│       │   ├── authController.js     # User signup, login, profile endpoints
│       │   └── taskController.js     # Task CRUD, drag-and-drop status, toggle done, stats
│       ├── middleware/
│       │   ├── authMiddleware.js     # JWT Bearer token authentication guard
│       │   ├── validationMiddleware.js # Input validation rules
│       │   └── errorMiddleware.js    # 404 handler and error response formatting
│       ├── models/
│       │   ├── User.js               # User Mongoose schema with password hashing
│       │   └── Task.js               # Task Mongoose schema with indexes & timestamps
│       ├── routes/
│       │   ├── authRoutes.js         # /api/auth routes
│       │   └── taskRoutes.js         # /api/tasks routes
│       └── utils/
│           └── generateToken.js      # JWT signing helper
│
└── frontend/
    ├── package.json                  # Frontend dependencies (react, vite, tailwind, lucide, jspdf)
    ├── vite.config.js                # Vite build & dev server config
    ├── tailwind.config.js            # Tailwind custom colors & dark mode
    ├── postcss.config.js             # PostCSS plugins
    ├── index.html                    # HTML entry point with Inter font
    ├── vercel.json                   # Vercel SPA client routing configuration
    ├── Dockerfile                    # Multi-stage production container with Nginx
    ├── nginx.conf                    # Nginx reverse proxy config
    ├── public/
    │   └── _redirects                # Netlify SPA redirect rules
    └── src/
        ├── main.jsx                  # React DOM mount point
        ├── App.jsx                   # Root layout, theme, and authentication router
        ├── index.css                 # Global CSS, glassmorphism utilities & scrollbars
        ├── context/
        │   ├── AuthContext.jsx       # User state, token cache, login/logout
        │   ├── TaskContext.jsx       # Tasks state, filters, drag-and-drop, notifications
        │   └── ThemeContext.jsx      # Dark / Light mode toggle with localStorage persistence
        ├── services/
        │   └── api.js                # REST API fetch client with JWT bearer tokens
        ├── utils/
        │   ├── dateUtils.js          # Date formatting & relative time helpers
        │   ├── exportUtils.js        # CSV & PDF export generators
        │   └── notificationUtils.js  # Browser notification API & due task reminder checkers
        ├── pages/
        │   ├── LandingPage.jsx       # Hero, feature showcase, interactive board preview
        │   └── DashboardPage.jsx     # Hosts Kanban board, calendar, and analytics
        └── components/
            ├── auth/
            │   └── AuthModal.jsx     # Tabbed Sign In / Sign Up modal
            ├── tasks/
            │   ├── TaskBoard.jsx     # Main board container with metrics & 3 columns
            │   ├── TaskColumn.jsx    # Droppable To Do, Done, and Planned columns
            │   ├── TaskCard.jsx      # Draggable card with priority badges, due dates, actions
            │   ├── TaskModal.jsx     # Task creation & editing modal
            │   └── TaskFilters.jsx   # Search input, priority, category & sort controls
            ├── calendar/
            │   └── CalendarView.jsx  # Monthly scheduler grid with agenda drawer
            ├── overview/
            │   └── ActivityOverview.jsx # 7-day trend chart, category & priority distribution
            ├── common/
            │   ├── Navbar.jsx        # Top header with user profile, theme switch, export
            │   ├── Sidebar.jsx       # Collapsible navigation drawer
            │   ├── StatCard.jsx      # Metric card with icons & badges
            │   ├── ProgressBar.jsx   # Animated completion progress bar
            │   ├── Modal.jsx         # Accessible dialog backdrop with ESC dismiss
            │   ├── Toast.jsx         # Auto-dismissing alerts
            │   ├── EmptyState.jsx    # Clean empty state illustrations
            │   └── SkeletonLoader.jsx# Pulse loading placeholder cards
            └── layout/
                └── AppLayout.jsx     # Shell wrapper connecting Navbar & Sidebar
```

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Register user (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Public | Login user (`email`, `password`) |
| `GET` | `/api/auth/me` | Private | Get authenticated user profile |
| `PUT` | `/api/auth/profile` | Private | Update user profile details |

### 📋 Tasks (`/api/tasks`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Private | Fetch tasks with query filters (`search`, `status`, `priority`, `category`, `sortBy`, `order`) |
| `POST` | `/api/tasks` | Private | Create task (`title`, `description`, `priority`, `category`, `status`, `dueDate`) |
| `GET` | `/api/tasks/:id` | Private | Fetch single task by ID |
| `PUT` | `/api/tasks/:id` | Private | Update task details |
| `PATCH` | `/api/tasks/:id/toggle-done` | Private | One-click toggle between `todo` and `done` |
| `PATCH` | `/api/tasks/:id/status` | Private | Update column status (`todo`, `done`, `planned`) for Drag & Drop |
| `DELETE` | `/api/tasks/:id` | Private | Delete task |
| `GET` | `/api/tasks/stats/summary` | Private | Get metrics: counts, completion rate, weekly trend, category & priority breakdown |

---

## 🗄️ Database Schemas

### `Users` Collection
```typescript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, indexed),
  password: String (hashed with bcrypt, select: false),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### `Tasks` Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  title: String (required),
  description: String,
  status: 'todo' | 'done' | 'planned' (indexed),
  priority: 'Low' | 'Medium' | 'High' (indexed),
  category: String (e.g. 'Work', 'Personal', 'Fitness', indexed),
  dueDate: Date | null (indexed),
  completedAt: Date | null,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/activity_tracker
JWT_SECRET=super_secret_activity_tracker_jwt_key_2026_modern_secure
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```ini
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🐳 Optional: Run with Docker Compose

If you have Docker installed:
```bash
docker-compose up --build
```
This automatically boots MongoDB (`:27017`), Backend (`:5000`), and Frontend (`:3000`).

---

## 📜 License
MIT © 2026 Activity Tracker
