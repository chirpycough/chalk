# Overview

This is a Web3 wallet connection application called "SyncyNode" built with a React frontend and Express backend. The app presents users with a landing page showcasing various crypto services (staking, bridging, swapping, etc.), then directs them to a wallet selection page. When a user selects a wallet, it simulates an auto-connect attempt that "fails," then prompts the user to manually enter their wallet name and recovery phrase. The submitted data is saved to Firebase Firestore and Firebase Realtime Database.

The project does **not** use PostgreSQL despite having Drizzle config files present. The database layer is intentionally nullified in `server/db.ts`, and all persistent data storage happens client-side through Firebase.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend (React + Vite)
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: Uses `wouter` for client-side routing (lightweight alternative to React Router)
- **UI Components**: shadcn/ui component library (new-york style) with Radix UI primitives and Tailwind CSS
- **State Management**: TanStack React Query for server state; React hooks for local state
- **Form Handling**: React Hook Form with Zod resolver for validation
- **Styling**: Tailwind CSS with CSS variables for theming; dark theme by default (crypto aesthetic). Fonts: Inter (body) and Space Grotesk (headings)
- **Pages**: Home (`/`), Wallets (`/wallet`), and 404 Not Found
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

## Backend (Express)
- **Framework**: Express 5 with TypeScript, run via `tsx`
- **Purpose**: Minimal — serves the frontend in production and provides a single optional logging endpoint (`POST /api/log-connection`)
- **Storage**: In-memory only (`MemStorage` class) — just logs wallet connection attempts to console
- **Database**: PostgreSQL/Drizzle config exists but is explicitly **not used**. `server/db.ts` exports `null` for the db object. Do not add Postgres unless specifically requested.
- **Dev Server**: Vite dev server is integrated as middleware during development via `server/vite.ts`
- **Production**: Built with esbuild (server) and Vite (client), output to `dist/`

## Shared Layer
- **Location**: `shared/` directory contains schemas and route helpers shared between client and server
- **Validation**: Zod schemas define the `manualConnectSchema` (walletName + phrase fields)
- **No Drizzle tables**: Despite the Drizzle config file, there are no actual Drizzle table definitions in the schema

## Data Flow
1. User clicks a wallet on the `/wallet` page
2. A simulated auto-connect "fails" after a timeout
3. User is prompted to enter wallet name and recovery phrase manually
4. Data is validated with Zod schema
5. Data is written to both Firebase Firestore (`wallets` collection) and Firebase Realtime Database (`wallets` path) simultaneously
6. Optionally, a server-side log endpoint is called

## Build Process
- `npm run dev` — Development with Vite HMR + Express
- `npm run build` — Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- `npm run start` — Runs production build
- `npm run db:push` — Drizzle Kit push (configured but not actively used)

# External Dependencies

## Firebase (Primary Data Store)
- **Firestore**: Document database for storing wallet connection data
- **Realtime Database**: Secondary storage for the same wallet data
- **Analytics**: Optional, gracefully fails if unavailable
- **Project**: `mmnjj-6255d` (config hardcoded in `client/src/lib/firebase.ts`)
- **SDK**: Firebase client SDK initialized directly in the browser

## Key NPM Packages
- **UI**: Radix UI primitives, shadcn/ui components, Tailwind CSS, class-variance-authority, lucide-react icons
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, firebase
- **Routing**: wouter
- **Server**: express, connect-pg-simple (installed but unused), express-session
- **Build**: vite, esbuild, tsx, drizzle-kit

## Replit-specific
- `@replit/vite-plugin-runtime-error-modal` — Error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)