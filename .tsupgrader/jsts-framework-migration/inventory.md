# Framework migration inventory

## Scope and source tree

- Repository/package: `E:\STS-Projects\maa-sharda-ui`, one npm package.
- Source framework: Create React App with React 19.3.0, TypeScript, `react-scripts` 5.0.1, and React Router 7.18.x.
- Target: Next.js 16 App Router, TypeScript, MongoDB Atlas/Mongoose, and Next Route Handlers.
- The source inventory recorded 35 `.tsx`, 5 `.ts`, 5 `.css`, and 22 image/font assets under `src/` (67 paths including `src/.env`). No Spring Boot source, separate backend package, CI configuration, container, or deployment manifest was found.
- No source-to-target pair guide exists for CRA to Next.js. The authoritative framework reference is [Next.js: Migrate from Create React App](https://nextjs.org/docs/app/guides/migrating/from-create-react-app).
- At the start of this resumed task, the working tree already contained a partial Next.js implementation and staged CRA-source deletions. The pristine CRA package was not available as the active tree, so the original source baseline could not be captured by the runtime-validation tool before prior migration edits.

## Feature inventory

| Family | Source evidence | Target treatment |
|---|---|---|
| Public pages | `src/Pages/Landing/{Home,About,Classes,Contact,Events,Gallery,RegisterPage}.tsx`; `src/Routes/AppRoutes.tsx` | Next App Router pages for home, about, classes, registration, contact, and photo/video galleries. Event navigation is removed; gallery categories remain. |
| Shared UI/styles | CRA header/footer, `App.css`, `index.css`, Mantine, PrimeReact, Tabler | Next shared layouts and `src/app/site.css`; unused CRA UI dependencies removed. Maa Sharda branding/assets retained. |
| Registration | `src/components/Register/Register.tsx`; student service | Next registration page, Zod server validation, MongoDB student model, duplicate protection. |
| Student administration | CRA student list, status, deletion, certificate UI | Protected Next admin pages and Route Handlers using an HttpOnly signed session. |
| Admin shell/login | CRA dashboard, Redux/JWT/localStorage auth | `/admin/login` and protected `/admin/*` pages; salted password verification and cookie-based auth. |
| Classes | Four public courses and YouTube playlist integration | Public classes page and MongoDB-backed admin class management. |
| Contact | Academy address, email, phone, and map; no source form API | Contact page/form, validated Next endpoint, and admin message view. |
| Gallery/media | CRA gallery; photos in IndexedDB; video operations called Spring endpoints | Next public/admin gallery, protected upload/delete handlers, MongoDB GridFS storage, up to five photos or one video per upload. |
| Events | `/events` landing page and navigation; no event API/model | Event landing navigation removed; event photo/video category retained. |

## API/authentication evidence

The source exposed only frontend API references; no Spring implementation was present:

- `POST /api/auth/login`
- `POST /api/students/register`
- `GET /api/students/getAll`
- `GET /api/students/count`
- `DELETE /api/students/delete/:id`
- `PUT /api/students/registrationStatus/:id/:status`
- `POST /api/videos/upload`
- `GET /api/videos/type/:type`
- `DELETE /api/videos/delete/:id`

The old Axios interceptor targeted `http://localhost:8080`; auth stored a bearer token in `localStorage`. Those source integrations were removed from the active app. Atlas integration could not be exercised without verified database credentials.

## Baseline and dependency preflight

- Historical manual evidence for the original CRA tree: `npm run build` passed; `CI=true npm test -- --watchAll=false` failed before assertions because Jest could not resolve `react-router/dom` from React Router 7.18.4. This is not a persisted runtime-validation baseline.
- Initial validation of the resumed hybrid tree found that stale `src/App.test.tsx` imported a deleted route. Route probes also exposed a missing direct PostCSS `autoprefixer` dependency and an orphaned dev server; the obsolete CRA test and server were removed, and `autoprefixer` was declared directly.
- The final target dependency graph is Next.js, React/React DOM (required by Next), Mongoose, Zod, Tailwind, PostCSS/autoprefixer, TypeScript, and Vitest. `npm ls --depth=0` reports all declared dependencies.
- Runtime observed: Node `v24.12.0`, npm `11.21.1`. Next.js `16.4.3` declares Node `>=20.9.0`; the user approved this engine floor. Only Node 24.12.0 is installed, so exact-minimum validation remains outstanding.
- No CI, container, or deployment manifest was found. The user explicitly prohibited running `npm run build`; the production build and production-start command were not validated.
- Target standalone validation is persisted at `../runtime-validation/standalone-result.json`: TypeScript, three Vitest schema tests, home `/`, and `/admin/login` passed. No original CRA standalone baseline was available.

## Contract changes

| Contract | Source value | Target value | Why required | Alternatives considered | Validation evidence | Approval status |
|---|---|---|---|---|---|---|
| Node runtime | No declared engine; host used Node 24.12.0 | `engines.node: >=20.9.0` | Required by Next.js 16.4.3 | Keep an undeclared floor; choose an older Next version | Package metadata confirms the floor; host Node 24.12.0 passes, exact minimum unavailable | approved change |
| `npm start` | CRA development server with watch/live reload | Standard Next behavior: `npm run dev` for development; `npm start` serves the production build | Align public commands with Next conventions | Preserve `npm start` as development and add a separate production command | User approved standard Next semantics; dev routes returned 200; production start untested because build is prohibited | approved change |
| `npm run build` | CRA build writes `build/` | Next production build writes `.next/` | Make Next the sole application framework | Keep the CRA build | User prohibited the build command; production output remains unverified | approved change |
| `npm test` | CRA/Jest, historical baseline failed before tests | Vitest via the same command | Remove CRA runner while retaining a test command | Keep standalone Jest configuration | User approved Vitest; three schema tests pass | approved change |
| API/persistence | Browser called Spring; Spring source absent | Next Route Handlers with MongoDB/Mongoose/GridFS | Explicit Atlas/Next request | Retain Spring or drop API/gallery behavior | TypeScript and page probes pass; Atlas integration not exercised without validated credentials | approved change |
| Routing | React Router paths and event navigation | Next App Router; Event navigation removed, gallery categories retained | Framework cutover and requested navigation update | Keep React Router in the Next app | Home and admin-login return 200; remaining routes not individually probed | approved change |
