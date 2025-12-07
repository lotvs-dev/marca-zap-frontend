# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

MarcaZap is a SaaS application for automated appointment scheduling via WhatsApp for independent professionals. The frontend is built with React 19, TypeScript, and a modern TanStack ecosystem.

## Development Commands

### Development Server
```bash
npm run dev
```
Runs Vite dev server on port 3000 with network access (`--host` flag enabled).

### Build
```bash
npm run build
```
Builds the application and runs TypeScript compiler for type checking.

### Testing
```bash
npm run test          # Run all tests with Vitest
```
The project uses Vitest with jsdom for unit and component testing. Test files follow the `*.test.ts` or `*.test.tsx` naming convention.

### Code Quality
```bash
npm run lint          # Run ESLint
npm run format        # Run Prettier
npm run check         # Format with Prettier and fix with ESLint
```
The project uses `@tanstack/eslint-config` and has strict TypeScript configuration enabled.

### Preview Production Build
```bash
npm run serve
```

## Architecture

### Routing Architecture (TanStack Router)
- **File-based routing** in `src/routes/` directory
- Routes are automatically generated - the file structure defines the URL structure
- `__root.tsx` contains the root layout with global components (Header, Toaster, Devtools)
- Private routes use the `_auth` directory prefix (e.g., `_auth/dashboard/`)
- Dynamic routes use `$` prefix (e.g., `$slug.tsx` for `/agendar/:slug`)
- Route context includes `queryClient` for data loading integration

### State Management Strategy
The application uses a **three-layer state architecture**:

1. **Server State** (TanStack Query via custom hooks in `src/hooks/`)
   - `use-auth.ts`: Authentication mutations and user state
   - `use-services.ts`: CRUD operations for services
   - `use-bookings.ts`: CRUD operations for bookings + status updates
   - `use-availability.ts`: Availability management + public availability fetching
   - Query client configured with 1-minute stale time and 1 retry

2. **URL State** (TanStack Router)
   - Route parameters (e.g., professional slug)
   - Search params for filtering/pagination

3. **Local Component State** (React useState)
   - UI state like form inputs, modal visibility, multi-step wizards
   - Temporary selections (e.g., booking flow steps)

### Authentication Flow
- Token-based authentication stored in localStorage (`marcazap_token`, `marcazap_user`)
- Axios interceptors automatically attach JWT to requests
- 401 responses trigger automatic logout and redirect to `/login`
- `PrivateRoute` component guards authenticated routes
- Mock authentication currently active (see `src/lib/auth.ts`)

### API Layer (`src/lib/api.ts`)
- Axios instance with base URL from `VITE_API_URL` environment variable
- Request interceptor adds `Authorization: Bearer <token>` header
- Response interceptor handles 401 errors globally
- Expected backend base URL: `http://localhost:3333/api`

### Type System (`src/types/`)
All types are centralized and exported through `src/types/index.ts`:
- `auth.types.ts`: User, LoginCredentials, RegisterData, AuthResponse
- `professional.types.ts`: Professional, ProfessionalPublic
- `service.types.ts`: Service, CreateServiceData
- `booking.types.ts`: Booking, CreateBookingData, BookingStatus
- `availability.types.ts`: Availability, TimeSlot, DayOfWeek

