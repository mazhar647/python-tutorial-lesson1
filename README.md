# Lesson 3 - Dockerized Frontend + Backend

A minimal two-service app demonstrating container-to-container communication with Docker Compose.

- **backend** — Flask API (`backend/app.py`) that reads names from `backend/names.txt` and serves them at `/api`.
- **frontend** — Express + EJS app (`frontend/app.js`) that fetches data from the backend and renders it at `/`.

## Project structure

```
.
├── backend/
│   ├── app.py
│   ├── business.py
│   ├── names.txt
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app.js
│   ├── package.json
│   ├── views/index.ejs
│   └── Dockerfile
└── docker-compose.yaml
```

## Running with Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

Stop with:

```bash
docker compose down
```

## Networking notes

Both services run on the `ares-network` bridge network defined in `docker-compose.yaml`. The frontend reaches the backend using the **service name** as the hostname:

```
BACKEND_URL=http://backend:8000/api
```

Docker's embedded DNS resolves containers by service name (and container name) on a user-defined network — not by the `hostname:` field, which only sets the hostname *inside* that container.

## Running standalone (without Docker)

**Backend**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Frontend**
```bash
cd frontend
npm install
BACKEND_URL=http://localhost:8000/api npm start
```
