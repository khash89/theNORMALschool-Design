# Summer Application — Design & Copy Specification
*Exactly how the web form looks and what it says — every screen, control, and string*

**Applies to:** [`app/index.html`](../app/index.html) (the built summer application form).
**Companion to:** [Summer-Application-Data-Spec.md](../../intake/Summer-Application-Data-Spec.md) (what we collect & why). This document covers **presentation and wording**; that one covers data and purpose.
**Brand source:** [`Brand-Guideline.md`](../../../../00-Vision/Brand-Guideline.md).

> This is a documentation of the form as built. If a string here and the form ever disagree, the form is the source of truth — update this doc to match, or change both together.

---

## 1. Design system (tokens)

### Colors
| Token | Hex | Where it's used |
|---|---|---|
| Orange (hero/CTA) | `#ff751f` | Primary buttons, progress fill, selected chips/options, kickers, required `*`, success badge, focus ring |
| Navy (headlines) | `#111111` | All H1/H2, field labels, input text |
| Body | `#777777` | Paragraphs, body copy |
| Muted | `#999999` | Hints, step counter, footer, placeholder-level captions |
| Cream (section bg) | `#f5f2ed` | Page background, reassurance boxes |
| Border | `#e8e3db` | Input borders, card border, chip/option borders, dividers |
| UI text | `#555555` | Chip text (unselected), reassurance body, ghost button text |
| White | `#ffffff` | Card background, input background, text on orange |
| Error | `#e5484d` / `#c4373b` | Invalid input border / error message text |

Focus ring: `0 0 0 3px rgba(255,117,31,0.12)` with `border-color: orange`.

### Typography — Inter (only)
| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | `clamp(28px, 5.5vw, 44px)` | 850 | letter-spacing −0.04em, line-height 1.1 |
| Step H2 | 26px | 850 | letter-spacing −0.03em |
| Success H2 | 28px | 850 | |
| Kicker / eyebrow | 11px | 600 | UPPERCASE, letter-spacing 0.18em, orange |
| Field label | 11px | 600 | UPPERCASE, letter-spacing 0.1em, navy |
| Body / paragraph | 15–16px | 400 | line-height 1.7, body gray |
| Hint | 13px | 400 | muted, not uppercase |
| Input text | 15px | 400 | navy |
| Button | 14px | 700 | always ends in `→` (primary) |
| Step counter | 11px | 600 | UPPERCASE, letter-spacing 0.1em, muted |

### Spacing & shape
- Max content width: **720px** (narrower than the 960px marketing width — a form reads better in a single tight column).
- Card: white, 1px border `#e8e3db`, **20px radius**, shadow `rgba(0,0,0,0.06) 0 2px 12px`, padding 36×32.
- Inputs: **10px radius**, padding 12×14. Buttons: **8px radius**, padding 12×22.
- Field vertical rhythm: 22px between fields; 26px below each step header.

### Components
| Component | Resting state | Selected / active | Error |
|---|---|---|---|
| **Text / select / textarea** | white bg, `#e8e3db` border | orange border + focus ring | red border `#e5484d`, message shows below |
| **Chip** (multi-select) | white, gray text, pill (999px radius) | orange bg, white text, weight 600 | group message shows if none picked |
| **Option card** (single-select) | white, 12px radius, hollow radio dot | orange-tinted bg, orange border, filled dot | group message if none picked |
| **Checkbox** | native, `accent-color` orange | checked | shared message under the group |
| **Reassurance box** | cream bg, 12px radius, 14px UI-gray text | — | — |
| **Sub-section header** (`.substep`, Step 5 clusters) | navy 800 15px label preceded by a short orange accent bar | — | — |
| **Mic / voice button** (`.mic`, every textarea) | 34px circle, top-right inside the textarea, muted outline + mic glyph | orange fill, white glyph, pulsing ring while dictating | — |
| **Progress bar** | gray track, orange fill, animates width 0.35s | — | — |

---

## 2. Page chrome

