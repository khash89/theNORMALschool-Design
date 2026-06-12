# Summer Program Application Form

A self-contained web application form for theNORMALschool Summer Program (ages 10–12).

## What it is
A single-file, multi-step web form ([`index.html`](index.html)) that collects everything defined in the
[Summer Application Data Specification](../../05-Programs/summer-2026/Summer-Application-Data-Spec.md) —
child basic info, parent info, the Element intake (Layer 1 + Layer 2 + MIAP pre-diagnosis),
the personalization questionnaire, wellbeing/social/logistics, and consent.

## How to use it
- **Open it:** double-click `index.html` — it runs in any browser, no install or build step.
- **Preview while editing:** `node server.js` (or the `summer-form` config in `.claude/launch.json`), then visit <http://localhost:8123>.
- **On submit:** the form validates, then downloads two files to the parent's device:
  - `summer-application_<child-name>.json` — structured data, grouped by spec section (A–H), ready for the student record.
  - `summer-application_<child-name>_summary.txt` — a human-readable summary for the Guide.
- There is **no backend** yet. The downloaded file is emailed to `apply@thenormalschool.com` (placeholder) until a collection portal exists.

## Design notes
- Brand-aligned: Inter, orange `#ff751f`, navy `#111`, cream `#f5f2ed` — per [`brand_guideline.md`](../../00-Vision/brand_guideline.md).
- **The child never sees framework language.** Section F is framed as preferences ("what would you make"), never as assessment. Aptitude and Passion are kept as separate questions, never merged.
- MIAP answers are stored as a **provisional pre-diagnosis** with an explicit note in the JSON — never a score.

## Files
| File | Purpose |
|---|---|
| `index.html` | The form (HTML + CSS + JS, self-contained) |
| `server.js` | Tiny static server for local preview only — not needed to use the form |
| `README.md` | This file |
