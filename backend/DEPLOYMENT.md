# Insights Backend — Render Deployment Guide

> **Stack**: Spring Boot 4.0.6 · Java 17 · PostgreSQL (Supabase) · Docker · Render

---

## Table of Contents

1. [Required Environment Variables](#1-required-environment-variables)
2. [Database Setup — Supabase Transaction Pooler](#2-database-setup--supabase-transaction-pooler)
3. [Docker Build & Local Smoke-Test](#3-docker-build--local-smoke-test)
4. [Render Deployment Steps](#4-render-deployment-steps)
5. [Vercel Frontend Configuration](#5-vercel-frontend-configuration)
6. [Health & Readiness Endpoints](#6-health--readiness-endpoints)
7. [Production Startup Checklist](#7-production-startup-checklist)
8. [Troubleshooting Guide](#8-troubleshooting-guide)

---

## 1. Required Environment Variables

Set every variable below in **Render → Web Service → Environment tab**.
Never commit these values to git.

| Variable | Required | Description | Example |
|---|---|---|---|
| `DB_URL` | ✅ | JDBC URL using the **Transaction Pooler** (port 6543) — see Section 2 | `jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres` |
| `DB_USERNAME` | ✅ | Database username | `postgres.yourprojectref` |
| `DB_PASSWORD` | ✅ | Database password | `YourSecurePassword` |
| `JWT_SECRET` | ✅ | Supabase JWT secret (Supabase → Settings → API → JWT Secret) | `your-supabase-jwt-secret` |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key | `AIza...` |
| `FRONTEND_URL` | ✅ | Full Vercel URL — no trailing slash, no wildcard | `https://your-app.vercel.app` |
| `SPRING_PROFILES_ACTIVE` | ✅ | Must be `prod` | `prod` |
| `PORT` | ⚙️ Auto | Injected by Render — do **not** set this manually | `10000` |

> **Important**: If `SPRING_PROFILES_ACTIVE` is missing, the Docker image defaults to `prod`
> (set via `ENV` in the Dockerfile). But always set it explicitly to be safe.

---

## 2. Database Setup — Supabase Transaction Pooler

### Why Transaction Pooler (port 6543) — NOT Session Pooler (port 5432)

Supabase offers two pooler modes:

| Mode | Port | Behaviour | Max connections (free tier) |
|---|---|---|---|
| **Session mode** | 5432 | Each app connection = 1 Postgres server connection | **15 total** |
| **Transaction mode** | 6543 | Connections shared between transactions | Much higher |

**HikariCP opens `minimum-idle` connections on startup** (configured to 1 in production).
Using Session mode with even a small pool plus Render's restart retries can immediately exhaust
the 15-connection cap, causing `EMAXCONNSESSION` — which crashes the app.

**Always use the Transaction Pooler (port 6543) for production.**

### 2a. Get the correct Transaction Pooler URL

1. Go to **Supabase Dashboard → Settings → Database**
2. Scroll to **Connection Pooling**
3. Select **Transaction** mode
4. Copy the **Connection string**
5. Convert to JDBC format:

```
# Supabase shows (postgres:// URI):
postgres://postgres.vmjotcaqpskxatllmdag:[PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres

# Convert to JDBC format for DB_URL (replace postgres:// with jdbc:postgresql://):
jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres
```

Set `DB_URL` in Render to the JDBC format.
Set `DB_USERNAME` to `postgres.vmjotcaqpskxatllmdag` (or your actual project ref).

> **Note on prepared statements**: Transaction Pooler (PgBouncer) does not support
> prepared statements in transaction mode. The production config already disables
> them via `prepareThreshold=0` in HikariCP data source properties.

### 2b. Schema management

Hibernate `ddl-auto=update` will **automatically create or alter tables** on startup.
No manual SQL migrations are required.

---

## 3. Docker Build & Local Smoke-Test

Run these commands locally before pushing to Render to confirm the image builds and starts.

```bash
cd backend

# Build the image
docker build -t insights-backend:latest .

# Run with all required env vars
docker run --rm -p 8080:8080 \
  -e DB_URL="jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres" \
  -e DB_USERNAME="postgres.yourref" \
  -e DB_PASSWORD="your-password" \
  -e JWT_SECRET="your-supabase-jwt-secret" \
  -e GEMINI_API_KEY="your-gemini-key" \
  -e FRONTEND_URL="http://localhost:5173" \
  insights-backend:latest

# In a second terminal:
curl http://localhost:8080/health
# Expected: {"status":"UP"}

curl http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

> Note: When running the image locally without `-e SPRING_PROFILES_ACTIVE=dev`,
> it will use `prod` profile (the Docker image default). That means no SQL logging
> and quiet logs — which is correct for testing the production image locally.

---

## 4. Render Deployment Steps

### 4a. Create a new Web Service

1. Log in to [render.com](https://render.com)
2. **New → Web Service**
3. Connect your GitHub repository (`Insights`)
4. Configure:

| Setting | Value |
|---|---|
| **Name** | `insights-backend` |
| **Region** | Match your Supabase region |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | **Docker** |
| **Dockerfile Path** | `./Dockerfile` |
| **Instance Type** | Free or Starter (512 MB RAM minimum) |

### 4b. Set environment variables

In the **Environment** tab, add all variables from [Section 1](#1-required-environment-variables):

```
SPRING_PROFILES_ACTIVE  =  prod
DB_URL                  =  jdbc:postgresql://...supabase.com:6543/postgres
DB_USERNAME             =  postgres.yourref
DB_PASSWORD             =  YourPassword
JWT_SECRET              =  (from Supabase → Settings → API → JWT Secret)
GEMINI_API_KEY          =  AIza...
FRONTEND_URL            =  https://your-app.vercel.app
```

### 4c. Configure the health check

**Render → Settings → Health & Alerts:**

| Setting | Value |
|---|---|
| **Health Check Path** | `/health` |
| **Health Check Timeout** | `120` seconds (JVM + DB schema validation on cold start can be slow) |

### 4d. Deploy

Click **Deploy**. Render will build the Docker image and start the container.
Watch the logs for:
```
INFO  c.d.insights.BackendApplication  : The following 1 profile is active: "prod"
INFO  com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Start completed.
INFO  c.d.insights.BackendApplication  : Started BackendApplication
```

### 4e. Verify after deployment

```bash
BASE=https://your-service.onrender.com

# Health check
curl $BASE/health
# → {"status":"UP"}

# Actuator
curl $BASE/actuator/health
# → {"status":"UP"}

# Auth sync (public endpoint)
curl -X POST $BASE/auth/sync \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-uuid","userName":"test","email":"test@test.com"}'
# → 200 OK
```

---

## 5. Vercel Frontend Configuration

### 5a. Set the backend URL in Vercel

Go to your **Vercel project → Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `VITE_API_URL` *(or whatever your frontend uses)* | `https://your-service.onrender.com` |

In your React/Vite app:
```js
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
```

### 5b. CORS — exact URL matching

The `FRONTEND_URL` on Render must **exactly** match the origin the browser sends:
- ✅ `https://your-app.vercel.app` (correct)
- ❌ `https://your-app.vercel.app/` (trailing slash — will fail CORS)
- ❌ `http://your-app.vercel.app` (wrong scheme — must be https)

For **Vercel preview deployments** (branch deploys), the URL is different per branch.
Add those URLs to the `ALLOWED_ORIGINS` env var (comma-separated):
```
ALLOWED_ORIGINS = https://your-app.vercel.app,https://your-app-git-dev.vercel.app
```

---

## 6. Health & Readiness Endpoints

| Endpoint | Auth | Response | Purpose |
|---|---|---|---|
| `GET /health` | ❌ No JWT | `{"status":"UP"}` | Render HTTP health check |
| `GET /actuator/health` | ❌ No JWT | `{"status":"UP"}` | Spring Actuator (includes DB check) |
| `GET /actuator/health/liveness` | ❌ No JWT | `{"status":"UP"}` | Liveness probe |
| `GET /actuator/health/readiness` | ❌ No JWT | `{"status":"UP"}` | Readiness probe |
| `GET /actuator/info` | ❌ No JWT | `{}` | App info (empty by default) |

All other Actuator endpoints (env, beans, mappings, metrics) are **disabled**.

---

## 7. Production Startup Checklist

- [ ] `DB_URL` uses **Transaction Pooler** (port `6543`), NOT Session Pooler (port `5432`)
- [ ] `DB_URL` starts with `jdbc:postgresql://` (not `postgres://`)
- [ ] `SPRING_PROFILES_ACTIVE` = `prod` is set in Render
- [ ] `FRONTEND_URL` exactly matches your Vercel URL (https, no trailing slash)
- [ ] `JWT_SECRET` matches Supabase Dashboard → Settings → API → JWT Secret
- [ ] Health check path is `/health`, timeout is at least `120` seconds
- [ ] Render logs show `profile is active: "prod"` (not "dev")
- [ ] Render logs show `HikariPool-1 - Start completed` (not `EMAXCONNSESSION`)
- [ ] No `.env` file committed to git

---

## 8. Troubleshooting Guide

### `EMAXCONNSESSION` / max clients reached

**Cause**: Using the Session Pooler (port 5432) — Supabase caps this at 15 connections.
HikariCP was opening more connections than the cap allows.

**Fix**:
1. Change `DB_URL` to use port `6543` (Transaction Pooler)
2. Ensure `SPRING_PROFILES_ACTIVE=prod` is set (prod profile limits pool to 3 connections)

---

### `Unable to determine Dialect without JDBC metadata`

**Cause**: Cascade from a DB connection failure — Hibernate 7.x couldn't connect to read
metadata, so it couldn't auto-detect PostgreSQL dialect.

**Fix**: Already resolved in code — `spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect`
is now set in `application.properties`. The dialect is known before any connection attempt.
If this error still appears, the real problem is the DB connection itself (see above).

---

### Profile shows `"dev"` in Render logs

**Cause**: `SPRING_PROFILES_ACTIVE` was not set in Render's environment variables.

**Fix**:
1. Go to Render → Service → Environment
2. Add `SPRING_PROFILES_ACTIVE` = `prod`
3. Redeploy

> Note: The Dockerfile now bakes `ENV SPRING_PROFILES_ACTIVE=prod` as a fallback.
> If Render's env var is missing, the Docker default protects you. But always set it explicitly.

---

### CORS error in browser (`No 'Access-Control-Allow-Origin'`)

**Cause**: `FRONTEND_URL` doesn't exactly match the origin the browser is sending.

**Diagnosis**: Check the Render startup logs — the app now logs:
```
INFO  CorsConfig  : CORS: primary origin = https://your-app.vercel.app
INFO  CorsConfig  : CORS: allowed origins = [https://your-app.vercel.app]
```
Compare with the `Origin:` header in the browser's failing request (Network tab → preflight).

**Fix**:
1. Ensure `FRONTEND_URL` in Render matches exactly (https, no trailing slash)
2. For preview deploys, add their URLs to `ALLOWED_ORIGINS`

---

### 401 Unauthorized on API calls that should be public

**Cause**: The JWT filter allows most business endpoints through without a token,
but the request URL might not match the whitelist exactly.

**Whitelisted (no JWT needed)**:
- `/auth/**`, `/workspace/**`, `/canvas/**`, `/component/**`, `/edge/**`
- `/ai/**`, `/health`, `/actuator/health`, `/actuator/health/**`

---

### Health check fails — service stuck in `Starting`

**Cause**: JVM startup + DB schema validation takes longer than the health check timeout.

**Fix**: Increase the Render health check timeout to `120` seconds (Render → Settings → Health Check Timeout).

---

### `Invalid prepared statement` / `ERROR: prepared statement does not exist`

**Cause**: Using Transaction Pooler (port 6543) with prepared statements enabled.
PgBouncer in transaction mode does not support prepared statements.

**Fix**: Already resolved — `prepareThreshold=0` is set in `application-prod.properties`.
If it appears again, verify the production profile is actually active in Render logs.

---

### OOM-killed / `ExitOnOutOfMemoryError`

**Cause**: JVM heap exceeded container RAM.

**Fix**: The Dockerfile sets `-XX:MaxRAMPercentage=75.0`. Upgrade to Render Starter
(1 GB) for production. The `-XX:+ExitOnOutOfMemoryError` flag makes the container
crash-fast so Render restarts it immediately rather than limping along.

---

### Gemini `/ai/analyze` returns 500

**Cause**: Invalid, expired, or rate-limited `GEMINI_API_KEY`.

**Fix**:
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Generate a new API key
3. Update `GEMINI_API_KEY` in Render → Environment → redeploy

---

### Slow cold starts on Render Free tier

**Cause**: Render Free tier spins down services after 15 minutes of inactivity.

**Fix**: Upgrade to Starter (always-on), or configure an external uptime monitor
(e.g. UptimeRobot) to ping `GET /health` every 10 minutes.