### Header (sticky)
- Background `rgba(255,255,255,0.97)` + `blur(10px)`, 1px bottom border.
- Left — **wordmark:** `theNORMALschool` with **NORMAL** in weight 900 (rest 700), navy.
- Right — tag: **`SUMMER PROGRAM · AGES 10–12`** (11px uppercase muted).

### Hero (top of page, above the card)
- Eyebrow: **`Summer 2026 Application`**
- H1: **"Six days. One project your child actually cares about."**
- Subhead: *"Tell us about your child so we can match them to a project they'll love — and a week where they'll surprise themselves. Takes about 12 minutes."*

### Sidebar (left, desktop only)
- A sticky left column (`.sidebar`, 232px) titled **`Your application`**, listing the **4 sections** by name: *Your child · Getting to know them · Just for you · Wellbeing & sign-up*.
- Each item shows a status pill: **done** = orange filled circle with a ✓, **current** = orange-ringed number on a soft orange highlight, **upcoming** = muted number, disabled.
- **Clickable only up to the furthest section reached.** Tapping a completed/earlier section jumps to that section's break screen; jumping *forward* to an already-reached section first re-validates the current screen (same gate as `Continue`); upcoming sections are non-interactive until unlocked.
- **Hidden below 920px** — the layout collapses to the single 720px column and the progress bar becomes the sole indicator.

### Progress (between hero and card)
- Orange fill bar = `currentScreen / total screens × 100%` (fine-grained — it advances with every question).
- Left label = the current **section** name; Right = **`Section N of 4`** (becomes `Complete` on the success screen).
- Shown at all widths; it's the primary progress indicator on mobile (where the sidebar is hidden) and complements the sidebar on desktop.

### Footer
- *"theNORMALschool · Designed for Life · Your information is kept private and used only to plan your child's week."*

### Navigation buttons (bottom of card)
| Button | Label | Visibility |
|---|---|---|
| Back (ghost) | **`← Back`** | Hidden on the first screen |
| Next (primary) | **`Continue →`** | Every screen except the last |
| Submit (primary) | **`Submit application →`** | Last screen (signature) only |
| (nav row) | hidden entirely | Success screen |

---

## 3. Layout & responsive
- **One question per screen.** Each screen (`.step`) holds a single question — a heading (the question), an optional one-line hint, and one input. Navigation moves one question at a time. Step numbers are assigned by DOM order in JS, so screens can be reordered freely.
- **Four sections**, each opened by a **section-break screen** (`.brk`): *Your child · Getting to know them · Just for you · Wellbeing & sign-up*. Screens carry a `data-section` (1–4); the sidebar and progress derive from it.
- Two-column on desktop: a sticky **232px sidebar** + the **720px content column** (hero, progress, form card), centered as a group within a 1040px `.page`. The sticky header aligns to the same 1040px width.
- **Below 920px** the sidebar is hidden and the content column reverts to a single centered 720px column.
- Within the content column, 28px horizontal padding.
- Two-up rows (`.row`) collapse to stacked single-column **below 560px** (e.g. DOB + gender, email + phone).
- Option-card grid (`.opt-grid`, used for team/solo) is 2-up, collapses to 1-up below 560px.
- Inputs are full-width and ≥44px tall for touch.
- On every step change the page scrolls to top smoothly; on validation failure it scrolls to the first error.

---

## 4. Interaction & behavior