TypeScript strict mode is enabled with additional compiler strictness (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`).

### Component Organization
```
src/components/
├── booking/          # Public booking flow components (4-step wizard)
│   ├── ServiceSelector.tsx
│   ├── AvailabilityCalendar.tsx
│   ├── ClientForm.tsx
│   └── BookingConfirmation.tsx
├── dashboard/        # Professional dashboard components
│   ├── StatsCard.tsx
│   ├── ServiceCard.tsx
│   └── UpcomingBookings.tsx
├── layout/           # Layout wrappers and guards
│   ├── PrivateRoute.tsx
│   └── DashboardLayout.tsx
└── ui/               # Shadcn/ui components (18 components)
```

### Public Booking Flow
The `/agendar/:slug` route implements a 4-step wizard pattern:
1. Service selection from professional's service list
2. Date/time selection using availability calendar (PT-BR locale)
3. Client information form (name, WhatsApp, notes) with Zod validation
4. Booking confirmation screen

State is lifted to the route component and passed down through props. Each step component accepts `onSelect`/`onSuccess` and `onBack` callbacks.

### Date Handling
- Use `date-fns` for all date operations
- PT-BR locale configured for Brazilian date formatting
- Utility functions in `src/lib/date-utils.ts` for consistent formatting
- Dates stored in ISO 8601 format, displayed as `dd/MM/yyyy`

### Styling
- **Tailwind CSS 4** with Vite plugin
- Shadcn/ui "new-york" style preset
- CSS variables for theming (neutral base color)
- Path alias `@/` points to `src/`
- Global styles in `src/styles.css`

## Backend Integration

### API Endpoints (Expected)
The application is prepared to integrate with these backend endpoints:

**Authentication:**
- `POST /auth/login` - Login with email/password
- `POST /auth/register` - Register new professional with slug

**Professional (Authenticated):**
- `GET /professional/me` - Get current professional profile
- `GET /professional/availability` - Get availability settings
- `PUT /professional/availability` - Update availability settings

**Services (Authenticated):**
- `GET /services` - List professional's services
- `POST /services` - Create new service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service

**Bookings (Authenticated):**
- `GET /bookings` - List bookings with optional filters
- `POST /bookings` - Create new booking
- `PATCH /bookings/:id/status` - Update booking status

**Public:**
- `GET /public/professional/:slug` - Get professional public profile
- `GET /public/availability/:professionalId/:date` - Get available time slots

### Environment Configuration
Create a `.env` file based on `.env.example`:
```
VITE_API_URL=http://localhost:3333/api
```

## Key Patterns and Conventions

### Component Patterns
- Use function components with TypeScript interfaces for props
- Prefer composition over prop drilling beyond 2-3 levels
- Forms use React Hook Form with Zod schema validation
- Loading states and error handling should be explicit in UI

### Import Conventions
- Use `@/` alias for absolute imports from `src/`
- Group imports: React, third-party, local components, types, styles
- UI components imported from `@/components/ui/[component]`

### Form Validation
All forms use React Hook Form + Zod for validation:
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
```

### Error Handling
- API errors: use TanStack Query's `isError` and `error` states
- Display user-friendly errors with Sonner toast notifications
- 401 errors handled globally by Axios interceptor

### Adding Shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
```
This is configured in `components.json` with "new-york" style preset.

## Project-Specific Notes

- The application targets Brazilian users - all copy should be in Portuguese (PT-BR)
- WhatsApp integration is a core feature - use `react-phone-number-input` or similar for phone validation
- The mock authentication in `src/lib/auth.ts` should be replaced with real API calls when backend is ready
- TanStack Devtools are temporarily disabled due to port conflicts (commented in `vite.config.ts`)
- The project uses React 19 - be aware of breaking changes from React 18
- Demo files mentioned in README can be safely deleted once development starts

## Common Tasks

### Adding a New Route
1. Create a new `.tsx` file in `src/routes/` (e.g., `config.tsx` for `/config`)
2. TanStack Router auto-generates the route tree
3. For private routes, place in `src/routes/_auth/` directory
4. For dynamic routes, use `$param.tsx` syntax

### Adding a New API Hook
1. Define types in appropriate `src/types/*.types.ts` file
2. Create hook in `src/hooks/use-[feature].ts`
3. Use `useMutation` for write operations, `useQuery` for reads
4. Export from hook and use in components

### Managing UI Components
- Install new Shadcn components: `npx shadcn@latest add [name]`
- Custom components go in `src/components/[domain]/`
- Reusable UI utilities in `src/lib/utils.ts` (uses `clsx` and `tailwind-merge`)
