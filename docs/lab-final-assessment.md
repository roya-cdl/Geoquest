# Final Practical – GeoQuest Kids 🌍 (40-minute capstone)

**Feature:** Daily Quiz Card (end-to-end)
**Theme:** Apply everything learned about Cursor in one practical flow.

**Starting point (context):** GeoQuest Kids is **complete and functional** (country search + REST Countries integration + kid-friendly UI + loading/error states + clean TypeScript). This practical adds **one new feature** and deliberately uses Cursor tooling.

---

## 📋 Quick Reference (40 minutes)

| Step | Task                                                       | Time   | Cursor mode           |
| ---- | ---------------------------------------------------------- | ------ | --------------------- |
| 1    | Plan the feature + file plan                               | 5 min  | **Plan**              |
| 2    | Add Rule + Command + Hook (must run)                       | 8 min  | Manual + **Agent**    |
| 3    | Figma spec via MCP (fallback allowed)                      | 5 min  | **Agent**             |
| 4    | Implement Daily Quiz Card (mock-first, deterministic)      | 10 min | **Agent**             |
| 5    | Optimize country search (pre-load + cache)                  | 5 min  | **Agent**             |
| 6    | Swap quiz mock → Open Trivia DB (real API) + minimal tests | 5 min  | **Agent**             |
| 7    | Validate with `@browser` + Debug Mode quick fix            | 2 min  | **Agent** + **Debug** |

> Note: Timing is tight by design. Focus on minimal, working increments. Extra polish is optional.

---

## 1) Purpose of this practical

Use this final practical to apply Cursor skills in one flow:

* Use **Plan / Agent / Ask** appropriately
* Apply **Rules, Commands, Hooks**
* Produce a **Figma design spec** via MCP (or fallback)
* Integrate a real API, add **API tests**, validate with **@browser**
* Use **Debug Mode** to investigate and fix an issue

---

## 2) Repo: geo-quest-kid-app

* `https://github.com/nishadhin/geo-quest-kid-app`

---

## 2.5) Project Structure

The current project structure (at repo root):

```
geo-quest-kids-app-lab/
├── src/
│   ├── components/
│   │   ├── CountryCard.tsx          # Displays country information
│   │   ├── CountryCard.css
│   │   ├── CountrySearch.tsx         # Main search component
│   │   ├── CountrySearch.css
│   │   ├── CountrySpotlight.tsx     # Spotlight feature (under construction)
│   │   ├── CountrySpotlight.css
│   │   ├── LoadingSpinner.tsx        # Loading animation
│   │   └── LoadingSpinner.css
│   ├── services/
│   │   └── countriesApi.ts           # REST Countries API integration
│   ├── App.tsx                       # Main application component
│   ├── App.css
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles
├── docs/
│   └── lab-final-assessment.md       # This file
├── dist/                             # Production build output
├── index.html                        # HTML entry point
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.node.json                # TypeScript config for Node
├── vite.config.ts                    # Vite build configuration
└── README.md                         # Project documentation
```

**Key points:**
- `App.tsx` is the main component (no separate "Home" page)
- Components are in `src/components/` with corresponding CSS files
- API services are in `src/services/`
- Configuration files are at the root level
- `package.json` is at the repo root (not in a subdirectory)

**Directories to be created during this practical:**
- `.cursor/rules/` - For Cursor Rules
- `.cursor/plans/` - For planning documents
- `.cursor/hooks/` - For Cursor Hooks (if needed)
- `docs/figma-design/` - For Figma design specifications
- `src/services/__tests__/` - For test files

---

## 3) Project setup (pre-work)

From repo root:

```bash
git clone https://github.com/nishadhin/geo-quest-kid-app.git
cd geo-quest-kid-app/geoquest-kids

npm install
npm run dev
```

**Important:** `package.json` is inside `geoquest-kids/`. Run commands from there.

* Open the project in Cursor (open repo root `geo-quest-kid-app`)
* Confirm the app loads (e.g., `http://localhost:5173`)

---

## 4) Step-by-step practical flow

## Step 1 — Plan the new feature (5 min) — **Plan mode**

Copy/paste into **Plan** mode:

