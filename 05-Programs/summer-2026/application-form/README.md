# Summer Program Application Form

A self-contained web application form for theNORMALschool Summer Program (ages 10–12).

## What it is
A single-file, multi-step web form ([`app/index.html`](app/index.html)) that collects everything defined in the
[Summer Application Data Specification](../intake/Summer-Application-Data-Spec.md) —
child basic info, parent info, the Element intake (Layer 1 + Layer 2 + MIAP pre-diagnosis),
the personalization questionnaire, wellbeing/social/logistics, and consent.

How everything is shown and worded is documented in [`docs/Form-Design-And-Copy.md`](docs/Form-Design-And-Copy.md).

## How to use it
- **Open it:** double-click `app/index.html` — it runs in any browser, no install or build step.
- **Preview while editing:** `node app/server.js` (or the `summer-form` config in `.claude/launch.json`), then visit <http://localhost:8123>.
- **On submit:** the form validates, then POSTs the application to a Supabase table (once configured) and shows a confirmation. See [`docs/Submission-Storage-Supabase.md`](docs/Submission-Storage-Supabase.md) for the one-time setup (table SQL, insert-only security policy, and where to paste your Project URL + anon key).
- **Fallback:** if Supabase isn't configured yet, or the server can't be reached, the form downloads two files to the parent's device and asks them to email the file to `apply@thenormalschool.com` (placeholder):
  - `summer-application_<child-name>.json` — structured data, grouped by spec section (A–H), ready for the student record.
  - `summer-application_<child-name>_summary.txt` — a human-readable summary for the Guide.

## Design notes
- Brand-aligned: Inter, orange `#ff751f`, navy `#111`, cream `#f5f2ed` — per [`Brand-Guideline.md`](../../../00-Vision/Brand-Guideline.md).
- **The child never sees framework language.** Section F is framed as preferences ("what would you make"), never as assessment. Aptitude and Passion are kept as separate questions, never merged.
- MIAP answers are stored as a **provisional pre-diagnosis** with an explicit note in the JSON — never a score.

## Files
```
application-form/
├── README.md                  This file
├── app/
│   ├── index.html             The form (HTML + CSS + JS, self-contained)
│   └── server.js              Tiny static server for local preview only — not needed to use the form
└── docs/
    └── Form-Design-And-Copy.md  Design & copy spec — every screen, control, and string
```