| Behavior | Detail |
|---|---|
| **One question per screen** | ~67 question screens + 4 section-break screens + 1 success screen. Only one `.step` visible at a time; entry fades/slides in (0.3s). `Continue` advances one screen. |
| **Section breaks** | Each of the 4 sections opens with a `.brk` interstitial: a numbered badge, *Section N of 4*, a heading, a **✓ recap** of what's done, and a preview of what's next. No inputs — it just orients the user. |
| **Per-screen validation** | `Continue` validates only the current screen's one field (break screens have nothing to validate, so they always pass). On failure you stay put, the error shows, and the view scrolls to it. |
| **Inline recovery** | Typing in an invalid field clears its error immediately; tapping a chip/option clears that group's error. |
| **Age auto-calc** | On DOB change, computes age at the program reference date (2026-06-01) and prints **"Age at program start: N"** in orange. Outside 10–12 appends *"— note: program is designed for ages 10–12"** (a soft note, not a block). |
| **Child-name personalization** | The child's **preferred name** (or first name from "full name") is injected **throughout** the form, not just the child step. Parent-facing copy uses `.kid` spans (the name as subject/object) and `.kidposs` spans (the possessive, e.g. *Aru's*); Step 5 ("Just for You") uses the second-person id-spans (`childName1` / `childKicker` / `childName2`). The name is recomputed on **every** step change and live as the parent types the name fields. Graceful fallback to "your child" / "your child's" / "you" when empty, so verbs around a `.kid` span are written singular and read correctly either way. |
| **Voice input (dictation)** | Every `textarea` gets a mic button (injected by JS). Tapping it starts Web Speech API dictation (`SpeechRecognition` / `webkitSpeechRecognition`); recognized text is **appended** to whatever is already typed, and the field's validation error clears as it fills. Tapping again (or tapping another field's mic) stops/switches. If the browser lacks the API, no button is shown and typing works as normal. Recognition language defaults to the browser's `navigator.language`. |
| **Submit** | Builds a structured payload + readable summary and triggers two downloads, then shows the success screen. |
| **Downloads** | `summer-application_<child-name>.json` (grouped by spec sections A–H; sections C and E each nest `parent` + `child` sub-objects with a cross-read `note`) and `summer-application_<child-name>_summary.txt` (human-readable, parent and child reports printed side by side under each of Element Layer 1 and MIAP). "Download again →" re-triggers both. |
| **Submission storage** | On submit the form POSTs the application to a **Supabase** table (insert-only via RLS — see [`Submission-Storage-Supabase.md`](Submission-Storage-Supabase.md)) and the success screen confirms receipt. If Supabase isn't configured, or the POST fails, it **falls back** to downloading the JSON + summary locally and asks the parent to email it — so a submission is never lost. The success copy changes per state (*sending* → *received ✓* → *saved to your device / email it*). |

---

## 5. Voice & microcopy rules
Carried from the brand guideline and applied throughout:
- **Use the child's name, not a category.** Once the name is entered (Section 1), parent-facing copy says **"Aru"** (the nickname), not "your child," "student," "learner," or "applicant." "your child" is only the fallback before a name exists. Pronouns (they/them/their) are kept where a second name mention would read repetitively.
- Add a concrete **example placeholder** to every free-text field — `e.g. …` for parent fields, first-person kid examples in the child section (Section 3) — so parents/children see the kind of answer we want without it reading as a required format.
- **No edu-jargon** (no "holistic," "21st-century skills," "personalized learning," "Element," "MIAP," "aptitude"). Framework language never appears on screen.
- Empathetic and direct, never legal-heavy or preachy. Reassurances are short and warm.
- Primary CTAs end with **`→`**.
- **Sections 1, 2 and 4** speak *about* the child (to the parent). **Section 3** ("Just for you") speaks *to* the child — second person, playful, "zero wrong answers."
- Questions ask for **behavior, not labels** ("what do they actually do?" not "are they resilient?").
- Required fields marked with an orange **`*`**. Error messages are specific and friendly, never scolding.

---

## 6. Full content inventory

