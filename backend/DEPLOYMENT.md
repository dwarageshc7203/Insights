# Insights Backend — Render Deployment Guide

> **Stack**: Spring Boot 4.0.6 · Java 17 · PostgreSQL (Supabase) · Docker · Render

---

## Table of Contents

1. [Required Environment Variables](#1-required-environment-variables)
2. [Database Setup (Supabase PostgreSQL)](#2-database-setup-supabase-postgresql)
3. [Docker Build & Local Smoke-Test](#3-docker-build--local-smoke-test)
4. [Render Deployment Steps](#4-render-deployment-steps)
5. [Vercel Frontend Configuration](#5-vercel-frontend-configuration)
6. [Health & Readiness Endpoints](#6-health--readiness-endpoints)
7. [Production Startup Checklist](#7-production-startup-checklist)
8. [Troubleshooting Guide](#8-troubleshooting-guide)

---

## 1. Required Environment Variables

Set every variable below in **Render → Environment** (Web Service → Environment tab).  
Never commit these values to git.

| Variable | Required | Description | Example |
|---|---|---|---|
| `DB_URL` | ✅ | Full JDBC URL for the PostgreSQL database | `jdbc:postgresql://db.xxx.supabase.co:5432/postgres` |
| `DB_USERNAME` | ✅ | Database username | `postgres.yourprojectref` |
| `DB_PASSWORD` | ✅ | Database password | `YourSecurePassword` |
| `JWT_SECRET` | ✅ | Supabase JWT secret (from Supabase → Settings → API → JWT Secret) | `your-supabase-jwt-secret` |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key | `AIza...` |
| `FRONTEND_URL` | ✅ | Full URL of the deployed Vercel frontend (no trailing slash) | `https://your-app.vercel.app` |
| `SPRING_PROFILES_ACTIVE` | ✅ | Spring profile to activate | `prod` |
| `PORT` | ⚙️ Auto | Injected by Render automatically — do **not** set manually | `10000` |

### How Render injects `PORT`

Render automatically sets the `PORT` environment variable for every web service.  
The app reads it via `server.port=${PORT:8080}` — no manual configuration needed.

---

## 2. Database Setup (Supabase PostgreSQL)

### 2a. Get your connection string

1. Go to **Supabase Dashboard → Settings → Database**
2. Copy the **Connection string (URI)** from the *Connection pooling* section
3. Change `postgres://` to `jdbc:postgresql://` for the JDBC format

```
# Supabase pooler URI (what Supabase shows)
postgres://postgres.vmjotcaqpskxatllmdag:[PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres

# JDBC format (what DB_URL expects)
jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres
```

### 2b. Schema management

Hibernate is configured with `spring.jpa.hibernate.ddl-auto=update` — it will  
**automatically create or update tables** on first startup. No manual SQL migrations needed.

### 2c. Allow Render's IPs (if using Supabase network restrictions)

If you have IP allowlisting enabled on Supabase, add Render's outbound IP ranges.  
Render's IPs: https://render.com/docs/static-outbound-ip-addresses

---

## 3. Docker Build & Local Smoke-Test

Run this before pushing to Render to verify the image builds and starts correctly.

```bash
cd backend

# Build the image
docker build -t insights-backend:latest .

# Run locally with all required env vars
docker run --rm -p 8080:8080 \
  -e DB_URL="jdbc:postgresql://your-host:5432/postgres" \
  -e DB_USERNAME="your-username" \
  -e DB_PASSWORD="your-password" \
  -e JWT_SECRET="your-supabase-jwt-secret" \
  -e GEMINI_API_KEY="your-gemini-api-key" \
  -e FRONTEND_URL="http://localhost:5173" \
  -e SPRING_PROFILES_ACTIVE="prod" \
  insights-backend:latest

# In a separate terminal — verify health endpoint responds
curl http://localhost:8080/health
# Expected: {"status":"UP"}

curl http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

---

## 4. Render Deployment Steps

### 4a. Create a new Web Service on Render

1. Log in to [render.com](https://render.com)
2. Click **New → Web Service**
3. Connect your GitHub repository (`Insights`)
4. Configure:

| Setting | Value |
|---|---|
| **Name** | `insights-backend` (or your preference) |
| **Region** | Choose closest to your Supabase region |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | **Docker** |
| **Dockerfile Path** | `./Dockerfile` |
| **Instance Type** | Free or Starter (512 MB RAM minimum recommended) |

### 4b. Set environment variables

In **Environment tab**, add every variable from [Section 1](#1-required-environment-variables).

```
SPRING_PROFILES_ACTIVE  =  prod
DB_URL                  =  jdbc:postgresql://...
DB_USERNAME             =  postgres.yourref
DB_PASSWORD             =  YourPassword
JWT_SECRET              =  your-jwt-secret
GEMINI_API_KEY          =  your-gemini-key
FRONTEND_URL            =  https://your-app.vercel.app
```

### 4c. Configure health check

In **Settings → Health & Alerts**:

| Setting | Value |
|---|---|
| **Health Check Path** | `/health` |
| **Health Check Timeout** | `60` seconds (allows time for JVM + DB connection on cold start) |

### 4d. Deploy

Click **Create Web Service**. Render will:
1. Clone the repository
2. Build the Docker image (`docker build -t ... ./backend`)
3. Push to Render's internal registry
4. Start the container with your environment variables injected
5. Poll `/health` until it returns `200 OK`

### 4e. Verify deployment

Once the service is `Live`, test your endpoints:

```bash
# Replace with your Render URL
BASE=https://insights-backend.onrender.com

curl $BASE/health
# → {"status":"UP"}

curl $BASE/actuator/health
# → {"status":"UP"}

curl -X POST $BASE/auth/sync \
  -H "Content-Type: application/json" \
  -d '{"userId":"...", "userName":"...", "email":"..."}'
# → 200 OK with user response
```

---

## 5. Vercel Frontend Configuration

Set the following environment variable in your **Vercel project → Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `VITE_API_URL` (or your frontend's API base URL var) | `https://insights-backend.onrender.com` |

In your Vite/React frontend, ensure API calls use the env variable, for example:
```js
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
```

**Important — CORS**: The backend's `FRONTEND_URL` env var must exactly match the Vercel  
deployment URL (including `https://`, no trailing slash). Vercel preview deployments have  
different URLs — if you use those, add them to `ALLOWED_ORIGINS` as comma-separated values.

---

## 6. Health & Readiness Endpoints

| Endpoint | Auth Required | Response | Purpose |
|---|---|---|---|
| `GET /health` | ❌ No | `{"status":"UP"}` | Render HTTP health check, simple uptime monitoring |
| `GET /actuator/health` | ❌ No | `{"status":"UP"}` | Spring Actuator health (DB connectivity included) |
| `GET /actuator/health/liveness` | ❌ No | `{"status":"UP"}` | Kubernetes-style liveness probe |
| `GET /actuator/health/readiness` | ❌ No | `{"status":"UP"}` | Kubernetes-style readiness probe |
| `GET /actuator/info` | ❌ No | `{}` | Application info (empty by default) |

> **Note**: All other Actuator endpoints (env, beans, mappings, etc.) are disabled for security.

---

## 7. Production Startup Checklist

Before going live, verify each item:

- [ ] All 7 environment variables are set in Render
- [ ] `SPRING_PROFILES_ACTIVE` is set to `prod`
- [ ] `FRONTEND_URL` exactly matches your Vercel URL (no trailing slash)
- [ ] `JWT_SECRET` matches the **JWT Secret** in Supabase Dashboard → Settings → API
- [ ] `DB_URL` uses the **pooler** connection string (port 5432), not the direct connection
- [ ] Health check path is set to `/health` in Render settings
- [ ] Docker build succeeds locally (`docker build -t test ./backend`)
- [ ] `GET /health` returns `{"status":"UP"}` locally with prod env vars
- [ ] No `.env` file committed to git

---

## 8. Troubleshooting Guide

### Application fails to start — `DB_URL not set`
**Cause**: Missing environment variable.  
**Fix**: Ensure `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` are set in Render's Environment tab.

---

### `Could not connect to database` / `Connection refused`
**Cause**: Wrong DB_URL format, or Supabase network restriction blocking Render.  
**Fix**:
1. Verify `DB_URL` starts with `jdbc:postgresql://` (not `postgres://`)
2. Use the **pooler** URL from Supabase (port 5432), not the direct connection URL (port 5432 direct may be blocked)
3. If Supabase IP restriction is on, allowlist Render's outbound IPs

---

### CORS error in browser (`No 'Access-Control-Allow-Origin'`)
**Cause**: `FRONTEND_URL` doesn't match the actual origin the browser sends.  
**Fix**:
1. Check `FRONTEND_URL` in Render matches exactly: `https://your-app.vercel.app` (no trailing `/`)
2. If using Vercel preview deploys, add the preview URL to `ALLOWED_ORIGINS` as a comma-separated addition

---

### 401 Unauthorized on API calls
**Cause**: `JWT_SECRET` mismatch between Supabase and the backend.  
**Fix**:
1. Go to Supabase → Settings → API → **JWT Secret**
2. Copy the full secret and paste into Render's `JWT_SECRET` env var
3. Redeploy the service

---

### Health check failing — service stuck in `Starting` state
**Cause**: JVM / DB startup time exceeds the health check timeout.  
**Fix**: Increase the health check timeout in Render → Settings → Health Check Timeout to at least **90 seconds**.

---

### `OutOfMemoryError` / container OOM-killed
**Cause**: JVM heap exceeds container RAM.  
**Fix**: The Dockerfile already sets `-XX:MaxRAMPercentage=75.0`. Upgrade the Render instance type from Free (512 MB) to Starter (1 GB) for production workloads.

---

### Gemini AI endpoint returns 500
**Cause**: Invalid or expired `GEMINI_API_KEY`.  
**Fix**:
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Generate a new API key
3. Update `GEMINI_API_KEY` in Render and redeploy

---

### Slow cold starts on Free tier
**Cause**: Render Free tier spins down inactive services after 15 minutes.  
**Fix**: Upgrade to the Starter plan (always-on), or use an external uptime monitor to ping `/health` every 10 minutes to prevent spin-down.
