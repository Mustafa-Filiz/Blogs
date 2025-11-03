## Purpose

This file gives actionable, project-specific guidance to an AI coding agent (Copilot-like) so it can be productive immediately in this repo.

## Quick run (dev)

- Backend: cd `backend` → `npm install` → ensure Postgres is available (see docker-compose) → `npm run dev` (starts on port 8000 by default).
- Frontend: cd `frontend` → `npm install` → `npm run dev` (Next.js on port 3000).

If you need a local DB quickly: from repo root run `docker-compose` in `backend` (file: `backend/docker-compose.yml`) to start Postgres, then start the backend.

## Important environment variables

- `JWT_SECRET` — required by `backend/src/utils/jwt.ts` (used for sign/verify). Failure to set will throw on token ops.
- `FRONTEND_URL` — used by backend CORS (server in `backend/src/server.ts`).
- `NEXT_PUBLIC_API_URL` — optional on frontend; default is `http://localhost:8000/api` (see `frontend/lib/api-utils.ts`).
- Postgres envs: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` (docker-compose provides defaults).

## High-level architecture

- Backend: TypeScript Express + Sequelize (folder `backend/src`). Entry: `backend/src/server.ts`.
  - Routes live under `backend/src/routes/*` and are mounted under `/api` (see `server.ts`).
  - Controllers in `backend/src/controllers/*` call service layer in `backend/src/services/*` and use models in `backend/src/database/models/*`.
  - Shared types in `backend/src/types/*` and helpers in `backend/src/utils/*` (error classes in `utils/errors.ts`, `catchAsync` wrapper, JWT helpers).
- Frontend: Next.js app (app dir) — client/server fetch helpers in `frontend/lib/api-utils.ts`. The frontend calls backend APIs under `/api` and expects cookies (credentials included).

## Auth & API contract notes (critical)

- Authentication is cookie-based JWT. Cookie name is `blogsAppToken` (see `backend/src/constants/index.ts`).
- Tokens are created in `UserControllers.ts` via `generateToken()` and set with `res.cookie(..., httpOnly:true, sameSite:'strict')`.
- Protected routes use `requireAuth` middleware (`backend/src/utils/requireAuth.ts`) which reads the cookie and populates `req.user` (type `AuthRequest`).
- Frontend helpers use `credentials: 'include'` (see `frontend/lib/api-utils.ts`) — ensure cookie scope and CORS origin match when testing.

## DB notes & caution

- The backend calls `sequelize.sync({ alter: true })` at startup (`backend/src/server.ts`). This will alter tables automatically. Understand this before running against production data.
- There is a small mismatch to watch: `backend/src/database/sequelize.ts` and `backend/src/database/db.config.ts` reference `example_db` while `backend/docker-compose.yml` sets `POSTGRES_DB: blogs_db`. Confirm intended DB name in env or config before running.

## Common code patterns

- Controllers use `catchAsync` (`utils/catchAsync.ts`) to forward async errors to the central `errorHandler` (`utils/errors.ts`). Follow the pattern for new routes.
- Business logic belongs in `services/*`. Controllers should be thin and only handle request/response and validation.
- Use types from `backend/src/types/*` for request/response shapes (e.g., `User`, `Post`, etc.).

## Where to look for examples

- Protected endpoint example: `backend/src/routes/LikeRoutes.ts` (uses `requireAuth` via route registration in `routes/index.ts`).
- Login/signup flow: `backend/src/controllers/UserControllers.ts` and client calls in `frontend/lib/api-utils.ts`.
- DB models and conventions: `backend/src/database/models/*` (underscored naming, freezeTableName true — see `sequelize.ts`).

## Small actionable tasks an AI agent can do safely

- Add a new controller + service + route following existing names and the `catchAsync` pattern.
- Fix frontend API URLs by referencing `NEXT_PUBLIC_API_URL` in `frontend/lib/api-utils.ts` if needed.
- Add an environment check or descriptive error when `JWT_SECRET` is missing (already thrown by `utils/jwt.ts`) — you can enrich the message or docs.

## Files worth opening when working here

- `backend/src/server.ts`, `backend/src/routes/index.ts`, `backend/src/controllers/UserControllers.ts`, `backend/src/utils/jwt.ts`, `backend/src/utils/requireAuth.ts`, `backend/src/database/sequelize.ts`, `backend/docker-compose.yml`, `frontend/lib/api-utils.ts`, `frontend/next.config.ts`.

## Final notes

- Keep changes consistent with the existing service/controller/service separation and the cookie-based auth flow. Prefer small, incremental edits, and run the backend (`npm run dev`) and frontend (`npm run dev`) together to verify end-to-end behavior.

---

If any of these areas are unclear or you'd like additional examples (e.g., a sample protected route patch), tell me which part and I will iterate.