```txt
We need to add a NEW feature to GeoQuest Kids: a "Daily Quiz Card" on the main page.

Constraints:
- Kid-friendly React + TypeScript
- Start mock-first (local deterministic quiz question), then swap to a real API (Open Trivia DB)
- Include: a Rule, a Command, a Hook, Figma spec (MCP + fallback), API tests, @browser validation, Debug Mode

Please:
1) Identify where the DailyQuizCard component should live and how it connects to the App component.
2) Propose the quiz data shape (TypeScript interface) and where it should be defined.
3) Provide a 6-step implementation plan with which steps use Plan/Agent/Ask/manual.
4) Include 2 risks/limitations of AI assistance.
5) Include a minimal test plan (what to test + what to mock).
6) Save the plan to: .cursor/plans/daily-quiz-card-plan.md
```

---

## Step 2 — Add a Rule + Command + Hook (8 min) — Manual + **Agent**

### 2A) Rule (Agent) — `geoquest-quality-and-determinism`

Create: `.cursor/rules/geoquest-quality-and-determinism.md`

Prompt (Agent mode):

```txt
Create a Cursor Rule for the final lab in .cursor/rules/geoquest-quality-and-determinism.md that enforces:
- No console.log in final code
- No any types (unless justified inline)
- Accessibility basics: semantic HTML and descriptive button labels
- Any “daily” logic must support injecting a Date into pure functions for deterministic tests

Keep it short and actionable.
```

### 2B) Command (Manual) — `/review-geo-card`

Create a slash command for quick review (shareable via repo is preferred):

* **Name:** Review Geo Card
* **Slash:** `/review-geo-card`

Command body:

```txt
You are a senior front-end engineer reviewing a React + TypeScript component in GeoQuest Kids.
I will run this command while the new Daily Quiz Card file is open.

1) Summarize the component in 1–2 sentences.
2) Check: TypeScript props, no any, no console.log, accessibility labels, semantic HTML.
3) Suggest ONE minimal improvement and show it as a small diff only.

Constraints:
- Do not rewrite the whole component.
```

### 2C) Hook (Agent) — diff scan for console.log

Prompt (Agent mode):

```txt
Create or update a Cursor Hook so that when Agent proposes changes to .ts/.tsx files,
it scans the diff for console.log and prints:
"Hook warning: console.log found in proposed changes for GeoQuest Kids. Remove it before commit."

Register it under .cursor/ so it runs automatically during this practical.
```

---

## Step 3 — Figma design spec (5 min) — **Agent mode** (fallback allowed)

Figma reference:

* `https://www.figma.com/design/MU79nBPJJvX3s8PjCla3kI/Learning-App-For-Kids--Community-?node-id=0-1&p=f&t=pAYh2vRNjApzbkck-0`

**Task:** Create or update the Figma design specification document.

**File location:** `docs/figma-design/geoquest-figma-design-spec.md`

**Note:** The `docs/figma-design/` directory may need to be created if it doesn't exist yet.

### Prompt (Agent mode, if Figma MCP is available)

```txt
Using Figma MCP, extract the layout + tokens needed to implement a "Daily Quiz Card" in GeoQuest Kids.

1) Create the directory docs/figma-design/ if it doesn't exist.
2) Create or update docs/figma-design/geoquest-figma-design-spec.md with a new section for the Daily Quiz Card:
   - layout structure (header, question, 4 options, feedback area, CTA)
   - spacing, colors, typography (use tokens/variables if present)
   - accessibility notes (contrast, button sizes, headings)
3) Keep it short (under 1 page).
```

### Fallback (manual, if Figma MCP isn't configured)

```txt
1) Create the directory docs/figma-design/ if it doesn't exist.
2) Open the Figma URL in your browser and manually create/update docs/figma-design/geoquest-figma-design-spec.md:
   - Describe the Daily Quiz Card layout in bullets
   - Note approximate colors/typography (or mark assumptions)
   - Keep it under 1 page and note uncertainties
```

---

## Step 4 — Implement Daily Quiz Card (10 min) — **Agent mode** (mock-first)

Implement:

* Component: `src/components/DailyQuizCard.tsx`
* Service: `src/services/quizApi.ts` (mock question)
* Render in the App component when user is "idle" (before search)

Prompt (Agent mode):

```txt
Implement the “Daily Quiz Card” feature:

1) Add src/services/quizApi.ts that returns a deterministic “daily” quiz question using mock data.
   - Daily logic must allow injecting Date into pure functions for test determinism.
2) Add src/components/DailyQuizCard.tsx that renders:
   - title, question, 4 options as buttons, feedback on selection, and optional "Explore [Country]" CTA
3) Wire it into the App component so it appears when the user hasn't searched yet.
4) Style it using docs/figma-design/geoquest-figma-design-spec.md.
5) Follow the lab rule: no console.log, no any, semantic HTML, descriptive button labels.

After implementation, I will run /review-geo-card on DailyQuizCard.tsx and apply ONE minimal improvement it suggests.
```

