# Submission Storage — Supabase Setup

How the application form saves submissions to a database you control, instead of only downloading a file to the parent's device.

**Applies to:** [`app/index.html`](../app/index.html) — the `SUBMISSION STORAGE (Supabase)` config block near the top of the `<script>`.

---

## How it works

On submit, the form POSTs the structured application to a Supabase (Postgres) table. The success screen confirms the application was received. If the server can't be reached — or before you've configured it — the form **falls back** to downloading the file locally and asks the parent to email it, so a submission is never lost.

### Security model (why this is safe to ship in a static page)
- The browser only ever holds the **publishable** key (`sb_publishable_…`; formerly the "anon / public" key). That is fine **by design**: the table has **Row Level Security (RLS)** enabled with an **INSERT-only** policy.
- The publishable key authenticates as the `anon` role, so it can **add** an application but **cannot read, edit, or delete** anyone's submission. There is no `SELECT` policy for that role.
- The team reads submissions only from the **Supabase dashboard** (which authenticates as you and bypasses RLS) — or, later, from a password-protected admin page using a server-side key.
- **Never** put the **secret** key (`sb_secret_…`; formerly `service_role`) in `index.html`. It bypasses RLS. It belongs only on a server.

This data is sensitive (minors' medical, wellbeing, and safeguarding details). See **Privacy & retention** below.

---

## One-time setup

### 1. Create the project
1. Sign up at [supabase.com](https://supabase.com) and create a new project (free tier is enough).
2. Choose the **region** closest to your families and mindful of data-residency expectations (e.g. an Asia-Pacific region such as Singapore or Tokyo for Mongolia). You can't change region later without recreating the project.

### 2. Create the table + lock it down
Open **SQL Editor** in the Supabase dashboard, paste this, and run it:

```sql
-- Submissions table for the summer application form
create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  child_name   text,
  session      text,
  parent_email text,
  payload      jsonb not null      -- the full A–H application object
);

-- Turn on Row Level Security
alter table public.applications enable row level security;

-- Let the public (anon) key INSERT only. With no SELECT/UPDATE/DELETE policy,
-- the anon key cannot read, change, or delete any submission.
grant insert on public.applications to anon;

create policy "anon can submit applications"
  on public.applications
  for insert
  to anon
  with check (true);
```

### 3. Wire up the form
1. **Project URL:** **Project Settings → Data API** → **Project URL**. It is `https://<project-ref>.supabase.co` — the `<project-ref>` is also the last segment of your dashboard address bar (`.../dashboard/project/<project-ref>`).
2. **Key:** **Project Settings → API keys** → copy the **Publishable key** (`sb_publishable_…`). Do **not** use the **Secret key** (`sb_secret_…`). *(If you only see a "Legacy API keys" section, the `anon` key there works too.)*
3. In [`app/index.html`](../app/index.html), fill in the config block:
   ```js
   var SUPABASE_URL = 'https://abcd1234xyz.supabase.co';
   var SUPABASE_KEY = 'sb_publishable_...';   // the publishable key — safe in the browser
   var SUPABASE_TABLE = 'applications';
   ```

### 4. Test it
Submit a test application from the deployed form. In the dashboard, **Table Editor → applications** should show a new row. The success screen should say *"…application. ✓ It's safely saved with our team."* (If it instead says "saved to your device / email it", the POST failed — check the URL/key and the browser console.)

---

## Reading submissions
- **Table Editor → `applications`** — sort by `created_at`, scan `child_name` / `session` / `parent_email`, and open the `payload` cell for the full A–H answers (parent + child for sections C and E).
- Export to CSV from the Table Editor for offline triage.
- The `payload` column mirrors the downloaded JSON exactly, so the [data spec](../../intake/Summer-Application-Data-Spec.md) section keys (`A_childBasicInfo`, `C_elementLayer1.parent` / `.child`, etc.) apply.

---

## Optional next steps
- **Notify the team on each submission** — Supabase **Database Webhooks** (Database → Webhooks) can call an Edge Function or an email service (Resend, Postmark) on every insert. Send the parent a receipt and the team an alert.
- **Anti-spam** — add a hidden honeypot field, or Cloudflare Turnstile, and reject on the server/Edge Function. At this scale, a honeypot is usually enough.
- **Admin view** — a small password-protected page that reads with the `service_role` key from a serverless function, if the team prefers a custom triage UI over the dashboard.

---

## Hosting the form
The form must be served over **HTTPS** for the browser to POST and for mic/voice input to work. Any static host is fine and free at this scale: Cloudflare Pages, Netlify, Vercel, or GitHub Pages. Deploy the contents of [`app/`](../app/) (only `index.html` is needed in production; `server.js` is for local preview).

---

## Privacy & retention (important — minors' data)
- Restrict dashboard access to the founding team only.
- Supabase encrypts data at rest; keep the region appropriate to your families.
- Set a **retention habit**: delete applications after the program runs (`delete from public.applications where created_at < now() - interval '6 months';`, or by cohort). The form promises families their information is "used only to plan your child's week" — honour that.
- The `payload` includes medical, anxiety, and safeguarding fields. Treat the table as confidential; don't copy it into less-protected tools.

---

*theNORMALschool internal use only. Companion to [`Form-Design-And-Copy.md`](Form-Design-And-Copy.md) and [`Summer-Application-Data-Spec.md`](../../intake/Summer-Application-Data-Spec.md).*
