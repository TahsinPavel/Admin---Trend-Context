# Admin TrendContext

> ⚠️ **WARNING**: This is an internal admin panel. Never expose the admin URL publicly.

Secure admin dashboard for managing blog articles on [TrendContext](https://trendcontext.live).  
Deployed at **admin.trendcontext.live** — password-protected, no public content.

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Neon PostgreSQL** (@neondatabase/serverless)
- **Tiptap** (rich text editor)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `ADMIN_PASSWORD` | Single admin password for login |
| `NEXT_PUBLIC_SITE_URL` | Public-facing site URL (reference only) |

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`
4. Set the custom domain to `admin.trendcontext.live`
5. Deploy

## Security Notes

- **Authentication**: Single password → secure httpOnly cookie session (24h)
- **Middleware**: ALL routes except `/login` require authentication
- **SEO Blocking**:
  - `robots.txt` → `Disallow: /`
  - `X-Robots-Tag: noindex, nofollow` on every response
  - No indexable metadata in any page
- **Server-only**: All DB calls and password checks happen on the server
- **Sanitization**: All HTML content is sanitized with DOMPurify before saving
- **No public routes**: There are zero publicly accessible pages

## Project Structure

```
src/
├── app/
│   ├── actions.ts          # Server actions (login, CRUD)
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Redirects to /dashboard
│   ├── not-found.tsx        # 404 page
│   ├── dashboard/
│   │   ├── page.tsx         # Article list
│   │   └── article-list.tsx # Table component
│   ├── login/
│   │   ├── page.tsx         # Login page
│   │   └── login-form.tsx   # Login form
│   ├── new/
│   │   └── page.tsx         # Create article
│   └── edit/
│       └── [id]/
│           └── page.tsx     # Edit article
├── components/
│   ├── header.tsx           # Admin header
│   ├── logout-button.tsx    # Logout button
│   ├── article-form.tsx     # Reusable article form
│   └── rich-text-editor.tsx # Tiptap editor
├── lib/
│   ├── auth.ts              # Session & password helpers
│   ├── db.ts                # Neon DB connection
│   ├── queries.ts           # Article CRUD queries
│   └── types.ts             # TypeScript interfaces
└── middleware.ts            # Route protection
```
