# Task Management Web App

Modern task manager built as part of a frontend developer assignment. The project consists of a React + Vite client styled with Tailwind CSS and a Node.js/Express backend backed by MongoDB. Users can sign up, sign in, manage tasks (CRUD), filter/search, and view dashboard stats inside protected routes.

## Features

- JWT authentication with secure cookie storage.
- Responsive dashboard with sticky sidebar on desktop and hamburger-driven drawer on mobile.
- Task CRUD: create, edit, delete, and manage tasks via a shared modal.
- Filters: status, priority, due date, and live title search powered by Redux state.
- Profile view, logout flow, toast notifications, and loading guards.
- Server-side validation, error handling, and hashed passwords via bcrypt.

## Tech Stack

| Layer    | Tools |
| -------- | ----- |
| Frontend | React 18, Vite, Tailwind CSS, Redux Toolkit, React Router, Axios |
| Backend  | Node.js, Express, MongoDB (Mongoose), JSON Web Tokens, bcrypt |
| Tooling  | ESLint, React Hot Toast, Lucide Icons |

## Folder Structure

```
task-management/
├─ client/          # React app (Vite)
│  ├─ src/
│  │  ├─ Components/
│  │  ├─ Pages/
│  │  ├─ store/
│  │  └─ utils/
├─ server/          # Express API
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ middlewares/
│  │  ├─ models/
│  │  └─ routes/
└─ README.md
```

## Prerequisites

- Node.js ≥ 18
- MongoDB instance (Atlas or local)

## Environment Variables

### Client (`client/.env`)
```
VITE_MODE=development
VITE_BACKEND_URL=https://<production-backend-domain>
```

### Server (`server/.env`)
```
PORT=5000
MONGO_URI=<mongodb-connection-string>
JWT_SECRET=<secure-random-string>
CLIENT_URL=http://localhost:5173
```

## Local Setup

```bash
# install dependencies
npm install        # optional: only if using workspaces
cd client && npm install
cd ../server && npm install

# run backend (http://localhost:5000)
cd server
npm run dev

# run frontend (http://localhost:5173)
cd ../client
npm run dev
```

Both servers must be running for full functionality.

## Production Notes

- Deploy backend (Render/Railway/Vercel) with HTTPS and CORS allowing the frontend origin.
- Deploy frontend (Vercel/Netlify) and set `VITE_BACKEND_URL` to the deployed API base URL.
- Regenerate JWT secret and Mongo credentials for production usage.
- Add rate limiting, logging, and monitoring (e.g., Winston, Morgan, Sentry) before scaling.

## API Overview

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/user/signup`   | Register new user           |
| POST   | `/api/user/login`    | Authenticate user           |
| GET    | `/api/user/profile`  | Fetch authenticated profile |
| GET    | `/api/user/check-auth` | Validate session          |
| POST   | `/api/task/create`   | Create task                 |
| GET    | `/api/task/get-tasks`| List tasks by user          |
| PUT    | `/api/task/edit/:id` | Update task                 |
| DELETE | `/api/task/delete/:id` | Delete task               |

*Postman collection lives in `postman-collection/task-management.postman_collection.json`.*

## Scaling Recommendations

- Containerize both services (Docker) and use a reverse proxy (NGINX/Traefik) for TLS termination.
- Introduce feature-based folder modules in both client and server to ease growth.
- Swap Redux store persistence with RTK Query or SWR for large-scale data fetching.
- Add background workers/queues (BullMQ) for heavy tasks.
- Implement E2E tests (Playwright/Cypress) and CI pipelines before production release.

## License

MIT © 2025 Task Management Team