> **Structure note (v1.8):** the form now shows **one question per screen**. Each field listed below is its own screen, and the old "Step 1–8" groupings below now map to the **4 sections** (each opened by a section break):
> - **Section 1 · Your child** — the *Step 1* fields.
> - **Section 2 · Getting to know them** — *Step 3 (What Lights Them Up)* + *Step 4 (Reading Your Child)* + *Step 5 (How They Work)*.
> - **Section 3 · Just for you** — *Step 6* fields (child's voice).
> - **Section 4 · Wellbeing & sign-up** — *Step 7 (Wellbeing)* + *Step 2 (Parent & Contact)* + *Step 8 (Consent)*; consent's 4 checkboxes share one screen, signature is the final screen.
> The field copy, hints, placeholders, and error strings below are unchanged by the one-per-screen layout. **Section-break copy** is in §6a.

### 6a. Section-break screens
Each break has a numbered badge, a `Section N of 4` kicker, a heading, a ✓ recap of what's done, and a preview of what's next.

| # | Heading | Recap (done) | Preview (next) |
|---|---|---|---|
| 1 | First, the basics | — | A few quick facts about your child — name, age, school, and which weeks you'd like. |
| 2 | Now — what makes `[name]` tick | ✓ Got the basics. | What `[name]` is drawn to, how they handle a challenge, and how they work — in your words. |
| 3 | This part is just for `[name]` | ✓ Thanks — that's the grown-up's view. | These next questions are for the child, in their own words. *(+ "Parents: let your child answer…" reassurance.)* |
| 4 | Last stretch | ✓ Love it — that's the fun part done. | Wellbeing, your contact details, and a couple of confirmations. |

Legend: **R** = required · type in *italics* · `err:` = message shown when invalid.

> Two cross-cutting rules apply to the strings below and are **not** re-listed per row:
> 1. **Name injection** — labels/hints written with "your child" / "your child's" carry a `.kid` / `.kidposs` span and render with the child's nickname once it's known (Step 3 onward). The wording here shows the empty-state fallback.
> 2. **Placeholders** — every text input and textarea has an example placeholder (`e.g. …`). A representative set is shown; the form is the source of truth for exact placeholder strings.

### Step 1 — "Your Child"
- Kicker: **About your child** · H2: **Let's start with the basics** · Sub: *Just a few facts so we know who's joining us.*

| Label | Type | R | Placeholder / hint · `err` |
|---|---|---|---|
| Child's full name | *text* | ✅ | `err:` Please enter your child's name. |
| Preferred name / nickname | *text* | — | ph: What we'll call them |
| Date of birth | *date* | ✅ | shows computed age line · `err:` Please enter a date of birth. |
| Gender | *text* | — | ph: Optional — how they describe themselves |
| Language(s) at home | *text* | ✅ | ph: e.g. English, Mandarin · `err:` Please tell us the home language. |
| Current school | *text + datalist* | ✅ | type-ahead suggestions from an editable `SCHOOLS` list (top of the script); free text still allowed · ph: Start typing your school… · `err:` Please enter the school. |
| Current grade | *select* | ✅ | Choose… / Grade 3 / Grade 4 / Grade 5 / Grade 6 / Grade 7 / Grade 8 · `err:` Please choose a grade. |
| Which week(s) would you like? | *chips (multi-select)* | ✅ | hint: Pick all the weeks that work for you — you can choose more than one. — Week #1 · Jun 29 – Jul 3 / Week #2 · Jul 7 – Jul 11 / Week #3 · Jul 14 – Jul 18 / Week #4 · Jul 21 – Jul 25 / Week #5 · Jul 28 – Aug 1 / Week #6 · Aug 4 – Aug 7 · `err:` Please pick at least one week. |

### Step 2 — "What Lights Them Up"  *(Element Layer 1 — parent)*
- Kicker: **What lights your child up** · H2: **The things that come easily — and the things they love** · Sub: *Be specific and concrete. Not "good at art" — but "draws machines and how they connect."*
- Reassurance: *These two are different on purpose. **What comes easily** and **what they love** aren't always the same thing — and both matter. Tell us what you actually see, not what you hope.*

| Label | Type | R | Hint · `err` |
|---|---|---|---|
| What comes unusually easily? | *textarea* | ✅ | 1–2 specific things your child picks up faster or does with more ease than you'd expect for their age. What exactly do they do, and how do you know it comes easily? · `err:` Please describe at least one thing. |
| What do they return to without being asked? | *textarea* | ✅ | What does your child do voluntarily, repeatedly, with no reward and no prompting? When did you last see them do it? · `err:` Please describe at least one thing. |
| When do they lose track of time? | *textarea* | ✅ | Is there an activity where they resist stopping, forget meals, or have to be called several times? · `err:` Please tell us about this. |
| The free-afternoon check | *textarea* | — | On a free afternoon — nothing scheduled, screens not the default — what does your child actually end up doing? |

### Step 3 — "Reading Your Child"  *(Element Layer 2 — parent)*
- Kicker: **Reading your child** · H2: **A little more context** · Sub: *This helps us read your child accurately — and avoid misreading them.*

| Label | Type | R | Hint / options · `err` |
|---|---|---|---|
| When something is hard, what do they actually do? | *textarea* | ✅ | When they get a poor result or hit something difficult — what happens? Give a recent example. · `err:` Please share a recent example. |
| What has your child had real access to? | *chips* | — | hint: Tap everything they've had genuine hands-on access to. — Camera / video · Computer / coding · Art materials · Musical instruments · Sports / athletics · Kitchen / cooking · Building / tools · Animals / nature · Performing / stage |
| Anything they've wanted to try but never had the chance to? | *text* | — | ph: Optional |
| Where do you see real spark? | *chips* | ✅ | hint: Tap any area where you see genuine energy — it's fine to pick several. — Building / mechanical · Visual / art · Words / story · Numbers / patterns · Social / people · Performing · Physical / movement · Nature / science · `err:` Please select at least one. |
| Who do they light up around? | *textarea* | — | Any group or person your child comes alive with — or an interest they pursue harder with certain people? |
| Anything they've dropped, hidden, or been steered away from? | *textarea* | — | Something they used to love and stopped, or hide, or were told wasn't for them. What happened? |
| When are they most alert — and most drained? | *text* | — | hint: Roughly when in a normal day is your child most engaged, and when do they run flat? · ph: e.g. Sluggish mornings, comes alive after 4pm |

### Step 4 — "How They Work"  *(MIAP pre-diagnosis — parent)*
- Kicker: **How they work** · H2: **A few more about how they tick** · Sub: *There are no right answers here — honest beats impressive every time.*

| Label | Type | R | Hint · `err` |
|---|---|---|---|
| Genuinely into it vs. just going along | *textarea* | ✅ | Can you tell the difference between when your child is really into something and when they're just complying? Describe a moment of each. · `err:` Please share an example. |
| How do they describe themselves? | *textarea* | — | In their own words, how does your child describe what they're good at or who they are? (If they wouldn't, just say so.) |
| When they hit an obstacle and you're not there | *textarea* | ✅ | What happens when your child runs into a problem and no adult is around to help? · `err:` Please tell us what happens. |
| Have they ever cared that something was useful to someone else? | *textarea* | — | Not just fun for them — actually useful to another person. An example, if there is one. |

