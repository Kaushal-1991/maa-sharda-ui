# Migration incomplete

## Summary

The active app has been cut over to Next.js App Router. CRA-only dependencies,
scripts, configuration, bootstrap files, and the stale CRA test were removed.
React and React DOM remain because Next.js requires them. The unimported
`legacy/` archive was left untouched.

The user approved Node `>=20.9.0`, standard Next `npm start` semantics, and
Vitest. `package.json` declares the approved Node engine floor. The `npm test`
command now runs three Zod request-schema tests.

## Validation evidence

The final standalone runtime result is
[`../runtime-validation/standalone-result.json`](../runtime-validation/standalone-result.json),
recorded at `2026-11-02T09:59:37.4872301Z` with plan hash
`45254f56bc8646ec7606147bbb3f0370cca3a25897e0bbe0a69e6b68efe2dea3`.

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm test` | Passed: 3 tests |
| `GET /` via Next dev server | HTTP 200 |
| `GET /admin/login` via Next dev server | HTTP 200 |
| `npm ls --depth=0` | Passed; declared dependencies installed |
| CRA configuration search in active package/source | No matches |

## Required gates still open

| Gate | Status | Evidence/blocker |
|---|---|---|
| Pristine CRA source baseline | Blocked | The task resumed with a partial Next implementation and staged CRA deletions. Earlier manual CRA build/test notes are historical only; no original CRA standalone result exists. |
| Production build and production start | Blocked | The user explicitly prohibited running `npm run build`; Next production output and `npm start` cannot be validated without it. |
| Minimum Node runtime | Blocked | Next 16.4.3 requires Node `>=20.9.0`, which is declared and approved. Only Node 24.12.0 is installed, so the exact minimum was not tested. |
| Atlas-backed API/gallery integration | Blocked | No validated Atlas integration was available for this run; local route probes covered only the home and admin-login pages. |
| CI/deployment consumers | Not applicable in repository | No CI, container, or deployment manifest was found. |

The target dev server, typecheck, and tests are validated, but the missing
production build, exact-minimum runtime check, original source baseline, and
Atlas integration evidence prevent a complete migration sign-off.
