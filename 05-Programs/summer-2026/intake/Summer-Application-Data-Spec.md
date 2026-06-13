# Summer Program — Application Data Specification
*What we collect about the child, from the parent and the child — ages 10–12*

**Status:** Spec for the web application form. Source of truth for every field the form renders.
**Audience:** Internal (founding team + Guides). The form itself is parent/child-facing; this document is not.

---

## 1. Purpose

This document defines **every piece of information the summer application form collects**, who answers it (parent or child), why we collect it, and what downstream decision it feeds. The web form is built directly from this spec — one field here = one field there.

It consolidates three existing internal documents into one collection instrument:

| Source document | What it contributes |
|---|---|
| [`Element-Intake-10-12.md`](Element-Intake-10-12.md) | The Element signal tiers (Aptitude, Passion, Flow, Attitude, Opportunity…) and the MIAP observation layer |
| [`Summer-Program-Process-Map.md`](../operations/Summer-Program-Process-Map.md) | The five screening categories (factual, making history, wellbeing, social, expectations) and how each maps to a program decision |
| [`Pilot-Intake-Light.md`](../../pilot-day-2026/Pilot-Intake-Light.md) | The parent/child question framing and the rule that the child's questions read as *preferences, not assessment* |

---

## 2. Principles that govern every field

These are non-negotiable and are the reason the form is structured the way it is.

1. **All pre-program data is provisional.** Nothing on this form is observed — it is *reported* by a parent or child. Monday is the first real data point ([`Summer-Program-Process-Map.md` §Data Authentication](../operations/Summer-Program-Process-Map.md)). The form collects **hypotheses to test**, not facts.
2. **Aptitude and Passion are separate signals — never merged.** They get their own fields. "Good at art" is not an answer; "draws machines and how they connect" is.
3. **Ask for behavior, not labels.** Every signal question asks *what the child does and how you know* — not "is your child creative?"
4. **Identification stays invisible to the child.** The child's section is framed as preferences and "what would you make" — never as a test, never using framework words (Element, MIAP, aptitude).
5. **The child answers in their own words.** A parent may scribe for a younger child, but the answer must be the child's.
6. **MIAP at this age is a *pre-diagnosis*, not a score.** We collect behavioral signals that *suggest* driver strength; they are confirmed or revised by Guide observation in-week. No numeric MIAP rating is ever produced from this form.

---

## 3. Who answers what

| Section | Parent | Child | Notes |
|---|---|---|---|
| A — Child Basic Info | ✅ | — | Factual administration |
| B — Parent / Guardian Info | ✅ | — | Contact + consent |
| C — Element Intake · Layer 1 (Irreplaceable) | ✅ | ✅ | Parent reports the behavior (required core); child answers a preference-framed version as a cross-check |
| D — Element Intake · Layer 2 (Development & Context) | ✅ | — | Attitude, opportunity, breadth, tribe, suppression |
| E — MIAP Pre-Diagnosis signals | ✅ | ✅ | Parent behavioral report + child preference-framed version; cross-read, never scored |
| F — Personalization Questionnaire | partial | ✅ | Interests, hobbies, values, favorites — mostly the child's voice |
| G — Wellbeing, Social & Logistics | ✅ | — | Operational + safeguarding |
| H — Consent & Submission | ✅ | — | Required to submit |

---

## 4. Section-by-section content

### Section A — Child Basic Info
*Factual profile. Reliability: high. Maps to: administration, team composition, project matching by age band.*

| Field | Type | Required | Used for |
|---|---|---|---|
| Child's full name | text | ✅ | Records, name tags |
| Preferred name / nickname | text | — | How the Guide addresses them |
| Date of birth | date | ✅ | Age band (Scratch vs GDevelop tool routing, etc.) |
| Age at program start | auto (from DOB) | ✅ | Confirms 10–12 eligibility |
| Gender (optional, self-described) | text | — | Team balance awareness only |
| Primary language(s) at home | text | ✅ | Communication, scribing support |
| Current school | text (type-ahead suggestions) | ✅ | Records; cohort context |
| Current grade | select | ✅ | Age/stage; Agency pre-diagnosis (years of traditional schooling) |
| Session / cohort applying for | select | ✅ | Enrollment |

