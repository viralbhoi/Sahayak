# ⚡ Sahayak: Intelligent On-Demand Service Marketplace

Sahayak is a full-stack, location-based marketplace that dynamically connects clients with skilled local workers. Built with a focus on algorithmic matching and frictionless user experience, it features role-based workflows, real-time-simulated job feeds, and secure OTP authentication.

---

## 🚀 The Core Problem Solved

Traditional job boards are static and slow. Sahayak acts as a smart dispatcher. When a client requests a service (e.g., a plumber in a specific area), the platform's custom matching engine instantly queries the database using spatial and array-based intersections to push the job directly to eligible, available workers in that exact locale.

---

## 🛠 Tech Stack & Architecture

### Frontend
- React.js (Vite)
- Tailwind CSS (Custom earthy UI theme utilizing `amber` and `stone` palettes)
- Lucide React (Consistent iconography)
- Axios & React Router

### Backend
- Node.js & Express.js (REST API architecture)
- PostgreSQL (Relational data & native array operators)
- node-postgres (`pg`) (Database pooling and querying)
- JSON Web Tokens (JWT) (Stateless authorization)

---

## ⚙️ Technical Highlights

### 🔹 The Matching Engine
Bypassed heavy relational `JOIN`s for skills by utilizing PostgreSQL's native `text[]` arrays.  
The matching algorithm leverages the `@>` (contains) operator alongside spatial filters (city/area) to execute highly performant worker-to-job intersections.

### 🔹 Role-Based Access Control (RBAC)
Custom middleware intercepts requests to strictly isolate Client and Worker routes, preventing data leaks and unauthorized state mutations.

### 🔹 Passwordless Authentication
Engineered an OTP-based login flow, optimized for a demographic that prefers mobile-first, frictionless entry over traditional email/password management.

### 🔹 Dynamic Analytics
Real-time dashboard aggregations computing completion rates, moving-average worker ratings, and active job statuses via optimized SQL functions.

---

## 🌟 Key Features

### 👤 For Clients
- Instant Job Posting — Specify required skills, location, and details.
- Algorithmic Dispatch — Jobs are immediately routed to qualified workers.
- Match Viewing & Contact — View accepted workers, check ratings, and initiate calls via native `tel:` routing.
- Rating System — Rate workers upon job completion.

### 🧰 For Workers
- Dynamic Profile — Manage an active array of skills and toggle availability.
- Live Job Feed — Localized feed of incoming requests matching the worker’s skillset and city.
- Task Management — Accept jobs, view client contact information, and mark assignments as completed to boost ratings.

---

## 💻 Local Setup & Installation

### ✅ Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally

---

### 1️⃣ Database Setup

Create a new PostgreSQL database named `sahayak`.

Execute the master schema script to initialize tables:

```bash
psql -U your_postgres_user -d sahayak -f backend/db.SQL
````

---

### 2️⃣ Backend Initialization

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sahayak
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_here
```

Start backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Initialization

```bash
cd frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 📈 Future Improvements

* Real-time WebSocket based job dispatching
* Geo-distance matching using PostGIS
* Push notifications for workers
* Production Docker deployment

---

## 👨‍💻 Author

<a href="https://www.linkedin.com/in/viralbhoi/" target="_blank"> **Viral Bhoi** </a>

Computer Engineering Undergraduate

Passionate about full-stack development, scalable backend systems, and competitive programming.