### Step 5 — "Just for You"  *(the child's voice — Personalization F + child Element cross-check C(child) + child MIAP cross-read E(child))*
- Kicker: **Now — over to `[child's name]`** · H2: **This part is just for `[child's name]`** · Sub: *Hey! These questions are for you — the kid joining us. There are zero wrong answers. Just say what's true.*
- Reassurance: ***Parents:** let your child answer this part in their own words — you can type for them, but the answers should be theirs.*
- This is the **only child-facing step**, so the spec's child versions of Section C (Element) and Section E (MIAP) live here too — framed purely as preference and experience, never as a test, never using framework words. The step is broken into four `.substep` clusters: **What you're into · When you make stuff · Your favorites · If it were up to you.**
- All C(child) and E(child) questions are **optional** (the parent's C1–C3 and E in Steps 3 & 5 remain the required core). Per the spec's overlap rule, where a child Element question duplicated an F question, the Element phrasing wins and the question is asked **once** — the old F.1 "what do you do for fun on weekends" is now the C2c "what do you do just for fun that nobody tells you to do."
- The **`Spec`** column traces each control back to [Summer-Application-Data-Spec.md](../../intake/Summer-Application-Data-Spec.md) §C/E/F.

**Cluster · What you're into**

| Label | Type | R | Hint / options · `err` | Spec |
|---|---|---|---|---|
| What are you really into right now? | *chips* | ✅ | hint: Tap everything that's you. — Gaming · Drawing · Sports · Music · Coding · Animals · Cooking · Building stuff · Reading · Science · Dance · Film / video · Fashion · Cars · Space · `err:` Pick at least one! | F.1 |
| A new kid sits next to you and asks, "So what are you all about?" | *textarea* | — | hint: What would you tell them? | E(child) Identity |
| Is there something that feels easy for you — but other kids seem to find hard? | *textarea* | — | hint: What is it? | C(child) C1c |
| What do you do just for fun — that nobody tells you to do? | *textarea* | — | | C(child) C2c |
| Is there something you do where you look up and a LOT of time has gone by? | *textarea* | — | | C(child) C3c |

**Cluster · When you make stuff**

| Label | Type | R | Hint / options · `err` | Spec |
|---|---|---|---|---|
| Something you made that you were proud of | *textarea* | ✅ | A video, a Minecraft build, a comic, a recipe, a fort — anything. What was the best part of making it? · `err:` Tell us about one thing you made! | F.1 |
| Something you started making or doing all on your own — just because you wanted to? | *textarea* | — | | E(child) Motivation |
| When something you're making stops working, what do you usually do? | *textarea* | — | | E(child) Agency |
| Have you ever made something to help someone else — or that someone else used? | *textarea* | — | hint: What was it? | E(child) Purpose |

**Cluster · Your favorites**

| Label | Type | R | Hint / options · `err` | Spec |
|---|---|---|---|---|
| Favorite YouTube channel(s) or creators | *text* | — | | F.2 |
| Favorite game(s) | *text* | — | | F.2 |
| Favorite book, comic, or show | *text* | — | | F.2 |
| Someone who's really cool at what they do | *text* | — | ph: A creator, athlete, scientist, anyone | F.2 |

**Cluster · If it were up to you**

| Label | Type | R | Hint / options · `err` | Spec |
|---|---|---|---|---|
| If today were totally free — no plans, screens not the default — what would you end up doing? | *textarea* | — | | C(child) C4c |
| If you could spend a whole week making ONE thing, what would it be? | *textarea* | — | | F.3 |
| Pick the one that sounds most fun | *radio* | ✅ | Be on camera, telling a story people actually watch · Film and edit a video until it's exactly right · Invent the rules of a game and decide how it works · Build a game's world, characters, and look · Cook something people line up to buy · Fix a real problem in your neighborhood · Build a tool that explains something cool · `err:` Pick the one that sounds most fun! | F.3 |
| What kind of stuff do you care about? | *chips* | — | Helping people · Animals · The planet · Fairness · Building things that work · Making people laugh · Winning / competing · How things work · Making beautiful things | F.4 |
| Do you like working with a team or on your own? | *radio (2-up grid)* | ✅ | With a team · On my own · Depends on the day · `err:` Pick one! | F.4 |
| When you work with other people, what part do you grab first? | *text* | — | | F.4 |

### Step 6 — "Wellbeing & Logistics"
- Kicker: **So we can support your child well** · H2: **A few things that help us care for them** · Sub: *This stays with our team. The more specific you are, the better we can show up for your child.*

| Label | Type | R | Hint / options · `err` |
|---|---|---|---|
| How does your child handle frustration, specifically? | *textarea* | ✅ | Not challenge in general — what does frustration actually look like for your child, and what helps? · `err:` Please tell us about this. |
| Any conditions, sensitivities, or accommodations we should know about? | *textarea* | — | ph: Diagnosed conditions, sensory sensitivities, learning accommodations… |
| Any significant recent life events? | *text* | — | ph: Loss, family change, school move — optional |
| What does anxiety or feeling overwhelmed look like for them? | *textarea* | — | If it applies — so we recognize it early and respond well. |
| Allergies, dietary restrictions, or medical notes | *textarea* | ✅ | Important for our Food Business project and snacks. Write "None" if none apply. · `err:` Please tell us, or write "None". |
| Does your child know anyone else enrolling? | *text* | — | ph: Names, if any |
| How do they handle disagreement with peers? | *text* | — | |
| In a group, are they more comfortable… | *select* | — | Choose… / Leading / Contributing / Following / It varies |
| Any peer conflicts we should avoid? | *text* | — | ph: Optional |
| What do you hope your child gets from this week? | *textarea* | ✅ | `err:` We'd love to hear this. |
| What have well-meaning adults gotten *wrong* about your child? | *textarea* | — | This genuinely helps us see them clearly. |
| Does your child plan first, or dive in? | *select* | — | Choose… / Plans before starting / Dives in and figures it out / A mix of both |
| Do they do better with… | *select* | — | Choose… / Clear structure / Open space / Somewhere in between |
| T-shirt size | *select* | — | Choose… / Youth S / Youth M / Youth L / Adult S / Adult M |
| Anything else you'd like us to know? | *textarea* | — | |

### Step 7 — "Parent & Contact"
- Kicker: **Parent & contact** · H2: **How we reach you** · Sub: *Your details for everything from confirmation to Saturday's showcase.*
- Placed late (just before consent) so families flow through the child-focused questions first; the parent's own contact details come right before they sign.

| Label | Type | R | Options / ph · `err` |
|---|---|---|---|
| Your full name | *text* | ✅ | `err:` Please enter your name. |
| Relationship to child | *select* | ✅ | Choose… / Mother / Father / Guardian / Grandparent / Other · `err:` Please choose a relationship. |
| Email | *email* | ✅ | `err:` Please enter a valid email. |
| Mobile phone | *tel* | ✅ | `err:` Please enter a phone number. |
| Emergency contact name | *text* | ✅ | `err:` Please enter an emergency contact. |
| Emergency contact phone | *tel* | ✅ | `err:` Please enter a phone number. |
| Authorized pickup person(s) | *text* | — | ph: Anyone else allowed to collect your child |
| How did you hear about us? | *select* | — | Choose… / Instagram / A friend / family / School / teacher / Web search / Event / Other |

### Step 8 — "Consent & Submit"
- Kicker: **Almost done** · H2: **A couple of confirmations** · Sub: *Then you're all set.*

| Control | Copy | R |
|---|---|---|
| checkbox | I confirm my child's answers above are in their own words. | ✅ |
| checkbox | I give permission for my child's project to be tested with real users during the week (Wednesday feedback day). | ✅ |
| checkbox | I consent to photos/video of the showcase being used for program records and marketing. | ✅ |
| checkbox | I agree to the program terms and liability waiver. | ✅ |
| (group `err`) | Please confirm all four to submit. | |
| Parent signature (type your full name) | *text* | ✅ · `err:` Please type your full name. |

- Reassurance: *When you submit, your child's application goes straight to our team — we'll be in touch within a few days. **Questions? Email us at apply@thenormal.school.***

### Success screen — "Submitted"
- Orange circular **✓** badge.
- Copy is **state-dependent** (see the *Submission storage* behavior in §4), driven by `setSubmitState()`:
  - **sending:** H2 *Thank you — almost there…* · *Sending `[name]`'s application…* · *Just a moment while we save it.*
  - **online (saved):** H2 *Thank you — all done!* · *We've received `[name]`'s application. ✓* · *It's safely saved with our team — we'll be in touch within a few days.*
  - **fallback (server unreachable):** H2 *Thank you — application ready!* · *We've saved `[name]`'s application to your device.* · *We couldn't reach our server just now, so please email the downloaded file to **apply@thenormal.school**. We'll be in touch within a few days.*
- Button: **`Download a copy →`** (ghost) — re-triggers the JSON + summary download.

---

## 7. Validation message index
Quick reference of every error string, in encounter order:

| # | Field / group | Message |
|---|---|---|
| 1 | Child's full name | Please enter your child's name. |
| 2 | Date of birth | Please enter a date of birth. |
| 3 | Language(s) at home | Please tell us the home language. |
| 4 | School / Grade | Please enter the school. / Please choose a grade. |
| 5 | Weeks (chips) | Please pick at least one week. |
| 6 | Parent name | Please enter your name. |
| 7 | Relationship | Please choose a relationship. |
| 8 | Email | Please enter a valid email. |
| 9 | Mobile phone / Emergency phone | Please enter a phone number. |
| 10 | Emergency contact name | Please enter an emergency contact. |
| 11 | Aptitude / Passion | Please describe at least one thing. |
| 12 | Flow | Please tell us about this. |
| 13 | Attitude | Please share a recent example. |
| 14 | Domain spark (chips) | Please select at least one. |
| 15 | Motivation | Please share an example. |
| 16 | Agency | Please tell us what happens. |
| 17 | Interests (chips) | Pick at least one! |
| 18 | Proud making | Tell us about one thing you made! |
| 19 | Dream project (radio) | Pick the one that sounds most fun! |
| 20 | Team vs solo (radio) | Pick one! |
| 21 | Frustration | Please tell us about this. |
| 22 | Medical/dietary | Please tell us, or write "None". |
| 23 | Parent hopes | We'd love to hear this. |
| 24 | Consent group | Please confirm all four to submit. |
| 25 | Signature | Please type your full name. |

Email validity (field 8) is checked with `^[^\s@]+@[^\s@]+\.[^\s@]+$`.

---

## 8. Placeholders & known TODOs
- **Intake email** is `apply@thenormal.school` (Step 8 reassurance + fallback success copy).
- **Sessions** (Step 1 week chips) are the six 2026 weeks: Jun 29–Jul 3, Jul 7–11, Jul 14–18, Jul 21–25, Jul 28–Aug 1, Aug 4–7. Parents may pick more than one.
- **Supabase not yet configured:** the `SUPABASE_URL` / `SUPABASE_ANON_KEY` in `index.html` are placeholders, so the form currently uses the local-download fallback. Fill them in per [`Submission-Storage-Supabase.md`](Submission-Storage-Supabase.md) to store submissions online.
- **Dictation language:** voice input defaults to the browser's `navigator.language`. For a family whose spoken language differs from their browser's setting this will mis-transcribe — consider deriving the recognizer language from the "language(s) at home" field, or adding an explicit language toggle.
- **Voice input is best-effort:** the Web Speech API is unavailable in some browsers (notably Firefox) and requires a one-time mic permission; the mic button is simply hidden where unsupported.

---

*Document version 1.8 — theNORMALschool internal use only.*
*v1.8 — Redesigned to **one question per screen** (Typeform-style): ~67 question screens + 1 success, grouped into **4 sections** each opened by a **section-break** interstitial (badge, recap of what's done, preview of what's next). Sidebar and progress are now section-based; step numbers are assigned by DOM order in JS. All field content, validation, nickname injection, voice input, and Supabase saving preserved.*
*v1.7 — Step 1: split "Current school & grade" into **Current school** (text with type-ahead `<datalist>` suggestions from an editable `SCHOOLS` list; free text allowed) and **Current grade** (required dropdown, Grades 3–8). JSON `A_childBasicInfo` gains a `grade` field.*
*v1.6 — Reordered steps: **Parent & Contact moved from Step 2 to Step 7** (just before Consent), so families go through the child-focused questions first. New order: Your Child · What Lights Them Up · Reading Your Child · How They Work · Just for You · Wellbeing & Logistics · Parent & Contact · Consent. The child-facing step is now Step 5.*
*v1.5 — Step 1 "session" is now a **multi-select week picker** (six 2026 weeks, chips, ≥1 required); JSON `A_childBasicInfo.session` is an array (joined to a string for the Supabase `session` column). Intake email set to `apply@thenormal.school`; Step 8 + success copy updated to reflect online submission.*
*v1.4 — Submissions now POST to **Supabase** (insert-only RLS) with a local-download fallback; success copy reflects sending/received/fallback state. Setup in [`Submission-Storage-Supabase.md`](Submission-Storage-Supabase.md).*
*v1.3 — Added a sticky left **sidebar** (desktop) for section navigation: jump back to any completed section, forward only to reached sections; hidden below 920px. Two-column layout introduced.*
*v1.2 — Name injected throughout (not just Step 6) via `.kid` / `.kidposs` spans; example placeholders added to every text/textarea; voice-input mic button added to every textarea (Web Speech API).*
*v1.1 — Step 6 expanded to carry the child (preference-framed) versions of Section C and Section E from data-spec v1.1, organised into four `.substep` clusters; JSON for C and E now nests parent + child. Steps 3 & 5 (parent C/E) unchanged.*
*Describes: app/index.html (form as built). Brand: 00-Vision/Brand-Guideline.md.*