---

### Section B — Parent / Guardian Info
*Contact + the adult relationship. Maps to: administration, Saturday communication, safeguarding.*

| Field | Type | Required | Used for |
|---|---|---|---|
| Parent/guardian full name | text | ✅ | Primary contact |
| Relationship to child | select | ✅ | Context |
| Email | email | ✅ | All program communication |
| Phone (mobile) | tel | ✅ | Day-of contact |
| Secondary / emergency contact name | text | ✅ | Safeguarding |
| Emergency contact phone | tel | ✅ | Safeguarding |
| Authorized pickup person(s) | text | — | Day-of safety |
| How did you hear about us? | select/text | — | Marketing attribution |

---

### Section C — Element Intake · Layer 1 — Irreplaceable Signals
*Source: `Element-Intake-10-12.md` Tier 1. **No Element hypothesis can be drafted without these.** Answered by **both parent and child** — the parent reports the behavior (the required core); the child answers a preference-framed version as a cross-check.*

#### C (parent) — behavioral report

| # | Field (parent prompt) | Captures | Reliability |
|---|---|---|---|
| C1 | **Aptitude** — "Describe 1–2 specific things your child picks up faster or does with more ease than you'd expect for their age. Be concrete: what exactly do they do, and how do you know it comes easily?" | Aptitude signal | Medium — projection-vulnerable, so demand specifics |
| C2 | **Passion** — "What does your child do voluntarily, repeatedly, with no reward and no prompting? When did you last see them do it?" | Passion signal (separate field from C1) | Medium-high |
| C3 | **Flow** — "Is there an activity where your child resists stopping, forgets meals, or has to be called several times? What is it?" | Flow / ease — separates real Element from a parent-pleasing answer | Medium |
| C4 | **Free-choice check** — "On a free afternoon, nothing scheduled and screens not the default, what does your child actually end up doing?" | Cross-checks C1–C3 against unprompted behavior | High signal value |

> **Form rule:** C1, C2, C3 are required free-text (min. ~1 sentence each). The form must label them as separate questions and never combine aptitude + passion into one box.

#### C (child) — preference-framed version
*The child answers the same four signals in their own words — framed as preference and experience, never as "what are you good at." At 10–12 the child rarely names their own Element, so these are a **cross-check on the parent's report, not the primary source**. Optional but encouraged; the parent's C1–C3 stay the required core.*

| # | Field (child prompt) | Cross-checks |
|---|---|---|
| C1c | **Comes easily** — "Is there something that feels easy for you that other kids seem to find hard? What is it?" | C1 Aptitude — child self-report is weak evidence on its own, but a match with the parent strengthens it |
| C2c | **Returns to** — "What do you do for fun that nobody tells you to do?" | C2 Passion |
| C3c | **Loses time in** — "Is there something you do where you look up and a lot of time has gone by?" | C3 Flow |
| C4c | **Free day** — "If today were totally free — no plans, screens not the default — what would you end up doing?" | C4 Free-choice |

> **Cross-read rule:** Compare each child answer against the parent's. **Agreement** hardens the signal. **Divergence** is itself diagnostic — a parent who reports achievements the child never mentions is an adult-projection flag (`Element-Intake-10-12.md` Tier 4). Record both; never overwrite one with the other.
> **Overlap note:** C2c / C4c cover similar ground to F.1 / F.3. On the live form, ask each question only once — the Element-signal phrasing here takes precedence; F adds personalization texture on top.

---

### Section D — Element Intake · Layer 2 — Development & Context
*Source: `Element-Intake-10-12.md` Tiers 2–4. Determines whether the Element can develop, and prevents misreads. Parent-answered.*