---

## Step 5 — Optimize country search with pre-loading and caching (5 min) — **Agent mode**

**Task:** Optimize the country search by pre-loading all countries and filtering locally instead of making API calls for each search.

**Current state:** The app currently calls `GET /v3.1/name/{name}` for each search, which works but makes a network request every time.

**Optimization goal:** Pre-load all countries once, cache in-memory, and filter locally for faster, more responsive searches.

Prompt (Agent mode):

```txt
Optimize the country search functionality in src/services/countriesApi.ts:

1) Add a function to pre-load all countries using:
   https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,subregion,capital,population,languages,currencies,borders
   
2) Cache the results in-memory (module-level variable or a simple cache object) so we don't re-download on every search.

3) Update searchCountryByName to:
   - Check if cache exists, if not, pre-load all countries first
   - Filter the cached countries locally by country name (case-insensitive partial match)
   - Return filtered results immediately (no network call per search)

4) Preserve all existing behavior:
   - Loading states (show loading only during initial pre-load)
   - Error handling (network errors, empty results)
   - No-results state
   - All existing TypeScript types

5) Follow the lab rule: no console.log, no any, accessible labels.

Note: The first search will trigger the pre-load, subsequent searches will be instant.
```

---

## Step 6 — Swap quiz mock → Open Trivia DB + minimal API tests (5 min) — **Agent mode**

### Pre-step: Install Vitest

Before starting Step 6, install Vitest and required dependencies:

```bash
npm install -D vitest @vitest/ui
```

**Note:** Vitest works seamlessly with Vite projects and uses the same `vite.config.ts`. No additional configuration needed for basic usage. You can verify installation by running `npx vitest --version`.

---

### 6A) Replace mock with Open Trivia DB API

Open Trivia DB is the quiz API (no key required).

Prompt (Agent mode):

```txt
Replace the mock quiz API with Open Trivia DB:
- Fetch 1 geography multiple-choice question:
  https://opentdb.com/api.php?amount=1&category=22&type=multiple
- Decode HTML entities in strings
- Shuffle answer options
- Keep UI behavior the same (feedback on selection)
- Add friendly error handling and a fallback message for kids

Add minimal Vitest tests for the quiz service:
- Create test file: `src/services/__tests__/quizApi.test.ts` (or similar)
- Test cases:
  * happy path (response → normalized UI data)
  * no results / empty response
  * network error or non-200 status
- Mock fetch in tests using Vitest's `vi.mock` or `global.fetch` mock
- Add `"test": "vitest"` script to `package.json` if not present

**Note:** Vitest should already be installed from the pre-step above. If tests fail to run, ensure `vite.config.ts` includes test configuration or create `vitest.config.ts`.
```

---

## Step 7 — Validate with `@browser` + Debug Mode quick fix (2 min) — **Agent + Debug**

### `@browser` validation (Agent mode)

```txt
Using @browser, validate Daily Quiz Card on http://localhost:5173:
1) Confirm it appears on the main page.
2) Click an answer and verify feedback updates.
3) If Explore CTA exists, click it and confirm it triggers the existing country search flow.
4) Note any UI mismatches vs docs/figma-design/geoquest-figma-design-spec.md.
```

### Debug Mode (enabled) quick check

If nothing is broken, intentionally introduce a tiny bug (then fix it):

* Example: clicking an answer doesn’t update feedback.

Prompt (Ask mode with Debug Mode enabled):

```txt
Debug Mode is enabled. Clicking an answer on Daily Quiz Card doesn’t show feedback.
1) Find where selection state is handled.
2) Explain why the UI is not updating.
3) Propose the smallest fix.
4) Confirm the fix using @browser.
```

---

## 5) Deliverables (what you submit)

* **Plan** saved to `.cursor/plans/daily-quiz-card-plan.md`
* **Rule** added: `.cursor/rules/geoquest-quality-and-determinism.md`
* **Command** created: `/review-geo-card` (and used on `DailyQuizCard.tsx`)
* **Hook** added and executed during the practical (console.log diff warning)
* Updated **Figma design spec**: `docs/figma-design/geoquest-figma-design-spec.md`
* Daily Quiz Card implemented and visible on the main page
* Country list sourced from:
  `https://restcountries.com/v3.1/all?fields=...`
* Quiz service uses Open Trivia DB + **minimal Vitest API tests**
* PR/reflection note: **what you learned, where AI helped, and where it guessed wrong**

---