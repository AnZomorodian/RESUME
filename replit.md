# ResumePro Developer Guide

## Architecture Overview
ResumePro follows a modern full-stack JavaScript architecture:
- **Client**: Single Page Application (SPA) using React and Vite.
- **Server**: Express.js server providing API endpoints and serving the frontend.
- **Shared**: Zod schemas and Drizzle models shared between client and server for type safety.

## Development Workflow

### Key Scripts
- `npm run dev`: Starts both Vite dev server and Express backend.
- `npm run build`: Bundles the frontend and compiles TypeScript for production.
- `npm run db:push`: Synchronizes the Drizzle schema with the PostgreSQL database.
- `npm run start`: Runs the production server after building.

### Adding New Templates
To add a new resume style:
1. Update the `STYLES` array in `client/src/components/ResumeForm.tsx`.
2. Add the style configuration to `STYLE_MAP` in `client/src/components/ResumePreview.tsx`.
3. Update the `style` enum in `shared/schema.ts`.

## Deployment
This project is optimized for deployment on Replit and other modern PaaS platforms.
1. Ensure `DATABASE_URL` is set in your environment variables.
2. Run `npm run db:push` to initialize the database.
3. Run `npm run build` followed by `npm run start`.

## Project Structure
- `client/src/components/`: Reusable UI components.
- `client/src/pages/`: Main application pages and routes.
- `client/src/hooks/`: Custom React hooks for data fetching and state.
- `server/storage.ts`: Data access layer abstraction.
- `server/auth.ts`: Authentication configuration and middleware.