| # | Field (parent prompt) | Captures (Tier) | Used for |
|---|---|---|---|
| D1 | **Attitude / response to difficulty** — "When something is hard or your child gets a poor result, what do they actually do? Give a recent example." | Attitude — growth vs. fixed (Tier 2) | Agency MIAP pre-diagnosis |
| D2 | **Opportunity / access** — "Which of these has your child had real access to? (camera, code/computer, art materials, instruments, sports, kitchen, building/tools, animals/nature, none of these)" + "Anything they've wanted to try but never had the chance to?" | Opportunity (Tier 2) — so absence of a signal is interpretable | Reads gaps as missing access vs. missing aptitude |
| D3 | **Domain breadth** — "Across which of these do you see real spark? (mechanical/building, visual/art, words/story, numbers/patterns, social/people, performing, physical/movement, nature/science)" multi-select + note | Domain breadth (Tier 3) | Prevents premature narrowing; flags aptitude-in-one / passion-in-another |
| D4 | **Tribe / social pull** — "Who or what kind of group does your child light up around? Any interest they pursue more intensely with certain people?" | Tribe (Tier 3) | Team composition, hidden-passion detection |
| D5 | **Suppression** — "Is there anything your child used to love and dropped, or hides, or has been steered away from? What happened?" | Suppression (Tier 3) | Recovers filtered-out Element candidates |
| D6 | **Energy pattern** — "When in a normal day is your child most alert and engaged, and when are they drained?" | Energy patterns (Tier 4) | Cross-checks claimed passions against observed energy |

---

### Section E — MIAP Pre-Diagnosis Signals
*Source: `Summer-Program-Process-Map.md` §1.4 + `MIAP-Design-Conditions.md` diagnostic table. **Provisional** driver signals, behaviorally framed. Answered by **both parent and child**; confirmed/revised only by in-week observation.*

> **Why this can live on an intake form:** MIAP must never be *scored* from self-report. But the process map explicitly draws a **pre-diagnosis** from screening data to plan which conditions to embed before Monday. These questions collect exactly that — flagged provisional, confirmed by observation.

#### E (parent) — behavioral report

| Driver | Field (parent prompt) | Absent-signal we watch for |
|---|---|---|
| **Motivation** | "When your child works on something, can you tell the difference between when they're genuinely into it and when they're just complying? Describe a time of each." | Flat energy regardless of activity; everything is "fine" |
| **Identity** | "In their own words, how does your child describe what they're good at or who they are? (If they wouldn't, say so.)" | Defines self by negation; self-description shifts by audience |
| **Agency** | "When your child hits an obstacle and you're not there to help, what happens?" | Stops at first obstacle; asks "is this right?" before trying |
| **Purpose** | "Has your child ever cared that something they made was *useful to someone else*, not just fun for them? Example?" | Never mentions others; work quality tied only to personal interest |

#### E (child) — preference-framed version
*The child answers a light, preference-framed version of each driver in their own words. Same rule as Section C: a **cross-check, never a score**, and in-week observation is what confirms it. Optional but encouraged.*

| Driver | Field (child prompt) | Cross-checks parent signal |
|---|---|---|
| **Motivation** | "What's something you started making or doing all on your own, just because you wanted to?" | Self-initiation vs. the parent's compliance/engagement read |
| **Identity** | "If a new kid asked 'what are you into?', what would you tell them?" | How the child names themselves vs. the parent's report |
| **Agency** | "When something you're making stops working, what do you usually do?" | Persist vs. stop — in the child's own framing |
| **Purpose** | "Have you ever made something to help someone else, or that someone else used? What was it?" | Whether the child references others unprompted |

> **Cross-read rule:** Parent and child answers on the same driver are read together. Agreement strengthens the pre-diagnosis; divergence is flagged for Monday. Neither is scored.

---

### Section F — Personalization Questionnaire
*The "what makes this child *this* child" layer. Drives project personalization, driving-question variant selection, and role framing. Mostly the **child's voice**; a few parent cross-checks. Framed as fun, never as a test.*

