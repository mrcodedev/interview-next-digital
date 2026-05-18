# Social App

A social network prototype built with React, Vite and TypeScript as part of a technical interview.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — bundler and dev server
- **React Router v6** — client-side routing
- **Tailwind CSS v4** — styling
- **Vitest** + **Testing Library** — unit and integration tests
- **ESLint** + **Prettier** — code quality and formatting
- **Docker** + **nginx** — containerized production build
- **GitHub Actions** — CI/CD pipeline

## Features

- 👥 User list with name, email, city, website and company
- 🙍 User detail page
- 🖼️ Album list with photo gallery and thumbnail preview
- ✅ TODO list per user with add, delete, toggle and reactive search
- 🕐 Recently visited albums — persisted across sessions via localStorage
- 🔍 Reactive TODO search filter (without implementing)
- ✏️ TODO validation — no numbers allowed in titles (without implementing)

## Getting started

### Requirements

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/mrcodedev/interview-next-digital.git
cd interview-next-digital

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.
