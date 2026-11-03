# Maa Sharda Sangeet Academy

The public website and admin portal use Next.js App Router, MongoDB Atlas, and Mongoose.

## Local setup

Use Node.js 20.9.0 or later, as required by Next.js 16.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. In MongoDB Atlas, create a database user with a strong password and allow the
   development machine's IP in Network Access. Keep the database user password
   private; URL-encode special characters when placing it in a MongoDB URI.
4. Configure separate server-only Atlas URIs:
   - `MONGO_URI_DEV` in local `.env.local`, pointing to `maa-sharada-db-dev`.
   - `MONGO_URI_PROD` in your production hosting provider's environment settings,
     pointing to `maa-sharada-db-prod`. Do not put production credentials in a
     local development env file.
   Use the format
   `mongodb+srv://<db_user>:<url_encoded_password>@<cluster-host>/<database>?retryWrites=true&w=majority`.
   Never prefix these variables with `NEXT_PUBLIC_`. The app selects the
   development or production URI based on `NODE_ENV` and validates its database
   name, preventing accidental writes to the other database.
5. Set `ADMIN_EMAIL` to `tushar@gmail.com` (or your preferred admin email).
6. For local development only, you may set a new private `ADMIN_PASSWORD` in
   `.env.local`. Do not reuse the password shared in chat. Production ignores
   plaintext `ADMIN_PASSWORD` and requires a salted hash in `ADMIN_PASSWORD_HASH`;
   create one with `node scripts/create-admin-hash.mjs`. When putting the hash
   in `.env.local`, escape each `$` separator as `\$` so Next.js does not treat
   it as environment-variable interpolation. Hosting-provider environment
   settings should use the unescaped hash.
7. Set a private signing secret of at least 32 characters as `AUTH_SECRET`.
   The local `.env.local` scaffold contains a randomly generated value.
8. Start the development server with `npm run dev`.

Use `npm run typecheck` to check TypeScript and `npm test` to run the validation
schema tests. `npm run build` creates the production build; `npm start` serves
that build. For local development, use `npm run dev`.

Never commit `.env.local` or share its contents. If a database credential is
shared accidentally, rotate it in Atlas immediately and update the local
environment value.

## Admin portal

- Sign in at `/admin/login`.
- The authenticated dashboard and management pages are under `/admin/`.
- Student registrations submitted from `/registration` are stored in MongoDB
  and listed at `/admin/students`.
- Manage photos and videos at `/admin/gallery/photos` and
  `/admin/gallery/videos`. A photo upload accepts up to five files; a video
  upload accepts one file per submission.
- Public gallery pages read their media from MongoDB GridFS. The home page shows
  up to the seven most recently uploaded photos.
