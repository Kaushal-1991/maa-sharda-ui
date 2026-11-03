# React to Next.js migration plan

Source and target use the same package at `E:\STS-Projects\maa-sharda-ui`. The active app now uses the Next.js App Router. The CRA-to-Next pair has no curated migration guide; see the official guide linked from `inventory.md`.

## Work items

| # | Work item | Source evidence | Target design | Dependencies | Validation | Status |
|---|---|---|---|---|---|---|
| 1 | Establish migration evidence | Original CRA baseline notes; partial Next app and staged CRA deletions were already present when this task resumed | Preserve the historical CRA failure evidence; do not claim a pristine persisted source baseline | None | No original CRA standalone result exists; see `inventory.md` | blocked |
| 2 | Target foundation | Mixed CRA/Next package, TypeScript config, and root `src/` | Next App Router, Next config, TypeScript, PostCSS/Tailwind, Next-only scripts, and Node engine floor | 1 | Typecheck and dev routes pass; production build is prohibited and unverified | partial |
| 3 | Shared UI and assets | CRA shared header/footer and academy assets | Next layouts, shared components, responsive CSS, metadata, and academy branding | 2 | Representative home/admin routes return 200; other pages not individually probed | partial |
| 4 | Public routes | CRA home/about/classes/contact/registration/gallery routes | App Router pages for the same public journeys; remove Event navigation while retaining event gallery category | 2, 3 | Home route 200; other pages implemented but not individually probed | partial |
| 5 | MongoDB data layer | Frontend registration fields and service calls; no backend/model source | Mongoose models, MongoDB connection, and GridFS gallery storage | 2 | TypeScript pass; live Atlas integration not exercised without validated credentials | partial |
| 6 | API and services | Spring endpoint references only; no Spring implementation | Next Route Handlers for students, classes, contact messages, auth, and gallery | 5 | TypeScript pass; only page routes probed; DB-backed handlers not exercised | partial |
| 7 | Admin auth and UI | Redux/JWT/localStorage admin flow | Environment-configured credentials, salted password verification, signed HttpOnly cookie, protected `/admin/*` pages | 2, 5, 6 | TypeScript and login page pass; auth/database integration not exercised | partial |
| 8 | CRA removal and package cleanup | `react-scripts`, React Router, CRA test setup, entrypoints, and unused legacy dependencies | Remove active CRA config, scripts, dependencies, and bootstrap files; keep React/React DOM required by Next | 2-7 | `npm ls --depth=0`, `npm test`, `npm run typecheck`; active package has no CRA scripts/dependencies | complete |
| 9 | Target validation and contract gates | Source baseline is blocked; production build was historically run only for CRA | Validate Next typecheck, tests, dev routes, minimum runtime, and production command | 2-8 | Four target assertions pass; no production build per user's instruction; exact Node minimum and Atlas tests unavailable | blocked |
| 10 | Final cutover and handoff | Source contracts and partial target implementation | Next-only package scripts and dependency graph; preserve non-imported `legacy/` archive outside the active app | 9 | No CRA config remains in the active package; mandatory production/minimum-runtime gates remain open | partial |

## Contract changes

| Contract | Source value | Target value | Why required | Alternatives considered | Validation evidence | Approval status |
|---|---|---|---|---|---|---|
| Node runtime | No declared engine; observed host Node 24.12.0 | `>=20.9.0` in `engines.node` | Required by Next.js 16.4.3 | Keep unspecified; choose an older Next version | Next package metadata confirms requirement; host 24.12 passes, minimum not installed | approved change |
| `npm start` | CRA development server/watch | Next production server; `npm run dev` is the development server | User chose standard Next command semantics | Keep `npm start` for development and add a separate production command | User approved; dev routes return 200; production start requires the prohibited build | approved change |
| `npm run build` | CRA build and `build/` output | Next build and `.next/` output | Next owns production output | Keep CRA build | User prohibited `npm run build`; target build remains unverified | approved change |
| `npm test` | CRA/Jest; historic source suite fails before assertions | Vitest via `npm test` | Remove CRA runner and keep the public test command | Standalone Jest setup | User approved Vitest; 3 tests pass | approved change |
| Runtime/API and media | Spring calls; photos in IndexedDB and videos in Spring | Next Route Handlers, Atlas/Mongoose, GridFS | Explicit user request | Keep Spring or drop media/API behaviors | TypeScript and route checks pass; live Atlas integration unavailable | approved change |
| Public routing | React Router, with Event navigation | Next App Router; Event navigation removed | Framework cutover and requested menu change | Keep React Router in Next | Home/login routes return 200 | approved change |

Production build/production-start validation, exact Node 20.9.0 validation, pristine CRA baseline replay, and Atlas-backed integration remain release blockers. Do not mark the migration complete until these gates are satisfied or an explicit scope exception is recorded.
