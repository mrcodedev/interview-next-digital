# Social App

[![CI](https://github.com/mrcodedev/interview-next-digital/actions/workflows/ci.yml/badge.svg)](https://github.com/mrcodedev/interview-next-digital/actions/workflows/ci.yml)
![Coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)
![Trivy](https://img.shields.io/badge/security-trivy%20enabled-blue)
![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker&logoColor=white)

A social network prototype built with React 19, Vite and TypeScript as part of a technical interview.

## Tech stack

| Layer                    | Technology                 |
| ------------------------ | -------------------------- |
| UI                       | React 19 + TypeScript      |
| Routing                  | React Router v7            |
| Styling                  | Tailwind CSS v4            |
| Bundler                  | Vite 8                     |
| Unit / Integration tests | Vitest 4 + Testing Library |
| E2E tests                | Playwright 1.60            |
| Linting / Formatting     | ESLint 10 + Prettier 3     |
| Containerisation         | Docker + nginx             |
| CI/CD                    | GitHub Actions             |

## Features

- **User list** — paginated list of users with name, email, city, website and company info
- **User detail** — profile card with initials avatar and info chips
- **Album list** — per-user albums with first-photo thumbnail preview
- **Photo gallery** — expandable photo grid inside each album
- **TODO list** — per-user task list loaded from the API, with:
  - Add new tasks (validated: text-only, no numbers)
  - Delete tasks
  - Toggle completion status
  - Reactive search filter
- **Recently visited albums** — shown on the home page, persisted across sessions via `localStorage`

## Project structure

```
src/
├── components/          # Domain-driven UI components
│   ├── albums/          # AlbumCard, AlbumList
│   ├── feedback/        # ErrorMessage, Spinner
│   ├── layout/          # Layout, Navbar wrapper
│   ├── media/           # PhotoWithFallback, FallbackPhoto
│   ├── navigation/      # Navbar
│   ├── todos/           # TodoList, TodoCreateForm, TodoItemsList, TodoSearchBar, TodoStats
│   └── users/           # UserCard, UserInfoChip, UserInitialsAvatar, UserTabs
├── context/             # RecentAlbumsContext (Provider + object)
├── hooks/               # useFetch, useRecentAlbums, useRecentAlbumsContext
├── pages/               # HomePage, UsersPage, UserDetailPage
└── types/               # Domain types: User, Album, Photo, Todo, common

config/                  # Vitest runner configurations (unit, integration, components)
docker/                  # nginx.conf for the production container
e2e/                     # Playwright end-to-end tests
scripts/                 # Cross-platform helper scripts (coverage open, test report)
```

## Getting started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Run locally

```bash
git clone https://github.com/mrcodedev/interview-next-digital.git
cd interview-next-digital
npm install
npm run dev          # http://localhost:5173
```

## Scripts

### Development

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server              |
| `npm run build`   | Type-check + production build      |
| `npm run preview` | Serve the production build locally |

### Quality gates

| Command                | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `npm run typecheck`    | TypeScript type checking (no emit)                |
| `npm run lint`         | ESLint                                            |
| `npm run lint:fix`     | ESLint with auto-fix                              |
| `npm run format`       | Prettier write                                    |
| `npm run format:check` | Prettier check                                    |
| `npm run check`        | typecheck + lint + unit tests + integration tests |
| `npm run check:strict` | check + format check + coverage                   |
| `npm run ci`           | check:strict + build (full local CI)              |

### Testing

| Command                      | Description                              |
| ---------------------------- | ---------------------------------------- |
| `npm run test`               | Run all Vitest tests once                |
| `npm run test:unit`          | Unit tests only                          |
| `npm run test:integration`   | Integration tests only                   |
| `npm run test:watch`         | Vitest in watch mode                     |
| `npm run test:ui`            | Vitest UI (browser dashboard)            |
| `npm run test:coverage`      | Full coverage report (thresholds: 80%)   |
| `npm run test:coverage:open` | Coverage report + open in browser        |
| `npm run test:report`        | Save timestamped coverage report to file |
| `npm run test:e2e`           | Playwright E2E tests (headless Chromium) |
| `npm run test:e2e:headed`    | E2E tests in headed mode                 |
| `npm run test:e2e:ui`        | Playwright interactive UI                |
| `npm run test:e2e:report`    | Open the last Playwright HTML report     |

### Test structure

```
src/
└── <domain>/
    └── __tests__/
        ├── Component.test.tsx            # Unit test
        └── integration/
            └── Component.integration.test.tsx  # Integration test

e2e/
├── mocks/api.ts          # Shared API mock data and route helpers
├── home.spec.ts
├── users.spec.ts
└── user-detail.spec.ts
```

Coverage is enforced at **80% minimum** (statements, branches, functions, lines) via Vitest thresholds. Current coverage is ~97%.

## Docker

### Build and run

```bash
# Build the image
docker build -t social-app .

# Run the container
docker run -p 8080:80 social-app

# Or use docker compose
docker compose up
```

The app will be available at `http://localhost:8080`.

The production image uses a **multi-stage build**: Node 20 Alpine compiles the app, then an nginx Alpine image serves the static output — keeping the final image minimal.

### Configuration

- `Dockerfile` — multi-stage build definition
- `docker-compose.yml` — local compose setup
- `docker/nginx.conf` — nginx server block (SPA routing + gzip + static asset caching)

## CI/CD

Three jobs run in sequence on every push (all branches) and on pull requests to `main` / `develop`:

```
ci  ──►  docker
    └──►  e2e
```

| Job      | What it does                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| `ci`     | typecheck · lint · unit tests · integration tests · coverage (Node 20 & 22) · build · upload coverage artifact |
| `docker` | Build Docker image · smoke-test the running container · push to GHCR on `main`                                 |
| `e2e`    | Install Playwright Chromium · run E2E tests · upload HTML report                                               |

Concurrency is configured to cancel in-progress runs on the same branch when a new push arrives.

## Git workflow

This project follows **Git Flow**:

- `main` — production-ready code only
- `develop` — integration branch, all features merge here first
- `feature/<name>` — individual feature branches off `develop`
- `fix/<name>` — bug-fix branches
- `release/<version>` — release preparation branches

## Commit convention

This repository enforces **Conventional Commits** through Husky + commitlint.

Commit format:

```text
type(scope): short summary in imperative mood
```

Common types:

- `feat` — new feature
- `fix` — bug fix
- `refactor` — code change without behavior change
- `test` — add/update tests
- `chore` — tooling, dependencies or maintenance
- `docs` — documentation only
- `ci` — CI/CD pipeline changes

Examples:

```text
feat(users): add profile tabs in user detail page
fix(todos): prevent numeric characters in new todo titles
refactor(docker): harden nginx and add healthcheck
ci(security): add trivy critical enforcement scans
```

Local hooks:

- `pre-commit` runs lint-staged
- `pre-push` runs full quality checks (`npm run check`)
- `commit-msg` validates message format with commitlint