#### F.1 — Interests & hobbies (child)
| Field | Type | Used for |
|---|---|---|
| "What are you really into right now?" (free text + tag chips: gaming, drawing, sports, music, coding, animals, cooking, building, reading, science, dance, film/video, fashion, cars, space, other) | multi-select + text | Project type matching, interest→domain mapping |
| "What do you do most weekends / after school for fun?" | text | Passion cross-check |
| "Something you made and were proud of (a video, a Minecraft build, a comic, a recipe, a fort…) — what was the best part of making it?" | text | Role + maker-identity signal (from pilot intake Q8) |

#### F.2 — Media & favorites (child)
| Field | Type | Used for |
|---|---|---|
| Favorite YouTube channel(s) / creators | text | Reveals admired domain + content vs. creation pull |
| Favorite game(s) | text | Game Builder match; systems vs. story pull |
| Favorite book / comic / show | text | Story & Graphic Novel match |
| "Who do you think is really cool at what they do?" (a creator, athlete, scientist, anyone) | text | Aspirational identity / practitioner-mentor seed |

#### F.3 — "What would you make?" (child — preference, maps to roles)
| Field | Type | Used for |
|---|---|---|
| "If you could spend a whole week making *one thing*, what would it be?" | text | Open project pull |
| "Pick the one that sounds most fun:" — (a) be on camera telling a story people watch · (b) film & edit a video until it's exactly right · (c) invent the rules of a game · (d) build a game's world/characters & look · (e) cook something people line up to buy · (f) fix a real problem in your neighborhood · (g) build a tool that explains something cool | single-select | Maps directly to project + role (see mapping in §6) |

#### F.4 — Values & motivation (child + light parent cross-check)
| Field | Type | Used for |
|---|---|---|
| "What kind of stuff do you care about?" chips (helping people, animals, the planet, fairness, building things that work, making people laugh, winning/competing, learning how things work, making beautiful things) | multi-select | Purpose signal seed; driving-question variant |
| "Do you like working **with a team** or **on your own**?" | single-select | Format (team/solo), team composition |
| "When you work with others, what part do you usually grab first?" | text | Role-to-signal (from pilot intake Q9) |

#### F.5 — Working style (parent)
| Field | Type | Used for |
|---|---|---|
| "Does your child like to **plan before starting**, or **dive in and figure it out**?" | single-select | Guide response protocol, team balance |
| "Do they do better with **clear structure** or **open space**?" | single-select | Sprint structure calibration |

---

### Section G — Wellbeing, Social & Logistics
*Source: process map Categories C, D, E. Operational + safeguarding. Replaces the old vague "any relevant notes."*

#### G.1 — Wellbeing baseline (parent)
| Field | Type | Required | Used for |
|---|---|---|---|
| "How does your child handle frustration *specifically* (not challenge in general)?" | text | ✅ | Guide awareness plan |
| Diagnosed conditions, sensory sensitivities, or accommodations the Guide should know about | text | — | Accommodation + safety |
| Significant recent life events (loss, family change, school move) | text | — | Whole Child context |
| "What does anxiety or being overwhelmed look like for your child, if it applies?" | text | — | Early-response plan |
| Allergies / dietary restrictions / medical notes | text | ✅ (if any) | Safety — critical for The Food Business |

#### G.2 — Social dynamics (parent)
| Field | Type | Used for |
|---|---|---|
| Does your child know anyone else enrolled in this session? (names) | text | Team composition |
| How does your child handle disagreement with peers? | text | Conflict-risk awareness |
| In a group, are they more comfortable **leading / contributing / following**? | single-select | Role tentativing |
| Any peer conflicts we should avoid? | text | Team composition |

#### G.3 — Parent expectations (parent)
| Field | Type | Used for |
|---|---|---|
| "What do you hope your child gets from this week?" | text | Saturday communication strategy |
| "What have well-meaning adults gotten *wrong* about your child?" | text | Projection-risk flag; reduces adult-narration bias |

