# Studio Agentic

A Next.js website for Studio Agentic, a business-building studio for ambitious founders.

## Run & Operate

- `corepack pnpm --filter @workspace/studio-agentic run dev` — run the Next.js website
- `corepack pnpm --filter @workspace/studio-agentic run build` — create the production Next.js build
- `corepack pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `corepack pnpm run typecheck` — full typecheck across all packages
- `corepack pnpm run build` — typecheck + build all packages
- `corepack pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `corepack pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: Next.js App Router, React 19, Tailwind CSS 4
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/studio-agentic/src/app` — Next.js routes, document metadata, error and not-found states
- `artifacts/studio-agentic/src/App.tsx` — interactive Studio Agentic home page
- `artifacts/studio-agentic/src/index.css` — global theme and page styling
- `artifacts/studio-agentic/public` — public static assets
- `artifacts/api-server` — Express API server
- `lib/api-spec/openapi.yaml` — API contract
- `lib/db/src/schema` — database schema

## Architecture decisions

- The public website uses the Next.js App Router and statically prerenders the home page.
- Interactive navigation, FAQ, reveal effects, and the conversation modal live in one client component so their original behavior is preserved.
- Page metadata is declared through the Next.js metadata API instead of client-side DOM mutation.
- `BASE_PATH` remains optional and is normalized in `next.config.ts` for prefixed deployments.

## Product

The site explains Studio Agentic's system, method, principles, and common questions, and includes responsive navigation and a conversation form.

## User preferences

- Preserve all existing website data and information during the Next.js migration.

## Gotchas

- Run package commands through `corepack pnpm` so the workspace-pinned pnpm version is used consistently.
- Keep the Windows x64 build-tool binaries enabled in `pnpm-workspace.yaml`; local Next.js CSS builds require them.

## Pointers

- See `artifacts/studio-agentic/next.config.ts` for deployment path handling.