#### G.4 — Logistics (parent)
| Field | Type | Required | Used for |
|---|---|---|
| Photo/video consent for showcase & marketing | checkbox (Y/N) | ✅ | Media use |
| Permission to test the child's project with real users (Wed feedback day) | checkbox | ✅ | Wednesday protocol |
| T-shirt size | select | — | Materials |
| Anything else you'd like us to know | text | — | Catch-all |

---

### Section H — Consent & Submission
| Field | Type | Required |
|---|---|---|
| "I confirm the child's answers are in their own words." | checkbox | ✅ |
| Agree to program terms & liability waiver | checkbox | ✅ |
| Parent signature (typed full name) | text | ✅ |
| Date | date (auto) | ✅ |

---

## 5. Field reliability & risk reference
*Carried from `Summer-Program-Process-Map.md` — tells the Guide how much to trust each field before Monday.*

| Field group | Reliability | Risk if wrong |
|---|---|---|
| Name, age, school, logistics | High | Low |
| Aptitude / Strengths (C1, D3) | Medium — projection-vulnerable | Role misfit found mid-week |
| Passion / Flow / free-choice (C2–C4) | Medium-high | Project disconnected from real engagement |
| Attitude → Agency (D1, E-Agency) | Low — non-school behavior may not generalize | Wrong/absent Agency conditions designed |
| Motivation signal (E-Motivation) | Low — parents struggle to separate genuine engagement from performance | Wrong condition design |
| Team vs. solo (F.4) | High | Format misfit kills engagement |
| Wellbeing (G.1) | Reliability depends on specificity — that's why questions are specific | Guide blindsided mid-week |

---

## 6. What the form's data becomes (downstream map)

```
APPLICATION FORM (this spec — reported, provisional)
│
├── A + B + G.4 ............ Program administration, safeguarding, Saturday comms
│
├── C (Layer 1) ............ Initial Element Hypothesis — Aptitude & Passion (required)
│        ├── parent report ── the required core
│        └── child version ── cross-check; divergence ──> adult-projection flag
├── D (Layer 2) ............ Hypothesis context: breadth, opportunity, suppression, energy
│        └──> Initial Element Hypothesis (provisional) ──> tested Monday
│
├── E (MIAP signals) ....... MIAP Pre-Diagnosis (parent report + child cross-read)
│        └──> which conditions to plan ──> locked after Monday
│
├── F (Personalization) .... PBL Project Designer skill input
│        ├── F.3 choice ───> project + role candidate (see map below)
│        ├── F.1/F.2 ──────> interest→domain match, driving-question variant
│        └── F.4 ──────────> format (team/solo), Purpose seed
│
├── G.2 (Social) ........... Team composition (conflict-aware)
├── G.1 (Wellbeing) ........ Guide awareness plan
└── G.3 (Expectations) ..... Projection-risk flag + Saturday framing
```

**F.3 preference → project/role seed** (child self-report; weighed against, never above, parent behavioral evidence):

| Choice | Project | Candidate role |
|---|---|---|
| (a) on camera | The YouTube Studio | Host/Presenter |
| (b) film & edit | The YouTube Studio | Director/Editor |
| (c) invent game rules | The Game Builder | Game Designer |
| (d) build game world | The Game Builder | World/Art Builder |
| (e) cook & sell | The Food Business | Chef / Product Developer |
| (f) fix a problem | The Community Fix | Community Researcher / Campaign Lead |
| (g) explain something | The Science Tool | Content & UX Designer |

---

## 7. Privacy note
- The child never sees framework language (Element, MIAP, aptitude, driver). Their section reads as preferences and "what would you make."
- Wellbeing, accommodation, and safeguarding fields are restricted to the Guide and founding team.
- MIAP signals are stored as **provisional pre-diagnosis only** and are never reported to families as a profile or score.

---

*Document version 1.1 — theNORMALschool internal use only.*
*v1.1 — added child (preference-framed) versions of Section C and Section E, with parent↔child cross-read rules.*
*Derived from: Element-Intake-10-12.md · Summer-Program-Process-Map.md (v2.0) · Pilot-Intake-Light.md · MIAP-Design-Conditions.md*
